/**
 * Created by naor on 10/11/15.
 */
Meteor.startup(function () {


  Meteor.setInterval(function() {
    Devices.find({}).forEach((device) => {
      //Spark.login({accessToken: 'a5d189513fc7a07e97fc7f29d66d02658da6c3d6'});
      Spark.login({accessToken: device.config.accessToken});

      //const deviceApi = Spark.getDevice('54ff74066667515143601467', Meteor.bindEnvironment(function (err, device) {
      Spark.getDevice(device.config.coreId, Meteor.bindEnvironment(function (err, deviceApi) {
        console.log('Device name: ' + deviceApi.name);
        console.log('Functions:', deviceApi.functions);
        console.log('Variables:', deviceApi.variables);

        var getVar = Meteor.wrapAsync(deviceApi.getVariable, deviceApi);
        var readings = Object.keys(deviceApi.variables).reduce(function (all, varName) {
          all[varName] = getVar(varName).result;
          return all;
        }, {});

        readings.timestamp = Date.now();
        Devices.update(device._id, {
          $push: {
            readings: readings
          },
          $set: {
            availableFuncs: deviceApi.functions
          }
        });
      }));
    });


  }, 5000);

});
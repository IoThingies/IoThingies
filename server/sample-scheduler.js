/**
 * Created by naor on 10/11/15.
 */
Meteor.startup(() => {
    interval = Meteor.setInterval(() => retrieveAllDataForUser((err, result) => {
        if (err) {
            console.log('Problem encountered, exiting sampling loop, Err: ', err);
            Meteor.clearInterval(interval);
        }
    }), 5000);
});

// Function to retrieve all the data available for the (logged in) user
function retrieveAllDataForUser(callback) {

    // Loop through all available devices that have been setup - TODO only list those for this user
    Devices.find({}).forEach((device) => {

        // Use the Particle promises to determine if actions successful - first login to the Particle cloud
        let loginPr = Spark.login({accessToken: device.config.accessToken});

        loginPr.then(
            (token) => {
                // console.log('Particle cloud login successful with token: ', token)
            },
            (err) => {
                console.log('Particle login FAILED');
                callback(err);
            }
        );

        // Find the specific device using the stored IDs
        let getDevicePr = Spark.getDevice(device.config.coreId);

        getDevicePr.then(
            Meteor.bindEnvironment((deviceApi) => {
                // Check if the device is actually connected before we try and retrieve data
                if (!deviceApi.connected) {
                    callback('Device ' + deviceApi.name + ' is not connected');
                } else {
                    // console.log('Device name: ' + deviceApi.name);
                    // console.log('Functions:', deviceApi.functions);
                    // console.log('Variables:', deviceApi.variables);

                    // Using the variable names discovered get the sensor readings
                    const wrappedGetDeviceVariable = Meteor.wrapAsync(deviceApi.getVariable, deviceApi);

                    // TODO - need to catch errors if a device is offline - will throw errors in the call to wrappedGetDeviceVariable
                    const readings = Object.keys(deviceApi.variables).reduce((all, varName) => {
                        all[varName] = wrappedGetDeviceVariable(varName).result;
                        return all;
                    }, {});

                    // Set the timestamp and store the readings in the db
                    readings.timestamp = Date.now();
                    Devices.update(device._id, { $push: { readings: readings }, $set: { availableFuncs: deviceApi.functions } });

                    // Let the caller know we are done successfully
                    callback(null, 'Device data received, device: ', deviceApi.name, ' ,data: ', JSON.stringify(readings));
                }
            }),
            // Error path
            (err) => {
                callback('Cannot get the device with ID: ', device.config.coreId);
            }

        );

    });
}

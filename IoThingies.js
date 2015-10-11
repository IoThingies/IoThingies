if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {


    Meteor.setInterval(function() {
        Spark.login({accessToken: 'a5d189513fc7a07e97fc7f29d66d02658da6c3d6'});

        device = Spark.getDevice('54ff74066667515143601467', Meteor.bindEnvironment(function (err, device) {
           console.log('Device name: ' + device.name);
           device.callFunction('readTemp', 'test', Meteor.bindEnvironment(function(err, data) {
             if (err) {
               console.log('An error occurred:', err);
             } else {
               console.log('Function called succesfully:', data);
               Devices.insert({
                   name: device.name,
                   datavalue: data.return_value
               });
             }
         }));
     }));
   }, 5000);

  });
}

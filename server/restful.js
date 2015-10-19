// Set up some server side routes so that IoT devices can 'push'
// data to iothingies

// Using the Restivus package for this feature
let Api = new Restivus({
    useDefaultAuth: true,
    prettyJSON: true
});

// Set up a route which has the device ID in the URL - TODO - add authentication
Api.addRoute('device/:_id/data', {authRequired: false}, {
    post: function() {
        console.log('ID being passed on REST is: ' + this.urlParams._id);
        let dev = Devices.findOne({"config.coreId": this.urlParams._id });

        // Check that we have a valid device on the URL
        if (dev) {
            console.log('Data received is: ', JSON.stringify(this.bodyParams));

            // Construct the readings object so that we can insert into our collection
            const readings = _.reduce(this.bodyParams.readings, (all, item) => {
                all[item.name] = parseFloat(item.value);
                return all;
            }, {});

            readings.timestamp = Date.now();

            console.log(JSON.stringify(readings));

            // Append the new readings to our Device object
            Devices.update(dev._id, { $push: { readings: readings }});

            // Return a success code
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Data received by POST request on /device/' + this.urlParams._id + '/data'
            };
        } else {
            // Let the client know that the device ID could not be found
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Device not found: ' + dev._id
            };
        }
    }
});

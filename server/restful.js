// This code is to enable some RESTful endpoints on the server so that the Spark Core
// can interact with the Meteor application

if (Meteor.isServer) {

    // Create a testing route
     Router.route('/api/testing', {where: 'server'})
        .get(function () {
           this.response.end('test complete' + '\n');
       });

    // Create a route to allow the Spark Core to insert new temperature readings
    Router.route('/api/test', {where: 'server'})
        .post(function () {
            console.log("rest endpoint touched at /api/test");
            this.response.writeHead(200, {'Content-Type' :
                                          'application/json; charset=utf-8'});
            this.response.end('data received, thanks! \n');
        });

    // Create a route to allow the Spark Core to insert new temperature readings
    Router.route('/api/newdata', {where: 'server'})
        .post(function () {
          var resp = {
            'reading_time' : this.request.body.reading_time
            };
          console.log(resp);

          this.response.writeHead(200, {'Content-Type' :
                                        'application/json; charset=utf-8'});
          this.response.end('data received, thanks! \n');
        });
}

/**
 * Created by naor on 10/11/15.
 */
angular.module('IoThingies.dashboard').controller('DeviceWidgetCtrl', [
  '$scope',
  function ($scope) {
    const tableTmpl = 'client/dashboard/var-table.ng.html';
    const graphTmpl = 'client/dashboard/trend-graph.ng.html';

    this.visTemplate = tableTmpl;
    this.showingGraph = false;

    this.switchVis = () => {
      this.showingGraph = !this.showingGraph;

      this.visTemplate = this.showingGraph ? graphTmpl : tableTmpl;
    };

    const chartObj = this.chartObject = {};
    chartObj.type = "LineChart";
    //chartObj.displayed = false;
    //$scope.chartObject.data = {
    //  "cols": [{
    //    id: "month",
    //    label: "Month",
    //    type: "string"
    //  }, {
    //    id: "laptop-id",
    //    label: "Laptop",
    //    type: "number"
    //  }, {
    //    id: "desktop-id",
    //    label: "Desktop",
    //    type: "number"
    //  }, {
    //    id: "server-id",
    //    label: "Server",
    //    type: "number"
    //  }, {
    //    id: "cost-id",
    //    label: "Shipping",
    //    type: "number"
    //  }],
    //  "rows": [{
    //    c: [{
    //      v: "January"
    //    }, {
    //      v: 19,
    //      f: "42 items"
    //    }, {
    //      v: 12,
    //      f: "Ony 12 items"
    //    }, {
    //      v: 7,
    //      f: "7 servers"
    //    }, {
    //      v: 4
    //    }]
    //  }, {
    //    c: [{
    //      v: "February"
    //    }, {
    //      v: 13
    //    }, {
    //      v: 1,
    //      f: "1 unit (Out of stock this month)"
    //    }, {
    //      v: 12
    //    }, {
    //      v: 2
    //    }]
    //
    //  }, {
    //    c: [{
    //      v: "March"
    //    }, {
    //      v: 24
    //    }, {
    //      v: 5
    //    }, {
    //      v: 11
    //    }, {
    //      v: 6
    //    }]
    //  }]
    //};
    chartObj.options = {
      "title": "Sales per month",
      "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
      "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
      "isStacked": "true",
      "fill": 20,
      "displayExactValues": true,
      "vAxis": {
        "title": "Sensor value",
        "gridlines": {
          "count": 5
        }
      },
      "hAxis": {
        "title": "Time"
      }
    };

    $scope.$watchCollection('device.readings', (readings) => {
      this.hasReadings = !! readings.length;
      if (this.hasReadings) {
        const lastReading = readings.slice(-1)[0];
        this.timeAgo = moment(lastReading.timestamp).fromNow();
        this.variables = _.pairs(_.omit(lastReading, 'timestamp'));

        const recentReadings = readings.slice(-100);
        const cols = recentReadings.reduce((all, curr) => {
          if (all.length === 0) {
            all = Object.keys(_.omit(curr, 'timestamp')).map((key) => {
              return {id: key, label: key, type: typeof curr[key]};
            });

          } else {
            all = all.filter((col) => {
              return !! curr[col.id];
            });
          }

          return all;
        }, []);

        const keys = ['timestamp'].concat(cols.map((col) => {
          return col.id;
        }));

        cols.unshift({
          id: 'timestamp',
          label: 'timestamp',
          type: 'string'
        });

        chartObj.data = {
          cols: cols,
          rows: recentReadings.map((reading) => {
            return {
              c: keys.map((key) => {
                return {
                  v: key === 'timestamp' ? moment(reading[key]).format('HH:mm') : reading[key]
                };
              })
            }
          })
        };

        chartObj.view = {
          columns: cols.map((col, index) => index)
        };
      }
    });


}]);
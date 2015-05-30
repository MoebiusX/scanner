(function () {
  'use strict';

  angular.module('sample.search')
    .controller('SearchCtrl', ['$scope', 'MLRest', 'User', '$location', function ($scope, mlRest, user, $location) {
      var model = {
        selected: [],
        text: '',
        user: user
      };

          var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: 'Order Count'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Count',
            data: [60],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">orders / hour</span></div>'
            },
            tooltip: {
                valueSuffix: ' orders/day'
            }
        }]

    }));

    // The RPM gauge
    $('#container-rpm').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'Warnings'
            }
        },

        series: [{
            name: 'Warnings',
            data: [3],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                       '<span style="font-size:12px;color:silver">incidents / day</span></div>'
            },
            tooltip: {
                valueSuffix: ' warnings/day'
            }
        }]

    }));

        // The RPM gauge
    $('#container-error').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'Errors'
            }
        },

        series: [{
            name: 'Errors',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                       '<span style="font-size:12px;color:silver">incidents / day</span></div>'
            },
            tooltip: {
                valueSuffix: ' errors/day'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function () {
        // Speed
        var chart = $('#container-speed').highcharts(),
            point,
            newVal,
            inc;

        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y;

            if (newVal < 0 || newVal > 200) {
                newVal = point.y;
            }

            point.update(newVal);
        }

        // RPM
        chart = $('#container-rpm').highcharts();
        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.random() - 0.5;
            newVal = point.y;

            if (newVal < 0 || newVal > 5) {
                newVal = point.y;
            }

            point.update(newVal);
        }
    }, 2000);

  $('#myPieContainer').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Incidents by type'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Incident type',
            data: [
                ['IDM timeout',   13],
                ['NAS timeout',       11],
                {
                    name: 'B2B Gateway timeout',
                    y: 9,
                    sliced: true,
                    selected: true
                },
                ['Database timeout',    3],
                ['Gateway timeout',     3],
                ['Others',   2]
            ]
        }]
    });

    $('#myContainer').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });

    $('#myContainer2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Incidents by business line'
        },
        xAxis: {
            categories: ['Memory', 'Complex SOC', 'Microprocessors', 'Commodity Integrated Circuit']
        },
        yAxis: {
            title: {
                text: 'Business line'
            }
        },
        series: [{
            name: 'Errors',
            data: [0, 0, 0, 0]
        }, {
            name: 'Warnings',
            data: [14, 10, 3, 2]
        }]
    });


      var searchContext = mlRest.createSearchContext();

      function updateSearchResults(data) {
        model.search = data;
      }

      (function init() {
      $scope.highchartsNG = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [4]
        }],
        title: {
            text: 'Order entry'
        },
        loading: false
    };
    $scope.highchartsNG2 = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [5]
        }],
        title: {
            text: 'Order fulfillment'
        },
        loading: false
    };
    $scope.highchartsNG3 = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [3]
        }],
        title: {
            text: 'Distribution'
        },
        loading: false
    };
    $scope.highchartsNG4 = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [1]
        }],
        title: {
            text: 'Invoicing'
        },
        loading: false
    };
    $scope.highchartsNG5 = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [2]
        }],
        title: {
            text: 'Customer payment'
        },
        loading: false
    };
        searchContext
          .search()
          .then(updateSearchResults);
      })();

      angular.extend($scope, {
        model: model,
        selectFacet: function(facet, value) {
          var existing = model.selected.filter( function( selectedFacet ) {
            return selectedFacet.facet === facet && selectedFacet.value === value;
          });
          if ( existing.length === 0 ) {
            model.selected.push({facet: facet, value: value});
            searchContext
              .selectFacet(facet, value)
              .search()
              .then(updateSearchResults);
          }
        },
        clearFacet: function(facet, value) {
          var i;
          for (i = 0; i < model.selected.length; i++) {
            if (model.selected[i].facet === facet && model.selected[i].value === value) {
              model.selected.splice(i, 1);
              break;
            }
          }
          searchContext
            .clearFacet(facet, value)
            .search()
            .then(updateSearchResults);
        },
        textSearch: function() {
          searchContext
            .setText(model.text)
            .search()
            .then(updateSearchResults);
          $location.path('/');
        },
        pageChanged: function(page) {
          searchContext
            .setPage(page, model.pageLength)
            .search()
            .then(updateSearchResults);
        },
        getSuggestions: function(val) {
          return mlRest.callExtension('extsuggest', { 'method' : 'GET', 'params' : { 'rs:pqtxt' : val, 'rs:options' : 'all'} }).then(function(res){
            return res.suggestions;
          });
        }
      });

      $scope.$watch('model.user.authenticated', function(newValue, oldValue) {
        // authentication status has changed; rerun search
        searchContext.search().then(updateSearchResults, function(error) {
          model.search = {};
        });
      });

    }]);
}());

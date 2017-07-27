var createChart = function(filename, containername, legendColors, lineChartDates, noDataNote) {
  $.extend(Highcharts.Renderer.prototype.symbols, {
    exportIcon: function(a, b, c, d) {
      return (["M", a, b + c, "L", a + c, b + d, a + c, b + d * 0.9, a, b + d * 0.9, "Z", "M", a + c * 0.5, b + d * 0.62, "L", a + c * 0.75, b + d * 0.4, a + c * 0.45, b + d * 0.4, a + c * 0.45, b, a + c * 0.55, b,
        a + c * 0.55, b + d * 0.4, a + c * 0.25, b + d * 0.4, "Z"
      ])
    }
  });

  // --- 0. Initial setup: creates containers for charts
  var chartnumber = containername.slice(-1);
  var html =  '<div id="map' + chartnumber + '"><br></div>';
      html += '<div id="chart' + chartnumber + '" style="display: inline; float: left"></div>';
  $(containername).append(html);

  // --- 1. Gets data from data file and formats data
  $.get('data/' + filename, function(data) {

    var metaArray = [], // temporary array split from csv data
      divider, // index of divider text in csv data
      dataArray = [], // temporary array split from csv data
      metadata = {}, // formatted object
      dataset = {}; // formatted object

    // split the data into rows
    var rowsArray = data.split('\n');

    // iterate over the rows
    for (var row = 0; row < rowsArray.length; row++) {
      // find the divider text
      if ((/^\#DATA/).test(rowsArray[row])) {
        divider = row;
      }
      // create new arrays using the divider
      metaArray = rowsArray.slice(0, divider);
      dataArray = rowsArray.slice(divider + 1);
    }

    // iterate over the metaArray
    for (var i = 0; i < metaArray.length; i++) {
      var metaArrayRow = metaArray[i].split('""",'); // split on """, since there might be commas in the text

      // set key and value to first and second item of each row
      var key = metaArrayRow[0].substr(3), // removes opening double quote
        value = metaArrayRow[1].substr(3); // removes extra opening double quote

      // build metadata object
      metadata[key] = value;
    }
    // can now get metadata by key (ex. metadata.graph_title returns "Days Change Growing Season")
    window.console.info('Metadata:');
    window.console.dir(metadata);

    // iterate over the dataArray
    for (var row = 0; row < dataArray.length; row++) {
      var dataArrayRow = dataArray[row].split(',');

      // headerRow is the first row
      if (row === 0) {
        var dataHeaderRow = dataArrayRow;
        // all other rows
      } else {

        // set keys and values of the dataset object
        var state = dataArrayRow[0],
          trend = dataArrayRow[1] === "'" ? null : parseFloat(dataArrayRow[1]),
          significance = dataArrayRow[2],
          yearsData = [],
          chartYears = [];

        // iterate over the dataHeaderRow (years start with 4th item)
        for (var item = 3; item < dataHeaderRow.length; item++) {
          yearsData.push(parseFloat(dataArrayRow[item]));
          chartYears.push(dataHeaderRow[item]);
        }

        if (state !== '') {
          dataset[state] = {
            id: state,
            trend: trend,
            significant: (significance === '1') ? true : false,
            years: yearsData
          };
        }

      }
    }
    // can now get dataset by key (ex. dataset["us-al"] returns Alabama object)
    window.console.info("Dataset:");
    window.console.dir(dataset);

    // --- 2. Sets map options
    var unitedStatesMap = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
    // need to translate dataset into format Highcharts uses (array of objects)
    var datasetArray = [],
      datasetYearsArray = [];
    metadata.start_year = Math.min.apply(Math, chartYears) + 1; //Gets minimum year from 'chartYears' and applies it as the start_year for the UTC-based x-axis in chart.

    // iterate through dataset object
    for (var state in dataset) {
      datasetArray.push({
        id: dataset[state].id,
        value: dataset[state].trend,
        significant: dataset[state].significant,
        years: dataset[state].years
      });
    }
    window.console.info("Highcharts dataset:")
    window.console.dir(datasetArray)
    // datasetArray is now in format Highcharts uses



    // set legend bounds to be furthest data-point value from 0 (max value or absolute value of min value)
    var legendBounds = metadata.map_legend_max > Math.abs(metadata.map_legend_min) ? metadata.map_legend_max : Math.abs(metadata.map_legend_min);
    var legendStops,
        legendStyle,
        colorStops;

    // conditional setup for each figure
    if ( filename === 'heating-cooling_figure-2.csv' || 'heating-cooling_figure-3.csv' ) {
      legendStops = legendBounds / 9;
      legendStyle = [
        Math.round(0 - legendStops * 9),
        Math.round(0 - legendStops * 7),
        Math.round(0 - legendStops * 5),
        Math.round(0 - legendStops * 3),
        Math.round(0 - legendStops * 1),
        Math.round(legendStops * 1),
        Math.round(legendStops * 3),
        Math.round(legendStops * 5),
        Math.round(legendStops * 7),
        Math.round(legendStops * 9)
      ];
      colorStops = [
        [0.000000, legendColors[0]],
        [0.111111, legendColors[0]],

        [0.111112, legendColors[1]],
        [0.222222, legendColors[1]],

        [0.222223, legendColors[2]],
        [0.333333, legendColors[2]],

        [0.333334, legendColors[3]],
        [0.444444, legendColors[3]],

        [0.444445, legendColors[4]],
        [0.555555, legendColors[4]],

        [0.555556, legendColors[5]],
        [0.666666, legendColors[5]],

        [0.666667, legendColors[6]],
        [0.777777, legendColors[6]],

        [0.777778, legendColors[7]],
        [0.888888, legendColors[7]],

        [0.888889, legendColors[8]],
        [1.000000, legendColors[8]]
      ];
    }

    if ( filename === 'wildfires_figure4.csv' ) {
      legendStops = legendBounds / 6;
      legendStyle = [
        legendStops * 0,
        legendStops * 1,
        legendStops * 2,
        legendStops * 3,
        legendStops * 4,
        legendStops * 5,
        legendStops * 6
      ];
      colorStops = [
        [0.000000, legendColors[0]],
        [0.166666, legendColors[0]],

        [0.166667, legendColors[1]],
        [0.333333, legendColors[1]],

        [0.333334, legendColors[2]],
        [0.500000, legendColors[2]],

        [0.500001, legendColors[3]],
        [0.666666, legendColors[3]],

        [0.666667, legendColors[4]],
        [0.833333, legendColors[4]],

        [0.833334, legendColors[5]],
        [1.000000, legendColors[5]]
      ];
    }

    if ( filename === 'wildfires_figure5.csv' ) {
      legendStops = legendBounds / 20;
      legendStyle = [
        0 - legendStops * 20,
        0 - legendStops * 15,
        0 - legendStops * 10,
        0 - legendStops * 5,
        0 - legendStops * 1,
        legendStops * 1,
        legendStops * 5,
        legendStops * 10,
        legendStops * 15,
        legendStops * 20
      ];
      colorStops = [
        [0.000000, legendColors[0]],
        [0.125000, legendColors[0]],

        [0.125001, legendColors[1]],
        [0.250000, legendColors[1]],

        [0.250001, legendColors[2]],
        [0.375000, legendColors[2]],

        [0.375001, legendColors[3]],
        [0.475000, legendColors[3]],

        [0.475001, legendColors[4]],
        [0.500000, legendColors[4]],

        [0.500001, legendColors[4]],
        [0.525000, legendColors[4]],

        [0.525001, legendColors[5]],
        [0.625000, legendColors[5]],

        [0.625001, legendColors[6]],
        [0.750000, legendColors[6]],

        [0.750001, legendColors[7]],
        [0.875000, legendColors[7]],

        [0.875001, legendColors[8]],
        [1.000000, legendColors[8]]
      ];
    }



    // setup map
    var mapOptions = {
      chart: {
        renderTo: 'map' + chartnumber,
        // width: 500,
        height: 450,
        zoomType: 'xy',
        events: {
          load: function(event) {
            // adds chart notes below chart
            var chartNotes = this.renderer.label(noDataNote).css({
              'font-size': '11px',
              'color': '#5e5e5e'
            }).add();
            chartNotes.align(Highcharts.extend(chartNotes.getBBox(), {
              verticalAlign: 'bottom',
              y: chartNotes.getBBox().height * 2
            }), null, 'spacingBox');
          }
        },
        spacingBottom: 40
      },
      title: {
        text: metadata.map_title
      },
      subtitle: {
        text: metadata.map_subtitle
      },
      legend: {
        title: {
          text: metadata.map_legend_title,
          style: {
            textAlign: 'center'
          }
        },
        floating: false,
        align: 'center',
        style: {
          textAlign: 'center'
        }
      },
      colorAxis: {
        min: -1 * legendBounds,
        max: legendBounds,
        stops: colorStops,
        tickPositions: legendStyle,
        marker: {
          color: 'black'
        }
      },
      legend: {
        symbolWidth: 400
      },
      mapNavigation: {
        buttonOptions: {
          theme: {
            fill: 'white',
            'stroke-width': 1,
            stroke: 'silver',
            r: 0
          },
          verticalAlign: 'bottom'
        },
        enableButtons: true,
        enableMouseWheelZoom: true,
        enableTouchZoom: true
      },
      plotOptions: {
        series: {
          mapData: unitedStatesMap, // US map from Highmaps map collection
          joinBy: ['hc-key', 'id'],
          cursor: 'pointer',
          allAreas: false, // removes states not included in dataset
          allowPointSelect: true,
          animation: false
        },
        map: {
          borderColor: 'black',
          nullColor: '#CCCCCC'
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function(e) {
          if (this.point.value < metadata.map_break) {
            return '<div style="width: 250px; white-space: normal;">' +
              '<strong>' + this.point.name + '</strong><br/>' +
              '<span style="font-size: 10px;">' + metadata.map_tooltip_lessthan_prevalue  + ' ' +
                Math.abs(this.point.value.toFixed(2))   + ' ' +
                metadata.map_tooltip_lessthan_postvalue +
              '</span></div>'
          } else if (this.point.value > metadata.map_break) {
              return '<div style="width: 250px; white-space: normal;">' +
                '<strong>' + this.point.name + '</strong><br/>' +
                '<span style="font-size: 10px;">' + metadata.map_tooltip_greater_prevalue + ' ' +
                Math.abs(this.point.value.toFixed(2)) + ' ' +
                metadata.map_tooltip_greater_postvalue +
              '</span></div>'
          } else {
              return '<div style="width: 250px; white-space: normal;">' +
                '<strong>' + this.point.name + '</strong></div>' +
                '<span style="font-size: 10px;">' + metadata.map_tooltip_nodata + '<span>' +
              '</div>'
          }
        }
      },
      credits: {
        text: metadata.map_source,
        href: metadata.map_source_url
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: true,
            symbol: 'exportIcon',
            menuItems: [{
              text: 'Export view to PNG',
              onclick: function() {
                this.exportChart({
                  filename: metadata.map_export_name
                });
              }
            }, {
              text: 'Export view to JPG',
              onclick: function() {
                this.exportChart({
                  type: 'image/jpeg',
                  filename: metadata.map_export_name
                });
              }
            }, {
              text: 'Export view to PDF',
              onclick: function() {
                this.exportChart({
                  type: 'application/pdf',
                  filename: metadata.map_export_name
                });
              }
            }, {
              text: 'Export view to SVG',
              onclick: function() {
                this.exportChart({
                  type: 'image/svg+xml',
                  filename: metadata.map_export_name
                });
              }
            }],
            theme: {
              fill: 'white',
              'stroke-width': 1,
              stroke: 'silver',
              r: 0
            }
          }
        }
      },
      series: [{
        name: metadata.map_legend_title,
        data: datasetArray
      }]
    };

    // --- 3. Create the map
    var mapChart = new Highcharts.Map(mapOptions);

    // --- 4. Wrap Highcharts.Point.select to create the line chart
    // Highcharts.wrap() – http://www.highcharts.com/docs/extending-highcharts/extending-highcharts
    // The wrap function accepts the parent object as the first argument, the name of the function to wrap as the second, and a callback replacement function as the third. The original function is passed as the first argument to the replacement function, and original arguments follow after that.
    Highcharts.wrap(Highcharts.Point.prototype, 'select', function(proceed) {
      // Apply the original function with the original arguments, which are sliced off this function's arguments
      proceed.apply(this, Array.prototype.slice.call(arguments, 1));
      // Everything that follows now happens after the original Highcharts.Point.select function runs

      var selectedPointsArray = mapChart.getSelectedPoints(), // contains an array of the selected points
        lineChart; // will become the line chart on first select

      // if the line chart is undefined (it will be initially), so initiation only occurs on the first select
      if (!lineChart) {
        var chartOptions = {
          chart: {
            renderTo: 'chart' + chartnumber,
            type: 'line',
            width: 450,
            height: 400,
            zoomType: 'x'
          },
          title: {
            text: metadata.chart_title
          },
          subtitle: {
            text: metadata.chart_subtitle
          },
          xAxis: {
            min: Date.UTC(lineChartDates[0], 0, 1),
            max: Date.UTC(lineChartDates[1], 0, 1),
            labels: {
              format: '{value:%Y}'
            },
            showFirstLabel: true,
            showLastLabel: true,
            minTickInterval: 1000 * 60 * 60 * 24 * 365,
            tickPixelInterval: 40,
            title: {
              text: metadata.chart_xaxis_label
            },
          },
          yAxis: {
            title: {
              text: metadata.chart_yaxis_label
            },
            labels: {
              formatter:function() {
                return Highcharts.numberFormat(this.value, 0, '', ',');
              }
            }
          },
          plotOptions: {
            line: {
              lineWidth: 1.5,
              states: {
                hover: {
                  lineWidthPlus: 0
                }
              }
            },
            series: {
              marker: {
                enabled: false
              },
              data: yearsData,
              pointStart: Date.UTC(metadata.start_year, 0, 1) - 1,
              pointInterval: 24 * 3600 * 1000 * 365
            }
          },
          tooltip: {
            // set to shared because the chart is small when multiple datasets are shown
            shared: true,
            formatter: function() {
              var date = new Date(this.x);
              var year = date.getUTCFullYear();
              var html = '<strong>' + year + '</strong>';

              $.each(this.points, function() {
                html += '<br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '', ',')  + ' ' +
                metadata.chart_tooltip_unit;
              });
              return html;
            }
          },
          credits: {
            text: metadata.chart_source,
            href: metadata.chart_source_url
          },
          exporting: {
            buttons: {
              contextButton: {
                enabled: true,
                symbol: 'exportIcon',
                menuItems: [{
                  text: 'Export view to PNG',
                  onclick: function() {
                    this.exportChart({
                      filename: metadata.chart_export_name
                    });
                  }
                }, {
                  text: 'Export view to JPG',
                  onclick: function() {
                    this.exportChart({
                      type: 'image/jpeg',
                      filename: metadata.chart_export_name
                    });
                  }
                }, {
                  text: 'Export view to PDF',
                  onclick: function() {
                    this.exportChart({
                      type: 'application/pdf',
                      filename: metadata.chart_export_name
                    });
                  }
                }, {
                  text: 'Export view to SVG',
                  onclick: function() {
                    this.exportChart({
                      type: 'image/svg+xml',
                      filename: metadata.chart_export_name
                    });
                  }
                }],
                theme: {
                  fill: 'white',
                  'stroke-width': 1,
                  stroke: 'silver',
                  r: 0,
                }
              }
            }
          },
          // series will populated with data from selected items on mapChart
          series: []
        };
      }

      // --- 5. Create the chart
      var lineChart = new Highcharts.Chart(chartOptions);

      // iterate through selected items in selectedPointsArray
      for (var item = 0; item < selectedPointsArray.length; item++) {
        var selectedItem = selectedPointsArray[item];

        // populatelineChart series with name and data
        lineChart.addSeries({
          // 'name' property of the object from the Highmaps map collection
          name: selectedItem.name,
          // selectedItem.id acts as a hook to the object itself since they have the same value
          data: dataset[selectedItem.id].years,
        }, false); // chart.addSeries's second argument is redraw
      };

      // redraw seems to be faster here than after each series is added above
      lineChart.redraw();

    }); // end Highcharts.wrap() of Highcharts.Point.select

  }, "text"); // end $.get

}; // end createChart

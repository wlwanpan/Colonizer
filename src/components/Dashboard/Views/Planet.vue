<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-6" @click.prevent="navigateAssets">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bullet-list-67 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Assets</p>
              <h4 class="card-title">2</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>territories
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6" @click.prevent="navigateHabitants">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Habitants</p>
              <h4 class="card-title">450</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>total
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Colonies</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>New Earth
            </div>
          </stats-card>
        </div>

      </div>
      <div class="row">
        <div class="col-md-14">
          <div id="tooltip-container"></div>

          <div id="canvas-svg"></div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from '@/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from '@/components/UIComponents/Cards/StatsCard.vue'
  import Card from '@/components/UIComponents/Cards/Card.vue'
  import LTable from '@/components/UIComponents/Table.vue'
  import Checkbox from '@/components/UIComponents/Inputs/Checkbox.vue'

  export default {
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard
    },
    async mounted () {
      d3.csv("https://gist.githubusercontent.com/estellewan/91759b52fa93b7521bce4f0cf9108a69/raw/91ea8a54258cd7a2b78b4224ea44b023b073e1ce/population.csv", function(err, data) {
      var config = {"color1":"#ffd59a","color2":"#e68800","stateDataColumn":"state_or_territory","valueDataColumn":"population_estimate_for_july_1_2013_number"}

      var WIDTH = 1000, HEIGHT = 500;

      var COLOR_COUNTS = 9;

      var SCALE = 0.9;

      function Interpolate(start, end, steps, count) {
          var s = start,
              e = end,
              final = s + (((e - s) / steps) * count);
          return Math.floor(final);
      }

      function Color(_r, _g, _b) {
          var r, g, b;
          var setColors = function(_r, _g, _b) {
              r = _r;
              g = _g;
              b = _b;
          };

          setColors(_r, _g, _b);
          this.getColors = function() {
              var colors = {
                  r: r,
                  g: g,
                  b: b
              };
              return colors;
          };
      }

      function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
      }

      function valueFormat(d) {
        if (d > 1000000000) {
          return Math.round(d / 1000000000 * 10) / 10 + "B";
        } else if (d > 1000000) {
          return Math.round(d / 1000000 * 10) / 10 + "M";
        } else if (d > 1000) {
          return Math.round(d / 1000 * 10) / 10 + "K";
        } else {
          return d;
        }
      }

      var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;

      var rgb = hexToRgb(COLOR_FIRST);

      var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

      rgb = hexToRgb(COLOR_LAST);
      var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

      var MAP_STATE = config.stateDataColumn;
      var MAP_VALUE = config.valueDataColumn;

      var width = WIDTH,
          height = HEIGHT;

      var valueById = d3.map();

      var startColors = COLOR_START.getColors(),
          endColors = COLOR_END.getColors();

      var colors = [];

      for (var i = 0; i < COLOR_COUNTS; i++) {
        var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
        var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
        var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
        colors.push(new Color(r, g, b));
      }

      var quantize = d3.scale.quantize()
          .domain([0, 1.0])
          .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

      var path = d3.geo.path();

      var svg = d3.select("#canvas-svg").append("svg")
          .attr("width", width)
          .attr("height", height);

      d3.tsv("https://gist.githubusercontent.com/estellewan/45518ebd074c7a657a8b85eecb773a68/raw/b9e0b24e05d690208b9f06caf9be81eda66237a1/us-state-names", function(error, names) {

        var name_id_map = {};
        var id_name_map = {};

        for (var i = 0; i < names.length; i++) {
          name_id_map[names[i].name] = names[i].id;
          id_name_map[names[i].id] = names[i].name;
        }

        data.forEach(function(d) {
          var id = name_id_map[d[MAP_STATE]];
          valueById.set(id, +d[MAP_VALUE]);
        });

        quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
        d3.max(data, function(d){ return +d[MAP_VALUE] })]);

      d3.json("https://gist.githubusercontent.com/estellewan/a26954cf8c01abcecd48af5fb3a114ee/raw/07b64d8879c02b5e2ad5ca61558af59e8fee46ca/gistfile1.txt", function(error, us) {
        svg.append("g")
            .attr("class", "states-choropleth")
          .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
          .enter().append("path")
            .attr("transform", "scale(" + SCALE + ")")
            .style("fill", function(d) {
              if (valueById.get(d.id)) {
                var i = quantize(valueById.get(d.id));
                var color = colors[i].getColors();
                return "rgb(" + color.r + "," + color.g +
                    "," + color.b + ")";
              } else {
                return "";
              }
            })
            .attr("d", path)
            .on("mousemove", function(d) {
                var html = "";

                html += "<div class=\"tooltip_kv\">";
                html += "<div class=\"tooltip_key\">";
                html += id_name_map[d.id];
                html += "</div>";
                html += "<div class=\"tooltip_value\">";
                html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
                html += "";
                html += "</div>";
                html += "</div>";

                $("#tooltip-container").html(html);
                $(this).attr("fill-opacity", "0.8");
                $("#tooltip-container").show();

                var coordinates = d3.mouse(this);

                var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;

                if (d3.event.layerX < map_width / 2) {
                  d3.select("#tooltip-container")
                    .style("top", (d3.event.layerY + 15) + "px")
                    .style("left", (d3.event.layerX + 15) + "px");
                } else {
                  var tooltip_width = $("#tooltip-container").width();
                  d3.select("#tooltip-container")
                    .style("top", (d3.event.layerY + 15) + "px")
                    .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                }
            })
            .on("mouseout", function() {
                    $(this).attr("fill-opacity", "1.0");
                    $("#tooltip-container").hide();
                });

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("transform", "scale(" + SCALE + ")")
                .attr("d", path);
          });
      });
     });
    },
    methods: {
      navigateAssets() {
        this.$router.push('/admin/market-place')
      },
      navigateHabitants() {
        this.$router.push('/admin/habitant-list')
      }
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 1000px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 1000px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        }
      }
    }
  }
</script>
<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 500px;
  position: relative;
}
/* stylesheet for your custom graph */
.states {
  fill: none;
  stroke: black;
  stroke-linejoin: round;
}
.states-choropleth {
  fill: #ccc;
}
#tooltip-container {
  position: absolute;
  background-color: #fff;
  color: #000;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  display: none;
  font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  font-size: 12px;
}
.tooltip_key {
  font-weight: bold;
}
.tooltip_value {
  margin-left: 20px;
  float: right;
}

.tooltip_value {
  color: black;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 3.5s steps(30, end),
    blink-caret .5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}

.card.card-stats:hover {
    background-color: #dddddd;
    cursor: pointer;
}
.main-panel {
  background-color:black;
background-image:
radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
}
</style>

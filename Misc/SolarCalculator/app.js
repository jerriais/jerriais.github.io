/* todo google map input, angular js conversion, dual input[DONE],
    round  numbers on tooltips, output csv, hide api-key, more inputs, slider inputs */
var data1;
var data2;
var req = new Request(
  "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=DEMO_KEY&lat=25&lon=-75&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10",
  {
    method: "get",
    mode: "cors",
    redirect: "follow",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }
);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJson(response) {
  return response.json();
}

// Use request as first parameter to fetch method

fetch(req)
  .then(checkStatus)
  .then(parseJson)
  .then(function(data) {
      data2 = data;
    console.log("Request succeeded with JSON response", data);
  })
  .catch(function(error) {
    console.log("Request failed", error);
  });

var previousData;
function update() {
  var tilt = document.getElementById("tilt");
  var azimuth = document.getElementById("azimuth");
  var tilt2 = document.getElementById("tilt2");
  var azimuth2 = document.getElementById("azimuth2");

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=sqwsN0LvPjhe16TTcTN7GL1nGxaerdC5c742GKaO&radius=0&lat=45&lon=-75&system_capacity=10&azimuth=" +
      azimuth.value +
      "&tilt=" +
      tilt.value +
      "&array_type=1&dc_ac_ratio=1.2&module_type=1&losses=10&dataset=nsrdb",
    false
  );
  xhr.send();

  var data = JSON.parse(xhr.response);

  var xhr2 = new XMLHttpRequest();
  xhr2.open(
    "GET",
    "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=sqwsN0LvPjhe16TTcTN7GL1nGxaerdC5c742GKaO&radius=0&lat=45&lon=-75&system_capacity=10&azimuth=" +
      azimuth2.value +
      "&tilt=" +
      tilt2.value +
      "&array_type=1&dc_ac_ratio=1.2&module_type=1&losses=10&dataset=nsrdb",
    false
  );
  xhr2.send();

  var data2 = JSON.parse(xhr2.response);

  var dataMonthly = [data.outputs.ac_monthly];
  var state = [data.station_info.state];
  var city = [data.station_info.city];
  var distance = [data.station_info.distance];
  var x = 0;
  var len = data.outputs.ac_monthly.length;
  while (x < len) {
    dataMonthly[x] = Math.round(data.outputs.ac_monthly[x]);
    x++;
  }

  var data2Monthly = [data2.outputs.ac_monthly];
  var x2 = 0;
  var len2 = data2.outputs.ac_monthly.length;
  console.log(len2);
  while (x2 < len2) {
    data2Monthly[x2] = Math.round(data2.outputs.ac_monthly[x2]);
    x2++;
  }

  console.log(data2Monthly);
  console.log(state);
  console.log(city);
  console.log(distance);

  var chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],

    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "#526786",
        pointColor: "#526786",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: dataMonthly
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(0,0,255,1)",
        pointColor: "rgba(0,0,255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: data2Monthly
      }
    ]
  };

  var barChartData = {
    labels: ["Annual Output"],

    datasets: [
      {
        label: "My First dataset",
        fillColor: "#526786",
        strokeColor: "#526786",
        pointColor: "#526786",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [Math.round(data.outputs.ac_annual)]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(0,0,255,1)",
        strokeColor: "rgba(0,0,255,1)",
        pointColor: "rgba(0,0,255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [Math.round(data2.outputs.ac_annual)]
      }
    ]
  };

  var ctx = document.getElementById("myChart").getContext("2d");
  var myNewChart = new Chart(ctx).Line(chartData);

  var barCtx = document.getElementById("myBarChart").getContext("2d");
  var myNewBarChart = new Chart(barCtx).Bar(barChartData, {
    barDatasetSpacing: 5
  });
}

update();

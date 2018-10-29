
    /* todo google map input, angular js conversion, dual input[DONE], 
    round  numbers on tooltips, output csv, hide api-key, more inputs, slider inputs */

    var previousData;
        function update() {
            var tilt = document.getElementById("tilt");
    var azimuth = document.getElementById("azimuth");
    var tilt2 = document.getElementById("tilt2");
    var azimuth2 = document.getElementById("azimuth2");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://developer.nrel.gov/api/pvwatts/v6.json?api_key=sqwsN0LvPjhe16TTcTN7GL1nGxaerdC5c742GKaO&radius=0&lat=45&lon=-75&system_capacity=10&azimuth=" + azimuth.value + "&tilt=" + tilt.value + "&array_type=1&dc_ac_ratio=1.2&module_type=1&losses=10&dataset=intl", false);
    xhr.send();

    var data = JSON.parse(xhr.response);

    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "http://developer.nrel.gov/api/pvwatts/v6.json?api_key=sqwsN0LvPjhe16TTcTN7GL1nGxaerdC5c742GKaO&radius=0&lat=45&lon=-75&system_capacity=10&azimuth=" + azimuth2.value + "&tilt=" + tilt2.value + "&array_type=1&dc_ac_ratio=1.2&module_type=1&losses=10&dataset=intl", false);
    xhr2.send();

    var data2 = JSON.parse(xhr2.response);

    var dataMonthly = [data.outputs.ac_monthly];
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

            var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

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
            var myNewBarChart = new Chart(barCtx).Bar(barChartData, {barDatasetSpacing: 5, }
    );
}

update();

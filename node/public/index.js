$(function() {
  var socket = io.connect();
  var ctx = document.getElementById('chartC').getContext('2d');

  var chartData = {};
  chartData.labels = ['', '', ''];
  chartData.datasets = [
    {
      label: 'celsius',
      fillColor: "rgba(151,187,205,0.4)",
      data: [22, 22, 22]
    },
    {
      label: 'fahrenheit',
      fillColor: "rgba(220,220,220,0.4)",
      data: [71.6, 71.6, 71.6]
    }
  ];

  var count = 3;

  var chartOptions = {
    scaleOverride: true,
    scaleStartValue: 10,
    scaleSteps: 18,
    scaleStepWidth: 5,
    animation: false,
    responsive: true
  };

  var chart = new Chart(ctx).Line(chartData, chartOptions);

  socket.on('temp', function(data) {

    count++;

    if(count > 50) {
      chart.removeData();
    }

    chart.addData([data.temp, (data.temp * 1.8 + 32)], '', '');

    $('#tempC').text(data.temp.toFixed(1));
    $('#tempF').text((data.temp * 1.8 + 32).toFixed(1));

    $('#lastUpdate').text('Last update: ' + new Date().toLocaleString());

  });

});

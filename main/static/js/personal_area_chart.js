var ctx = document.getElementById("MultiBarChart").getContext("2d");

var data = {
  labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  datasets: [{
    label: "Записано",
    backgroundColor: "rgba(3, 194, 236, 1)",
    data: [3, 7, 4, 2, 5, 7, 8]
  }, {
    label: "Прослушано",
    backgroundColor: "rgba(236, 103, 3, 1)",
    data: [4, 3, 5, 1, 2, 6, 1]
  }]
};

var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
      barValueSpacing: 20,
      scales: {
        y: {
          grid: {
            display: false
          }
        },
        x: {
           grid: {
            display: false
           }
        },
      },
    plugins: {
        responsive: false,
        maintainAspectRatio: false,
        paddingBelowLegends: false,
        legend: {
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
        position: 'top',
        align: 'start'
      },
    },
}

});



anychart.onDocumentReady(function() {
  anychart.data.loadJsonFile(
    'https://api.npoint.io/6f0d9bab0106709d4ca7',
    function(data) {
      var dataset = anychart.data.set(data);
      var mapping = dataset.mapAs({
        x: 'date',
        value: 'level'
      });
      var chart = anychart.calendar(mapping);

      chart.background('#22282D');

      chart.months()
        .stroke(false)
        .noDataStroke(false);

      chart.days()
        .spacing(5)
        .stroke(false)
        .noDataStroke(false)
        .noDataFill('#2d333b')
        .noDataHatchFill(false);

      chart.colorRange(false);

      var customColorScale = anychart.scales.ordinalColor();
      customColorScale.ranges([
        {equal: 0, color: '#0D4428'},
        {equal: 1, color: '#006D31'},
      ]);

      // Set color scale.
      chart.colorScale(customColorScale);

      chart.tooltip()
        .format('{%count} contributions');


      chart.container('actionchart');
      chart.draw();
    }
  );
});

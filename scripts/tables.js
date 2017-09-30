function fetchAndDraw(params, element) {
  var queryString = 'range=Sheet2!' + params['range'];
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1KaX2hVkAFuYs_E1H3aXbJs4CSs3tp9syZTvNnOfBVHY/gviz/tq?' + queryString);
  query.send(function(resp) { handleQueryResponse(resp, element, params); } );
}

function handleQueryResponse(response, element, params) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1, {
    calc: function(dt, row) { return String(dt.getValue(row, 1)) + params['unit']; },
    type: "string",
    role: "annotation"
  }, ]);
  
  var chart_container = jQuery('<div class="chart-container"></div>')
  jQuery(element).append(chart_container);
  jQuery(element).append('<p class="chart-label">' + params['label'] + '</p>');
  
  var options = {
    title: data.getColumnLabel(0),
    width: chart_container.width(),
    height: 300,
    legend: { position: "none" },
    chartArea: { left: 40, top: 10, width: chart_container.width() - 60, height: 220 },
    hAxis: { slantedText: true },
    colors: [ params['color'] ]
  };


  var chart = new google.visualization.ColumnChart(chart_container.get(0));
  chart.draw(view, options);
}

(function(jQuery) {
  jQuery(document).ready(function(){
   if (jQuery(".chart_div").length > 0){
 google.charts.load('current', {
      'packages': ['corechart']
    });


  	jQuery(".chart_div").each(function(){
      var container = this;
      google.charts.setOnLoadCallback(function() {
  	    fetchAndDraw({
          'range': jQuery(container).data('cells'),
          'unit': jQuery(container).data('unit'),
          'color': jQuery(container).data('bar-color'),
          'label': jQuery(container).data('label'),
        }, container);
      })
  	});
}
  });
})(jQuery)



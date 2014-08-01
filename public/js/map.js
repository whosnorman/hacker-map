var renderer;
var dirService = new google.maps.DirectionsService();
var map;
var zoom = 5;

function init() {
  var zoomIn = document.getElementById('zoomIn');
  var zoomOut = document.getElementById('zoomOut');

  renderer = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var springdale = new google.maps.LatLng(36.1814, -94.1458);
  var mapOptions = {
    zoom: zoom,
    center: springdale,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    panControl: false
  }

  var stylesArray = [
      { zoom: 5, center: chicago }, {
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [ {visibility: "off"}]
      },{
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      }
  ]
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  // infoWindow, markerOptions
  var renderOpt = {
    draggable: false,
    map: map,
    suppressMarkers: true,
    preserveViewport: true
  }

  renderer.setOptions(renderOpt);

  google.maps.event.addDomListener(zoomIn, 'click', function() {
    map.setZoom(++zoom);
  });

  google.maps.event.addDomListener(zoomOut, 'click', function() {
    map.setZoom(--zoom);
  });

}

function calcRoute() {
  var start = $('#start').val();
  var end = document.getElementById('end').value;
  //console.log(start);
  //console.log(end);
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
  };

  dirService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      renderer.setDirections(response);
      //console.log(response);
      //console.log(response.routes);
      var duration = response.routes[0].legs[0].duration.text;

      $('#time').text(duration);
    }
    else {
      console.log(status);
      $('#time').text("Error getting route");
    }
  });
}

google.maps.event.addDomListener(window, 'load', init);



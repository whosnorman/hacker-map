var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 5,
    center: chicago
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
  map = new google.maps.Map(document.getElementById('map-canvas'), stylesArray);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      //console.log(response);
      //console.log(response.routes);
      var duration = response.routes[0].legs[0].duration.text;

      $('#time').text(duration);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

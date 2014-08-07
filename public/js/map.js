var renderer;
var gm = google.maps;
var dirService = new gm.DirectionsService();
var map;
var zoom = 5;


function init() {
  var zoomIn = document.getElementById('zoomIn');
  var zoomOut = document.getElementById('zoomOut');

  renderer = new gm.DirectionsRenderer();
  //var chicago = new gm.LatLng(41.850033, -87.6500523);
  var springdale = new gm.LatLng(36.1814, -94.1458);

  var mapTypeId = "style_uno";

  var mapOptions = {
    zoom: zoom,
    center: springdale,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    panControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [gm.MapTypeId.ROADMAP, mapTypeId]
    },
    mapTypeId: mapTypeId
  };

  var blue = "#A7C5BD";
  var orange = "#EB7B59";
  var gray = "#808080";

  var mapStyles = [
      {
        featureType: 'water',
        stylers: [ 
          { color: blue },
          { gamma: 1.5}
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [ { color: orange }]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'poi.park',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'poi.government',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'poi.attraction',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'poi.business',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [ {visibility: "off"}]
      },{
        featureType: 'landscape.natural.landcover',
        stylers: [ {visibility: "off"}]
      },{
        featureType: 'landscape.man_made',
        stylers: [ {visibility: "off"}]
      },{
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.fill',
        stylers: [ {visibility: "off"}]
      },{
        featureType: 'administrative',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [ { weight: "0.5" }, { color: "#8D97AD" }]
      },{
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.neighborhood',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.province',
        elementType: 'labels.text.fill',
        stylers: [ { color: "#8D97AD" }]
      }
  ];
  map = new gm.Map(document.getElementById('map-canvas'), mapOptions);
  
  var styledMapOptions = {
    name: 'Style Uno'
  };

  var customMapType = new gm.StyledMapType(mapStyles, styledMapOptions);

  map.mapTypes.set(mapTypeId, customMapType);
  // infoWindow, markerOptions
  var renderOpt = {
    draggable: false,
    map: map,
    suppressMarkers: true,
    preserveViewport: true
  }

  renderer.setOptions(renderOpt);

  // zoom listeners
  gm.event.addDomListener(zoomIn, 'click', function() {
    map.setZoom(++zoom);
  });
  gm.event.addDomListener(zoomOut, 'click', function() {
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
      travelMode: gm.TravelMode.DRIVING
  };

  dirService.route(request, function(response, status) {
    if (status == gm.DirectionsStatus.OK) {
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

gm.event.addDomListener(window, 'load', init);



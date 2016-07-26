// Template by http://github.com/jackdougherty/leaflet-map/
// See Leaflet tutorial links in README.md

// set up the map center and zoom level
var map = L.map('map', {
  center: [41.5, -72.7], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false, // add later to reposition
  scrollWheelZoom: false
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/otl-redlining-ct">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

// REMOVE AFTER MAP CONSTRUCTION: optional Zoom Label (also in index.html)
L.control.zoomLabel().addTo(map);

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

L.control.scale().addTo(map);

// REMOVE AFTER MAP CONSTRUCTION: optional Coordinate Control (also in index.html)
var c = new L.Control.Coordinates();
c.addTo(map);
map.on('click', function(e) {
    c.setCoordinates(e);
});

/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired
var lightAll = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map); //this displays layer by default
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll');

// tileLayer.WMS as a baselayer - see http://leafletjs.com/reference.html#tilelayer-wms
// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var aerial1934 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1934 Connecticut Aerial Photography',
  // format: 'image/png',
  // version: '1.1.0',
  // transparent: true,
  attribution: '1934 <a href="http://magic.library.uconn.edu">MAGIC UConn</a> and <a href="http://cslib.org">CSL</a>'
});
controlLayers.addBaseLayer(aerial1934, 'CT Aerial 1934');

/* OVERLAYS */
// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var darien1937 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:Darien_Redlining_1937',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
}).addTo(map);
controlLayers.addOverlay(darien1937, 'Darien 1937 via MAGIC');

var easthartford1937 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:EastHartford_Redlining_1937',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
});
controlLayers.addOverlay(easthartford1937, 'East Hartford 1937 via MAGIC');

var easthartford1937tile = new L.tileLayer("http://mapwarper.net/maps/tile/15097/{z}/{x}/{y}.png", {
  attribution: '1937 <a href="http://mapwarper.net/maps/15097">MapWarper-NYPL</a>'
}).addTo(map);
controlLayers.addOverlay(easthartford1937tile, 'East Hartford 1937 MapWarper');

var hartford1937 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:Hartford_Redlining_1937',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
});
controlLayers.addOverlay(hartford1937, 'Hartford 1937 via MAGIC');

var hartford1937tile = new L.tileLayer("http://mapwarper.net/maps/tile/15096/{z}/{x}/{y}.png", {
  attribution: '1937 <a href="http://mapwarper.net/maps/15096">MapWarper-NYPL</a>'
}).addTo(map);
controlLayers.addOverlay(hartford1937tile, 'Hartford 1937 MapWarper');

var newcanaan1937 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:NewCanaan_Redlining_1937',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
}).addTo(map);
controlLayers.addOverlay(newcanaan1937, 'New Canaan 1937 via MAGIC');

//testing line 251 from view-source:http://dsl.richmond.edu/holc_national/
// with map metadata from http://dsl.richmond.edu/holc_national/metadata.json
var newhaven1937 = new L.tileLayer("http://holc.s3-website-us-east-1.amazonaws.com/tiles/CT/NewHaven/1937/{z}/{x}/{y}.png", {
  opacity: 0.9,
  noWrap: true,
  bounds: [[41.191787266, -73.0023123028],[41.3805378591,-72.8048750556]],
  minZoom: 6,
  maxZoom: 15
}).addTo(map);
controlLayers.addOverlay(newhaven1937, 'New Haven 1937 <b>via DSL</b>');

var newhaven1937 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1937_New_Haven_HOLC',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
});
controlLayers.addOverlay(newhaven1937, 'New Haven 1937 NEW via MAGIC');

//testing line 251 from view-source:http://dsl.richmond.edu/holc_national/
// with map metadata from http://dsl.richmond.edu/holc_national/metadata.json
var stamford1937 = new L.tileLayer("http://holc.s3-website-us-east-1.amazonaws.com/tiles/CT/Stamford/1937/{z}/{x}/{y}.png", {
  opacity: 0.9,
  noWrap: true,
  bounds: [[40.9981813986, -73.6760083697],[41.191881073,-73.4502348875]],
  minZoom: 7,
  maxZoom: 14
}).addTo(map);
controlLayers.addOverlay(stamford1937, 'Stamford 1937 <b>via DSL</b>');

$.getJSON("ct-towns.geojson", function (data) {
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'red',
        'weight': 2,
        'fillColor': '#fff',
        'fillOpacity': 0
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.town)
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'CT towns');
});

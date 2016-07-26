# otl-redlining-ct
leaflet map with HOLC redlining maps for Connecticut

## links-in-progress

http://jackdougherty.github.io/otl-redlining-ct/index.html

## Credits to insert
Richmond DSL, insert into the caption
Mapwarper NYPL

## TO DO

Testing layers from 3 sources:
- DSL nonWMS http://dsl.richmond.edu/holc_national/
- MAGIC WMS http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
- Mapwarper tiles http://mapwarper.net/maps/15096#Export_tab

```
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
  layers: 'MAGIC:NewHaven_Redlining_1937',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1937 <a href="http://magic.library.uconn.edu">MAGIC UConn</a>'
});
controlLayers.addOverlay(newhaven1937, 'New Haven 1937 via MAGIC');
```

## Questions:

- Why do DSL nonWMS layers display more clearly at lower zoom levels than MAGIC WMS layers?
- Why does the New Haven DSL layer visible at zoom level 10 and above, but not visible at zoom level 9 and below (on DSL platform or mine, regardless of the min zoom level setting)?
- Are the DSL nonWMS and MAGIC WMS layers of equal quality in closeups at high zoom levels?


Decide how to create this statewide map:
- which layers to use?
- create regular statewide map, with opacity controls to see streets underneath, or
- storymap layer (all tiles at once?) with zoom and coordinates

look at my notes about other maps: New Britain?

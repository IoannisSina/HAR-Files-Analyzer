// let mymap = L.map("mapid");
// let osmUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
// let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
// let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });
// mymap.addLayer(osm);

// let cfg = {
//     // radius should be small ONLY if scaleRadius is true (or small radius is intended)
//     // if scaleRadius is false it will be the constant radius used in pixels
//     "radius": 40,
//     "maxOpacity": 0.8,
//     // scales the radius based on map zoom
//     "scaleRadius": false,
//     // if set to false the heatmap uses the global maximum for colorization
//     // if activated: uses the data maximum within the current map boundaries
//     //   (there will always be a red spot with useLocalExtremas true)
//     "useLocalExtrema": false,
//     // which field name in your data represents the latitude - default "lat"
//     latField: 'lat',
//     // which field name in your data represents the longitude - default "lng"
//     lngField: 'lng',
//     // which field name in your data represents the data value - default "value"
//     valueField: 'count'
// };

// let heatmapLayer = new HeatmapOverlay(cfg);

// mymap.addLayer(heatmapLayer);

// let testData = {
//     max: 7,
//     data: [
//         { lat: 38.246242, lng: 21.735085, count: 3 },
//         { lat: 38.323343, lng: 21.865082, count: 2 },
//         { lat: 38.34381, lng: 21.57074, count: 1 },
//         { lat: 38.108628, lng: 21.502075, count: 8 },
//         { lat: 38.123034, lng: 21.917725, count: 4 }
//     ]
// };
// mymap.setView([38.246242, 21.7350847], 8);

// heatmapLayer.setData(testData);
// function create_heatmap(data) {
//     let mymap = L.map("mapid");
//     let osmUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
//     let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
//     let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });
//     mymap.addLayer(osm);

//     let cfg = {
//         // radius should be small ONLY if scaleRadius is true (or small radius is intended)
//         // if scaleRadius is false it will be the constant radius used in pixels
//         "radius": 40,
//         "maxOpacity": 0.8,
//         // scales the radius based on map zoom
//         "scaleRadius": false,
//         // if set to false the heatmap uses the global maximum for colorization
//         // if activated: uses the data maximum within the current map boundaries
//         //   (there will always be a red spot with useLocalExtremas true)
//         "useLocalExtrema": false,
//         // which field name in your data represents the latitude - default "lat"
//         latField: 'lat',
//         // which field name in your data represents the longitude - default "lng"
//         lngField: 'lng',
//         // which field name in your data represents the data value - default "value"
//         valueField: 'count'
//     };

//     let heatmapLayer = new HeatmapOverlay(cfg);

//     mymap.addLayer(heatmapLayer);

//     let testData = {
//         max: data[0][1]['count'],
//         data: data[0]
//     };
//     mymap.setView([38.246242, 21.7350847], 8);
//     let marker = L.marker ([data[0][1]['lat'], data[0][1]['lng']]);
//     marker.bindPopup(data[1][0]['city']);
//     marker.addTo(mymap);
//     heatmapLayer.setData(testData);
// }

// const xml_to_send = new XMLHttpRequest();
// xml_to_send.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         //create_heatmap(this.responseText);
//         create_heatmap(JSON.parse(this.response));
//         //console.log(JSON.parse(this.response));
//         //console.log(JSON.parse(this.responseText));
//     }
// };

// xml_to_send.open("POST", "http://localhost/project_web/user/user_heatmap.php", true);
// xml_to_send.setRequestHeader("Content-type", "application/json");
// xml_to_send.send(JSON.stringify(session_email));
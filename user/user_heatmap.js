let mymap = L.map("mapid");
// if (document.getElementById("mapid").innerHTML == "No entries to show" || refresh || true) {
let osmUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });
mymap.addLayer(osm);

let cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 40,
    "maxOpacity": 0.8,
    // scales the radius based on map zoom
    "scaleRadius": false,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
};

let heatmapLayer = new HeatmapOverlay(cfg);

mymap.addLayer(heatmapLayer);

send_request();



function create_heatmap(data) {

    if (data != "") {
        document.getElementById('no_entries').innerHTML = ""
        data = JSON.parse(data);
        let testData = {
            max: data[0][0]['count'],
            data: data[0]
        };

        let marker = L.marker([data[0][0]['lat'], data[0][0]['lng']]);
        marker.bindPopup(data[1][0]['city']);
        marker.addTo(mymap);
        mymap.setView([38.246242, 21.7350847], 8);
        heatmapLayer.setData(testData);
    } else {
        mymap.setView([38.246242, 21.7350847], 8);
        document.getElementById('no_entries').innerHTML = "No entries to show!";
    }


};


function send_request() {

    const xml_to_send = new XMLHttpRequest();
    xml_to_send.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //DISPLAY HEATMAP ONLY WHEN THERE ARE ENTRIES
            create_heatmap(this.responseText);

        }
    };

    xml_to_send.open("POST", "http://localhost/project_web/user/user_heatmap.php", true);
    xml_to_send.setRequestHeader("Content-type", "application/json");
    xml_to_send.send(JSON.stringify(session_email));
};

document.addEventListener('wheel', (evt) => {
    console.log("kappa");
}, {
    capture: true,
    passive: true
});
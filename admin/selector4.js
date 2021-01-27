var redIcon = new L.icon({
    iconUrl: 'marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

var mymap = L.map("mapid4");
// if (document.getElementById("mapid").innerHTML == "No entries to show" || refresh || true) {
let osmUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });
mymap.addLayer(osm);



function create_heatmap(data) {

    if (data != "") {

        //document.getElementById('no_entries').innerHTML = "";
        data = JSON.parse(data);
        // console.log(data);
        let all_users = {};
        let seen_user_location = [];
        let seen_servers_location = [];
        let seen_users = [];
        let temp_user = [];
        let temp_server = [];
        let locations_markers = {};
        //[lat, long]
        //THIS FOR IS FOR USERS AND
        for (let i = 0; i < data.length; i++) {

            temp_user.push(data[i]['upload_latitude']);
            temp_user.push(data[i]['upload_longitude']);

            //IF USER ALREADY SEEN
            if (!seen_users.includes(data[i]['usr'])) {
                seen_users.push(data[i]['usr']);
                all_users[data[i]['usr']] = {};
            }

            //MRKER FOR USER LOCATION-------------------------------------------------------
            if (!JSON.stringify(seen_user_location).includes(JSON.stringify(temp_user))) {
                //console.log("user");
                seen_user_location.push(temp_user);
                let marker = L.marker([temp_user[0], temp_user[1]], { icon: redIcon });
                marker.bindPopup("Username: " + data[i]['usr'] + "<br>" + "Lat: " + temp_user[0] + "<br>" + "Lon: " + temp_user[1]);
                marker.addTo(mymap);
            }

            //------------------------------------------------------------------------------
            //MARKER FOR SERVERS------------------------------------------------------------

            temp_server.push(data[i]['latitude']);
            temp_server.push(data[i]['longitude']);

            if (!JSON.stringify(seen_servers_location).includes(JSON.stringify(temp_server))) {
                seen_servers_location.push(temp_server);
                let marker1 = L.marker([temp_server[0], temp_server[1]]);
                marker1.bindPopup("<b>Lat</b>: " + temp_server[0] + ", " + "<b>Lon</b>: " + temp_server[1] + "<br>" + "<b>IP</b>: " + data[i]['SIP'] + ", <b>Requests</b>: " + data[i]['count']);
                locations_markers[JSON.stringify(temp_server)] = marker1;

                // marker1.addTo(mymap);
            } else {

                let current_popup = locations_markers[JSON.stringify(temp_server)]['_popup']['_content'];
                //if we have already written the IP dont do it again
                if (!current_popup.includes(data[i]['SIP'])) {
                    locations_markers[JSON.stringify(temp_server)].bindPopup(current_popup + "<br>" + "<b>IP</b>: " + data[i]['SIP'] + ", <b>Requests</b>: " + data[i]['count']);
                } else {
                    let splitted = current_popup.split("<br>");
                    let split_split = "";
                    let k = 0
                    for (k = 0; k < splitted.length; k++) {
                        if (splitted[k].includes(data[i]['SIP'])) {
                            split_split = splitted[k].split(':');
                            break;
                        }
                    }
                    let split_num = parseInt(split_split[2], 10) + data[i]['count'];
                    split_split = "<br>" + "<b>IP</b>: " + data[i]['SIP'] + ", <b>Requests</b>: " + split_num;

                    for (let j = 0; j < splitted.length; j++) {
                        if (j != k) split_split += splitted[j];
                    }
                    //set new popUP
                    locations_markers[JSON.stringify(temp_server)].bindPopup(split_split);
                }

            }

            //------------------------------------------------------------------------------
            //ADD LINES


            temp_user = [];
            temp_server = [];
        }
        //--------------------THIS FOR IS FOR THE LINES-------------------
        for (let h = 0; h < data.length; h++) {
            let coords = data[h]['latitude'] + "," + data[h]['longitude'];
            let temp_user = all_users[data[h]['usr']];
            if (temp_user[coords] !== undefined) {
                temp_user[coords] += parseInt(data[h]['count'], 10);
            } else {
                temp_user[coords] = parseInt(data[h]['count'], 10);
            }
        }
        //-----------------------------------------------------------------
        //-----------------------FIND MAX VALUE-----------------------------
        let temp_arr = [];
        for (let key_1 in all_users) {
            for (let key_2 in all_users[key_1]) {
                temp_arr.push(all_users[key_1][key_2]);
            }
        }
        let max_count = Math.max(...temp_arr);
        let min_count = Math.min(...temp_arr);

        //-----------------------------------------------------------------


        //ADD MARKERS TO MAP
        let usr_index = -1;
        for (let key_1 in all_users) {
            usr_index++;
            let usr_lat = parseFloat(seen_user_location[usr_index][0]);
            let usr_lon = parseFloat(seen_user_location[usr_index][1]);
            for (let key_2 in all_users[key_1]) {
                //normazlize value
                all_users[key_1][key_2] = ((all_users[key_1][key_2] - min_count) / (max_count - min_count)) * 10;
                //ADD LINES TO MAP
                let srvr_lat = key_2.split(",")[0];
                let srvr_lon = key_2.split(",")[1];
                let user_point = new L.LatLng(usr_lat, usr_lon);
                let server_point = new L.LatLng(srvr_lat, srvr_lon);
                let pointList = [user_point, server_point];

                let polyline = new L.Polyline(pointList, {
                    color: 'green',
                    weight: all_users[key_1][key_2],
                    opacity: 10,
                    smoothFactor: 1
                });
                if (polyline['options']['weight'] < 0.2) {
                    polyline['options']['weight'] = 1;
                    polyline['options']['color'] = 'red';
                }
                polyline.addTo(mymap);
            }
        }


        //ADD MARKERS
        for (let key in locations_markers) {
            locations_markers[key].addTo(mymap);
        }


        mymap.setView([0, 0], 2);
    } else {
        // mymap.setView([38.246242, 21.7350847], 8);
        //document.getElementById('no_entries').innerHTML = "No entries to show!";
    }

};



// Passive event listeners are an emerging web standard, new feature shipped in Chrome 51 that provide a major potential boost to scroll performance.
// It enables developers to opt-in to better scroll performance by eliminating the need for scrolling to block on touch and wheel event listeners.
// This optimization is partially defeated by the need to wait for the results of any touchstart and touchmove handlers, which may prevent the scroll entirely by calling preventDefault() on the event.
document.addEventListener('wheel', (evt) => {

}, {
    capture: true,
    passive: true
});


const xml_to_send = new XMLHttpRequest();
xml_to_send.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //DISPLAY HEATMAP ONLY WHEN THERE ARE ENTRIES
        create_heatmap(this.responseText);
    }
};

xml_to_send.open("POST", "http://localhost/project_web/admin/selector4.php", true);
xml_to_send.setRequestHeader("Content-type", "application/json");
xml_to_send.send();
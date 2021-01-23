const content_selector_3 = document.getElementById('selector_contenttype_3');
const isp_selector_3 = document.getElementById('selector_isp_3');
const sub_btn_3 = document.getElementById('submit_3');
const clear_btn_3 = document.getElementById('clear_3');
const select_all_btn_3 = document.getElementById('select_all_3');
const graph_selector_3 = document.getElementById('graph_selector_3');
var ctx_3 = document.getElementById('graph_3').getContext('2d');


sub_btn_3.onclick = function() {
    let selected_graph = graph_selector_3.value;

    // Options & an load run are filled from selector2.js for optimalization
    let values_contenttype_3 = $("#selector_contenttype_3").val();
    let values_isp_3 = $("#selector_isp_3").val();

    if (values_contenttype_3.length == 0) {
        $('#selector_contenttype_3').selectpicker('selectAll');
        values_contenttype_3 = $("#selector_contenttype_3").val();
    }

    if (values_isp_3.length == 0) {
        $('#selector_isp_3').selectpicker('selectAll');
        values_isp_3 = $("#selector_isp_3").val();
    }
    const xml_line_data_3 = new XMLHttpRequest();
    xml_line_data_3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                line_data_3(JSON.parse(this.responseText));
            } catch (error) {
                console.error(error);
            }


        }
    };
    xml_line_data_3.open("POST", "http://localhost/project_web/admin/selector3.php", true);
    xml_line_data_3.send(JSON.stringify([values_contenttype_3, values_isp_3, selected_graph]));
};

clear_btn_3.onclick = function() {
    $('.selectors_3').selectpicker('deselectAll');
};

select_all_btn_3.onclick = function() {
    $('.selectors_3').selectpicker('selectAll');
};


function line_data_3(response) {

    let selected_graph = graph_selector_3.value;
    if (selected_graph == 'a') {

        let backgroundColors = [];
        for (let j = 0; j < response[0].length; j++) backgroundColors.push("rgb(53, 199, 199)");
        let data = {

            labels: response[0],
            barThickness: "flex",
            datasets: [{
                label: "Number of TTL's per bucket",
                data: response[1],
                backgroundColor: backgroundColors
            }],
            borderWidth: 2,

        };
        let options = {
            title: {
                display: true,
                text: 'Time to Live',
            },
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    position: 'left',
                }]
            }
        };
        myBarChart_3.destroy();
        myBarChart_3 = new Chart(ctx_3, {
            type: 'bar'
        });
        myBarChart_3.data = data;
        myBarChart_3.options = options;
        myBarChart_3.update();
    } else if (selected_graph == 'b') {
        //....
    } else {
        let data = {

            labels: response[0],
            barThickness: "flex",
            datasets: [{
                fill: false,
                backgroundColor: [
                    'purple',
                    'orange',
                    'yellow',
                    'cyan'
                ],
                data: response[1],
            }],
            borderWidth: 1,

        };
        let options = {
            title: {
                display: true,
                text: 'Percentage of Cacheability Directives',
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let sum = data['datasets'][0]['data'].reduce(function(a, b) {
                            return a + b;
                        }, 0);
                        console.log(sum);
                        return ((data['datasets'][0]['data'][tooltipItem['index']] / sum) * 100).toFixed(2) + '%';
                    }
                }
            }

        };
        
        myBarChart_3.destroy();
        myBarChart_3 = new Chart(ctx_3, {
            type: 'pie'
        });
        myBarChart_3.data = data;
        myBarChart_3.options = options;
        myBarChart_3.update();

    }

};


//send the request to the API
var myBarChart_3 = new Chart(ctx_3, {
    type: 'bar'
});
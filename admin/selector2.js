const content_selector = document.getElementById('selector_contenttype');
const isp_selector = document.getElementById('selector_isp');
const sub_btn = document.getElementById('submit');
const clear_btn = document.getElementById('clear');
const select_all_btn = document.getElementById('select_all');
var ctx_2 = document.getElementById('graph_2').getContext('2d');

sub_btn.onclick = function() {


    let values_contenttype = $("#selector_contenttype").val();
    let values_days = $("#selector_days").val();
    let values_httpmethod = $("#selector_httpmethod").val();
    let values_isp = $("#selector_isp").val();

    if (values_contenttype.length == 0) {
        $('#selector_contenttype').selectpicker('selectAll');
        values_contenttype = $("#selector_contenttype").val();
    }

    if (values_days.length == 0) {
        $('#selector_days').selectpicker('selectAll');
        values_days = $("#selector_days").val();
    }

    if (values_httpmethod.length == 0) {
        $('#selector_httpmethod').selectpicker('selectAll');
        values_httpmethod = $("#selector_httpmethod").val();
    }

    if (values_isp.length == 0) {
        $('#selector_isp').selectpicker('selectAll');
        values_isp = $("#selector_isp").val();
    }

    const xml_line_data = new XMLHttpRequest();
    xml_line_data.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                line_data(JSON.parse(this.responseText));
            } catch {
                console.log(this.responseText);
            }

        }
    };
    xml_line_data.open("POST", "http://localhost/project_web/admin/timings_graph.php", true);
    xml_line_data.send(JSON.stringify([values_contenttype, values_days, values_httpmethod, values_isp]));
};

function line_data(response) {


    let data = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [{
            data: response,
            label: "Average timings",
            borderColor: "red",
            fill: false
        }],

    }
    let options = {

        scales: {
            gridLines: { color: 'red' },
            xAxes: [{

                scaleLabel: {
                    display: true,
                    labelString: 'Hour of Day',

                }
            }],
            yAxes: [{

                scaleLabel: {
                    display: true,
                    labelString: 'Timings',

                }
            }]
        },
        title: {
            display: true,
            text: 'Timings per Hour',
        }
    };



    myLineChart.data = data;
    myLineChart.options = options;
    myLineChart.update();

};

function onload_all(response) {
    let isps = response[0];
    let content_types = response[1];
    for (let i = 0; i < isps.length; i++) {
        let opt = document.createElement('option');
        opt.value = isps[i];
        opt.innerHTML = isps[i];
        isp_selector.add(opt);

    }
    //push also to the selector of 3
    for (let i = 0; i < isps.length; i++) {
        let opt = document.createElement('option');
        opt.value = isps[i];
        opt.innerHTML = isps[i];
        document.getElementById('selector_isp_3').add(opt);
    }

    for (let j = 0; j < content_types.length; j++) {
        let opt = document.createElement('option');
        opt.value = content_types[j];
        opt.innerHTML = content_types[j];
        content_selector.add(opt);
    }
    //push also to the selector of 3
    for (let j = 0; j < content_types.length; j++) {
        let opt = document.createElement('option');
        opt.value = content_types[j];
        opt.innerHTML = content_types[j];
        document.getElementById('selector_contenttype_3').add(opt);
    }
    //refresh all selectpickers
    $('.selectpicker').selectpicker('refresh');
    sub_btn.click();
    //click_button_3 as well
    sub_btn_3.click();

};

clear_btn.onclick = function() {
    $('.selectors_2').selectpicker('deselectAll');
};

select_all_btn.onclick = function() {
    $('.selectors_2').selectpicker('selectAll');
};


//-----------------------------------------------------FILL SELECTORS------------------------------------------------------------------------

//send the request to the API

const xml_fill_selectors = new XMLHttpRequest();
xml_fill_selectors.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        onload_all(JSON.parse(this.responseText));
    }
};
xml_fill_selectors.open("POST", "http://localhost/project_web/admin/selector2.php", true);
xml_fill_selectors.send();

var myLineChart = new Chart(ctx_2, {
    type: 'line'

});
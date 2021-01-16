const content_selector_3 = document.getElementById('selector_contenttype_3');
const isp_selector_3 = document.getElementById('selector_isp_3');
const sub_btn_3 = document.getElementById('submit_3');
const clear_btn_3 = document.getElementById('clear_3');
const select_all_btn_3 = document.getElementById('select_all_3');
var ctx_3 = document.getElementById('graph_3').getContext('2d');


sub_btn_3.onclick = function() {

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
            } catch {
                console.log(this.responseText);
            }
        }
    };
    xml_line_data_3.open("POST", "http://localhost/project_web/admin/selector3.php", true);
    xml_line_data_3.send(JSON.stringify([values_contenttype_3, values_isp_3]));
};

clear_btn_3.onclick = function() {
    $('.selectors_3').selectpicker('deselectAll');
};

select_all_btn_3.onclick = function() {
    $('.selectors_3').selectpicker('selectAll');
};

function line_data_3(response) {
    console.log(response);
};


//send the request to the API


//sub_btn_3.click();
var myBarChart_3 = new Chart(ctx_3, {
    type: 'bar',
    data: {
        labels: [1, 2, 3, 4, 5, 6, "76 - 10", 7],
        datasets: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [10, 20, 30, 40, 50, 60, 70]
        }]
    },
    title: {
        display: true,
        text: 'Timings per Hour',
    }
});
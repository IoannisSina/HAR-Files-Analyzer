const welcome_message = document.getElementById('welcome_message');
const selector_1 = document.getElementById('selector-1');
var ctx = document.getElementById('selector_1_pie').getContext('2d');

welcome_message.innerHTML = "Welcome " + session_username;


function selector1_func() {
    const xml_selector_1 = new XMLHttpRequest();
    xml_selector_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                bar_data(JSON.parse(this.responseText));
            } catch {
                alert(this.responseText);
            }
        }
    }
    xml_selector_1.open("POST", "http://localhost/project_web/admin/selector1.php", true);
    xml_selector_1.send(JSON.stringify(selector_1.value));
};

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
};

function bar_data(response) {

    let data = {

        labels: response[0],
        datasets: [{
            // barPercentage: 0.5,
            // barThickness: 6,
            // maxBarThickness: 2,
            // minBarLength: 2,
            data: response[1]
        }],
        borderWidth: 1
    }
    myBarChart.data = data;
    myBarChart.update();


};


function pie_data(response) {

    let data = {
        labels: response[0],
        datasets: [{
            fill: false,
            backgroundColor: [
                'cyan',
                'red',
                'blue',
                'purple'
            ],
            data: response[1],
            //Notice the borderColor 
            // borderColor:	['black', 'black'],
            borderWidth: [3, 3],
            // hoverBackgroundColor: ["lightskyblue", "yellow"]
        }],
        options: {
            legend: {
                labels: {
                    fontColor: "red"
                }
            }
        }
    };
    myDoughnutChart.data = data;
    myDoughnutChart.update();

};

selector_1.addEventListener('change', selector1_func);
// selector1_func();

// // And for a doughnut chart
// var myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     title: {
//         display: true,
//         text: "Colors election"
//     }
// });

var myBarChart = new Chart(ctx, {
    type: 'bar',
    title: {
        display: true,
        text: "Colors election"
    }
});




// var options = {
//           series: [{
//           data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
//         }],
//           chart: {
//           type: 'bar',
//           height: 350
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true,
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         xaxis: {
//           categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
//             'United States', 'China', 'Germany'
//           ],
//         }
//         };

// });
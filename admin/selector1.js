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

    let backgroundColors = [];
    for (let j = 0; j < response[1].length; j++) backgroundColors.push("rgba(224, 213, 213, 1)");

    let data = {

        labels: response[0],
        barThickness: "flex",
        datasets: [{
            label: response[2],
            data: response[1],
            backgroundColor: backgroundColors,
        }],
        borderWidth: 2,

    };
    let options = {
        scales: {
            yAxes: [{
                type: 'linear',
                position: 'left',
                // ticks: {
                //     min: Math.min(...response[1]), //minimum tick
                //     max: Math.max(...response[1]), //maximum tick
                //     callback: function(value, index, values) {
                //         return Number(value.toString()); //pass tick values as a string into Number function
                //     }
                // },
                // afterBuildTicks: function(chartObj) { //Build ticks labelling as per your need
                //     let max = Math.max(...response[1]);
                //     chartObj.ticks = [];
                //     chartObj.ticks.push(Math.min(...response[1]));
                //     chartObj.ticks.push(100);
                //     chartObj.ticks.push(1000);
                //     chartObj.ticks.push(100000);
                //     chartObj.ticks.push(parseInt(Math.max(...response[1])));
                // }

            }]
        }
    };

    myBarChart.data = data;
    myBarChart.options = options;
    myBarChart.update();

};

selector_1.addEventListener('change', selector1_func);
selector1_func();
var myBarChart = new Chart(ctx, {
    type: 'bar'
});

// // And for a doughnut chart
// var myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     title: {
//         display: true,
//         text: "Colors election"
//     }
// });
// let options = {
//     legend: {
//         labels: {
//             // This more specific font property overrides the global property
//             fontColor: 'red'
//         }
//     },
//     scales: {
//         yAxes: [{
//             type: 'logarithmic',
//             position: 'left',
//             afterBuildTicks: function(chartObj) { //Build ticks labelling as per your need
//                 chartObj.ticks = [];
//                 chartObj.ticks.push(10);
//                 chartObj.ticks.push(100);
//                 chartObj.ticks.push(1000);
//                 chartObj.ticks.push(1000000);
//                 chartObj.ticks.push(25000000);
//             }

//         }]
//     }
// }


// function pie_data(response) {

//     let data = {
//         labels: response[0],
//         datasets: [{
//             fill: false,
//             backgroundColor: [
//                 'cyan',
//                 'red',
//                 'blue',
//                 'purple'
//             ],
//             data: response[1],
//             //Notice the borderColor 
//             // borderColor:	['black', 'black'],
//             borderWidth: [3, 3],
//             // hoverBackgroundColor: ["lightskyblue", "yellow"]
//         }],
//         options: {
//             legend: {
//                 labels: {
//                     fontColor: "red"
//                 }
//             }
//         }
//     };
//     myDoughnutChart.data = data;
//     myDoughnutChart.update();

// };
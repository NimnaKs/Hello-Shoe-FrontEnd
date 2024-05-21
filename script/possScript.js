let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");

sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

const incomeData = [1000, 1200, 800, 1500, 2000, 1800, 1600, 2200, 2500, 2100, 1800, 2000];

const ctx = $('#myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Earnings in Rs',
            data: incomeData,
            // backgroundColor:[
            //     '#cce5ff'
            // ],
            borderColor: [
                '#66b0ff'
            ],
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});

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

let countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
    "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe"
];

const myFunction = function (i, page_name) {
    let id = [
        '#home_page', '#customer_page', '#product_page', '#product_list_page',
        '#order_page', '#stock_page', '#supplier_page', '#return_page', '#employee_page'
    ];
    let loadingScreens = [
        '#home', '#customer', '#product', '#product-list',
        '#order', '#stock', '#supplier', '#return', '#employee'
    ];

    for (let j = 0; j < id.length; j++) {
        if (i === j) {
            $(loadingScreens[j]).css('display', 'block');
            $(id[j]).addClass("active");
            console.log(id[j])
        } else {
            $(loadingScreens[j]).css('display', 'none');
            $(id[j]).removeClass("active");
        }
    }

    $('.dashboard').text(page_name);
}

$(document).ready(function () {

    $('#home_page').on('click', () => {
        myFunction(0, 'Dashboard');
    });

    $('#customer_page').on('click', function () {
        myFunction(1, 'Customer Details');
    });

    $('#product_page').on('click', function () {
        myFunction(2, 'Product Details');
    });

    $('#product_list_page').on('click', function () {
        myFunction(3, 'Product List');
    });

    $('#order_page').on('click', function () {
        myFunction(4, 'Order Details');
    });

    $('#stock_page').on('click', function () {
        myFunction(5, 'Stock Details');
    });

    $('#supplier_page').on('click', function () {
        myFunction(6, 'Supplier Details');
    });

    $('#return_page').on('click', function () {
        myFunction(7, 'Return Details');
    });

    $('#employee_page').on('click', function () {
        myFunction(8, 'Employee Details');
    });
});

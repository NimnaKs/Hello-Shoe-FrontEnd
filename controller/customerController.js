import {CustomerApi} from "../api/customerApi.js";

$(document).ready(function () {
    let custAddBtn = $('#custAddBtn');
    let heading = $('#customerFormHeading');
    let customerForm = $('#customerForm');
    let custClear = $('#custClear');

    let id = $('#customer-id');
    let level = $('#customer-level');
    let totalPoint = $('#customer-totalPoint');
    let joinDate = $('#customer-joinDate');
    let purchasedDate = $('#customer-recent-purchased-date');

    let name = $('#customer-name');
    let gender = $('#customer-gender');
    let dob = $('#customer-dob');
    let address1 = $('#customer-address1');
    let address2 = $('#customer-address2');
    let address3 = $('#customer-address3');
    let address4 = $('#customer-address4');
    let postalCode = $('#customer-postalCode');
    let contact = $('#customer-contact');
    let email = $('#customer-email');

    let custSaveUpdateBtn = $('#customer-save-update-btn');

    let customerApi = new CustomerApi();

    function generateCustomerId() {
        customerApi.generateCustomerId()
            .then(custId => {
                id.val(custId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating customer ID');
            });
    }

    function setOtherProps() {
        level.val('NEW');
        totalPoint.val(0);
        let currentDate = new Date().toISOString().slice(0, 10);
        joinDate.val(currentDate);
        purchasedDate.val(currentDate);
    }

    custAddBtn.on('click', function () {
        heading.text('Add New Customer');
        customerForm[0].reset();
        generateCustomerId();
        setOtherProps();
    });

    custClear.on('click', function () {
        customerForm[0].reset();
    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }
});
import {CustomerApi} from "../api/customerApi.js";
import {CustomerModel} from "../model/customerModel.js";

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

    let tableBody = $('#cust-table-body');

    let search = $('#searchInput');

    let customerApi = new CustomerApi();

    populateCustomerTable();

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
        joinDate.val(new Date().toISOString().slice(0, 10));
        /*purchasedDate.val(new Date().toISOString().slice(0, 10));*/
    }

    custAddBtn.on('click', function () {
        openCustomerModal('Add New Customer', 'Save', 'btn-success');
        customerForm[0].reset();
        generateCustomerId();
        setOtherProps();
    });

    custClear.on('click', function () {
        customerForm[0].reset();
    });

    custSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let customer_id = id.val();
        let custName = name.val();
        let contact_no = contact.val();
        let email_add = email.val();
        let add1 = address1.val();
        let add2 = address2.val();
        let add3 = address3.val();
        let add4 = address4.val();
        let dobVal = dob.val();
        let postalVal = postalCode.val();
        let genderVal = gender.val();

        let customerModel = new CustomerModel(
            null,
            custName,
            genderVal,
            null,
            null,
            null,
            dobVal,
            add1,
            add2,
            add3,
            add4,
            postalVal,
            contact_no,
            email_add,
            null
        );

        console.log(customerModel);

        if (custSaveUpdateBtn.text() === 'Save') {
            customerApi.saveCustomer(customerModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    custClear.click();
                    populateCustomerTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        } else {
            customerApi.updateCustomer(customerModel,customer_id)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    custClear.click();
                    populateCustomerTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Update Unsuccessful', error);
                });
        }

    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    function populateCustomerTable() {
        customerApi.getAllCustomer()
            .then((responseText) => {
                let customer_db = responseText;
                tableBody.empty();
                customer_db.forEach((customer) => {
                    tableBody.append(
                        `<tr>
                        <th row='span'>${customer.customerId}</th>
                        <td>${customer.customerName}</td>
                        <td>${customer.gender}</td>
                        <td>${customer.level}</td>
                        <td>${customer.joinDate}</td>
                        <td>${customer.totalPoint}</td>
                        <td>${customer.dob}</td>
                        <td>${customer.address1},${customer.address2},${customer.address3},${customer.address4}</td>
                        <td>${customer.postalCode}</td>
                        <td>${customer.contactNo}</td>
                        <td>${customer.email}</td>
                        <td>${(customer.recentPurchasedDate == null) ? 'No Purchased Done yet' : customer.recentPurchasedDate}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#customerModal"
                                data-customer-id="${customer.customerId}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-customer-id="${customer.customerId}">
                                Delete
                            </button>
                        </td>
                    </tr>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('fetch Unsuccessful', error);
            });
    }

    tableBody.on('click', '.updateBtn', function () {
        const customerId = $(this).data('customer-id');
        openCustomerModal('Update Customer', 'Update', 'btn-warning', customerId);
    });

    tableBody.on('click', '.deleteBtn', function () {
        const customerId = $(this).data('customer-id');
        deleteCustomer(customerId);
    });

    function deleteCustomer(customerId) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                customerApi.deleteCustomer(customerId)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        populateCustomerTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Customer delete Unsuccessful', error);
                    });
            }
        });

    }

    function openCustomerModal(headingtxt, buttonText, buttonClass, custId) {

        if (custId) {
            customerApi.getCustomer(custId)
                .then((responseText) => {
                    let customer = responseText;
                    id.val(customer.customerId);
                    level.val(customer.level);
                    totalPoint.val(customer.totalPoint);
                    joinDate.val(customer.joinDate);
                    purchasedDate.val(customer.recentPurchasedDate);
                    name.val(customer.customerName);
                    gender.val(customer.gender);
                    dob.val(customer.dob);
                    address1.val(customer.address1);
                    address2.val(customer.address2);
                    address3.val(customer.address3);
                    address4.val(customer.address4);
                    postalCode.val(customer.postalCode);
                    contact.val(customer.contactNo);
                    email.val(customer.email);
                })
                .catch((error) => {
                    console.log(error);
                    showError('Fetch Unsuccessful', error);
                });
        }

        heading.text(headingtxt);
        custSaveUpdateBtn.text(buttonText);
        custSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);

    }

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#cust-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

});

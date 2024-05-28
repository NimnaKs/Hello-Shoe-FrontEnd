
import { SupplierApi } from "../api/supplierApi.js";
import { SupplierModel } from "../model/supplierModel.js";

$(document).ready(function () {
    let supAddBtn = $('#supAddBtn');
    let heading = $('#supplierFormHeading');
    let supplierForm = $('#supplierForm');
    let supClear = $('#supClear');

    let id = $('#sup-id');
    let name = $('#sup-name');
    let category = $('#sup-category');
    let address1 = $('#sup-address1');
    let address2 = $('#sup-address2');
    let address3 = $('#sup-address3');
    let address4 = $('#sup-address4');
    let postalCode = $('#sup-postalCode');
    let countryCBox = $('#sup-country');
    let contact1 = $('#sup-contact-1');
    let contact2 = $('#sup-contact-2');
    let email = $('#sup-email');

    let supSaveUpdateBtn = $('#sup-save-update-btn');
    let tableBody = $('#sup-table-body');
    let search = $('#searchInput');


    let supplierApi = new SupplierApi();

    populateSupplierTable();

    populateCountriesCBox();

    function populateCountriesCBox(){
        countries.forEach(function(country) {
            let option = $('<option></option>').attr('value', country).text(country);
            countryCBox.append(option);
        });
    }
    function generateSupplierId() {
        supplierApi.generateSupplierId()
            .then(supId => {
                id.val(supId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating supplier ID');
            });
    }

    supAddBtn.on('click', function () {
        openSupplierModal('Add New Supplier', 'Save', 'btn-success');
        supplierForm[0].reset();
        generateSupplierId();
    });

    supClear.on('click', function () {
        supplierForm[0].reset();
    });

    supSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let supplierId = id.val();
        let supplierName = name.val();
        let supplierCategory = category.val();
        let supplierAddress1 = address1.val();
        let supplierAddress2 = address2.val();
        let supplierAddress3 = address3.val();
        let supplierAddress4 = address4.val();
        let supplierPostalCode = postalCode.val();
        let supplierCountry = countryCBox.val();
        let supplierContact1 = contact1.val();
        let supplierContact2 = contact2.val();
        let supplierEmail = email.val();

        let supplierModel = new SupplierModel(
            null,
            supplierName,
            supplierCategory,
            supplierAddress1,
            supplierAddress2,
            supplierAddress3,
            supplierAddress4,
            supplierPostalCode,
            supplierCountry,
            supplierContact1,
            supplierContact2,
            supplierEmail
        );

        if (supSaveUpdateBtn.text() === 'Save') {
            supplierApi.saveSupplier(supplierModel)
                .then((responseText) => {
                    Swal.fire(responseText, 'Successful', 'success');
                    supClear.click();
                    populateSupplierTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        } else {
            supplierApi.updateSupplier(supplierModel, supplierId)
                .then((responseText) => {
                    Swal.fire(responseText, 'Successful', 'success');
                    supClear.click();
                    populateSupplierTable();
                })
                .catch((error) => {
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

    function populateSupplierTable() {
        supplierApi.getAllSuppliers()
            .then((suppliers) => {
                tableBody.empty();
                suppliers.forEach((supplier) => {
                    tableBody.append(
                        `<tr>
                            <th scope="row">${supplier.supplierCode}</th>
                            <td>${supplier.supplierName}</td>
                            <td>${supplier.category}</td>
                            <td>${supplier.address1}, ${supplier.address2}, ${supplier.address3}, ${supplier.address4}</td>
                            <td>${supplier.postalCode}</td>
                            <td>${supplier.country}</td>
                            <td>${supplier.contactNo1}</td>
                            <td>${supplier.contactNo2}</td>
                            <td>${supplier.email}</td>
                            <td>
                                <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#supplierModal"
                                    data-supplier-id="${supplier.supplierCode}">
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button class="deleteBtn btn btn-danger btn-sm" data-supplier-id="${supplier.supplierCode}">
                                    Delete
                                </button>
                            </td>
                        </tr>`
                    );
                });
            })
            .catch((error) => {
                showError('Fetch Unsuccessful', error);
            });
    }

    tableBody.on('click', '.updateBtn', function () {
        const supplierId = $(this).data('supplier-id');
        openSupplierModal('Update Supplier', 'Update', 'btn-warning', supplierId);
    });

    tableBody.on('click', '.deleteBtn', function () {
        const supplierId = $(this).data('supplier-id');
        deleteSupplier(supplierId);
    });

    function deleteSupplier(supplierId) {
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
                supplierApi.deleteSupplier(supplierId)
                    .then((responseText) => {
                        Swal.fire(responseText, 'Successful', 'success');
                        populateSupplierTable();
                    })
                    .catch((error) => {
                        showError('Delete Unsuccessful', error);
                    });
            }
        });
    }

    function openSupplierModal(headingText, buttonText, buttonClass, supplierId) {
        if (supplierId) {
            supplierApi.getSupplier(supplierId)
                .then((supplier) => {
                    id.val(supplier.supplierCode);
                    name.val(supplier.supplierName);
                    category.val(supplier.category);
                    address1.val(supplier.address1);
                    address2.val(supplier.address2);
                    address3.val(supplier.address3);
                    address4.val(supplier.address4);
                    postalCode.val(supplier.postalCode);
                    countryCBox.val(supplier.country);
                    contact1.val(supplier.contactNo1);
                    contact2.val(supplier.contactNo2);
                    email.val(supplier.email);
                })
                .catch((error) => {
                    showError('Fetch Unsuccessful', error);
                });
        }

        heading.text(headingText);
        supSaveUpdateBtn.text(buttonText);
        supSaveUpdateBtn.removeClass().addClass(`btn ${buttonClass}`);
    }

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#sup-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

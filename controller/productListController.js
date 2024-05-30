import {ProductListApi} from "../api/productListApi.js";
import {GenderModel} from "../model/genderModel.js";

$(document).ready(function () {

    let genderTableBody = $('#gender-table-body');
    let occasionTableBody = $('#occasion-table-body');
    let varietyTableBody = $('#variety-table-body');
    let sizeTableBody = $('#size-table-body');

    let genderId = $('#gender-id');
    let genderDesc = $('#gender-desc');

    let genderSaveUpdateBtn = $('#gender-save-update-btn');
    let genderClear = $('#genderClear');
    let genderReset = $('#genderReset');
    let genderAddBtn = $('#genderAddBtn');

    let genderForm = $('#genderForm');
    let genderHeading = $('#genderFormHeading');

    let productListApi = new ProductListApi();

    populateGenderTable();

    genderClear.on('click', function () {
        genderForm[0].reset();
    });
    function openGenderModal(headingtxt,buttonText, btnClass,genId,genDesc) {

        if (genId && genDesc) {
            genderId.val(genId).prop('disabled', true);
            genderDesc.val(genDesc);
        }else{
            genderId.prop('disabled', false);
        }

        genderHeading.text(headingtxt);
        genderSaveUpdateBtn.text(buttonText);
        genderSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(btnClass);

    }

    genderAddBtn.on('click', function () {
        openGenderModal('Add New Gender', 'Save', 'btn-success');
        genderForm[0].reset();
    });

    function populateGenderTable() {
        productListApi.getAllGenders()
            .then((responseText) => {
                let customer_db = responseText;
                genderTableBody.empty();
                customer_db.forEach((gender) => {
                    genderTableBody.append(
                        `<tr>
                        <th row='span'>${gender.genderCode}</th>
                        <td>${gender.genderDesc}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#genderModal"
                                data-gender-code="${gender.genderCode}" data-gender-desc="${gender.genderDesc}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-gender-code="${gender.genderCode}">
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

    genderSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let id = genderId.val();
        let desc = genderDesc.val();

        let genderModel = new GenderModel(id,desc);

        console.log(genderSaveUpdateBtn.text());

        if (genderSaveUpdateBtn.text() === 'Save') {
            productListApi.saveGender(genderModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    genderClear.click();
                    populateGenderTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        }else{
            productListApi.updateGender(genderModel,id)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    genderClear.click();
                    populateGenderTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
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

    genderTableBody.on('click', '.updateBtn', function () {
        const genderCode = $(this).data('gender-code');
        const genderDesc = $(this).data('gender-desc');
        openGenderModal('Update Gender', 'Update', 'btn-warning', genderCode,genderDesc);
    });

    genderTableBody.on('click', '.deleteBtn', function () {
        const genId = $(this).data('gender-code');
        deleteGender(genId);
    });
    function deleteGender(genId) {

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
                productListApi.deleteGender(genId)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        populateGenderTable()
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Gender delete Unsuccessful', error);
                    });
            }
        });

    }

});
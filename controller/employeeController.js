import {EmployeeApi} from "../api/employeeApi.js";
$(document).ready(function () {
    let employeeForm = $('#employeeForm');
    let employeeFormHeading = $('#employeeFormHeading');
    let employeeCode = $('#employeeCode');
    let employeeName = $('#employeeName');
    let empPic = $('#emp-pic');
    let empGender = $('#emp-gender');
    let status = $('#status');
    let designation = $('#designation');
    let accessRole = $('#accessRole');
    let empDob = $('#emp-Dob');
    let empJoinDate = $('#emp-JoinDate');
    let attachedBranch = $('#attachedBranch');
    let empAddress1 = $('#empAddress1');
    let empAddress2 = $('#empAddress2');
    let empAddress3 = $('#empAddress3');
    let empAddress4 = $('#empAddress4');
    let empPostalCode = $('#empPostalCode');
    let empContact = $('#empContact');
    let empEmail = $('#empEmail');
    let emergencyContactPerson = $('#emergencyContactPerson');
    let emergencyContact = $('#emergencyContact');
    let empSaveUpdateButton = $('#empSaveUpdateButton');
    let empClear = $('#empClear');
    let empReset = $('#empReset');
    let empBrowseBtn = $('#emp-browse-btn');
    let fileInput = $('#emp-file-input');
    let empImagePreview = $('#emp-image-preview');
    let updateBtn = $('#update-icon');

    let employeeApi = new EmployeeApi();

    let file = null;

    let employeeBase64Update = null;

    let employeeCodeUpdate = null;

    function openEmployeeModal(headingText, buttonText, buttonClass) {
        employeeGender.prop('disabled', false);
        employeeFormHeading.text(headingText);
        empSaveUpdateButton.text(buttonText);
        empSaveUpdateButton.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    function updateImagePreview(imgPath) {
        empImagePreview.attr('src', imgPath);
    }

    function populateComboBox(comboBoxId, data, valueField, textField, defaultOption) {
        let comboBox = document.getElementById(comboBoxId);
        comboBox.innerHTML = `<option value="">${defaultOption}</option>`;

        data.forEach(item => {
            let option = document.createElement('option');
            option.value = item[valueField];
            option.text = item[textField];
            comboBox.add(option);
        });
    }

    function populateGendersComboBox() {
        employeeListApi.getAllGenders()
            .then(response => {
                populateComboBox('emp-gender', response, 'genderCode', 'genderDesc', 'Select Gender');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateAccessRolesComboBox() {
        employeeListApi.getAllAccessRoles()
            .then(response => {
                populateComboBox('accessRole', response, 'accessRoleCode', 'accessRoleDesc', 'Select Access Role');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateBranchesComboBox() {
        employeeListApi.getAllBranches()
            .then(response => {
                populateComboBox('attachedBranch', response, 'branchCode', 'branchDesc', 'Select Branch');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    $('#empAddBtn').on('click', function () {
        openEmployeeModal('Add New Employee', 'Save', 'btn-success');
        employeeForm[0].reset();
        updateImagePreview('img/previewImg.jpg');
        populateGendersComboBox();
        populateAccessRolesComboBox();
        populateBranchesComboBox();
    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    empBrowseBtn.on('click', function () {
        fileInput.click();
    });

    fileInput.on('change', function () {
        file = this.files[0];
        if (file) {
            const filePath = URL.createObjectURL(file);
            empPic.val(filePath);
            updateImagePreview(filePath);
        }
    });

    empClear.on('click', function () {
        employeeForm[0].reset();
        updateImagePreview('img/previewImg.jpg');
    });

    function handleUpdateAndSave() {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            const employeeBase64 = reader.result;
            const employee = createEmployeeModel(employeeBase64);

            employeeApi.updateEmployee(employee, employeeCodeUpdate)
                .then(response => {
                    Swal.fire('Updated!', response, 'success');
                    empClear.click();
                    fetchAllEmployees();
                })
                .catch(error =>{
                    console.log(error);
                    showError('Update Unsuccessful', error);
                });
        };
    }

    empSaveUpdateButton.on('click', function () {
        if (empSaveUpdateButton.hasClass('btn-success')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                const employeeBase64 = reader.result;
                const employee = createEmployeeModel(employeeBase64);

                employeeApi.saveEmployee(employee)
                    .then(response => {
                        Swal.fire('Saved!', response, 'uccess');
                        empClear.click();
                        fetchAllEmployees();
                    })
                    .catch(error => {
                        console.log(error);
                        showError('Save Unsuccessful', error);
                    });
            };
        } else {
            handleUpdateAndSave();
        }
    });

    function createEmployeeModel(employeeBase64) {
        return {
            employeeCode: employeeCode.val(),
            employeeName: employeeName.val(),
            picture: employeeBase64,
            gender: empGender.val(),
            status: status.val(),
            designation: designation.val(),
            accessRole: accessRole.val(),
            dateOfBirth: empDob.val(),
            joinDate: empJoinDate.val(),
            attachedBranch: attachedBranch.val(),
            addressLine1: empAddress1.val(),
            addressLine2: empAddress2.val(),
            addressLine3: empAddress3.val(),
            addressLine4: empAddress4.val(),
            postalCode: empPostalCode.val(),
            contact: empContact.val(),
            email: empEmail.val(),
            emergencyContactPerson: emergencyContactPerson.val(),
            emergencyContact: emergencyContact.val()
        };
    }

    function fetchAllEmployees() {
        employeeApi.getAllEmployees()
            .then(response => {
                if (Array.isArray(response)) {
                    const employeeTableBody = $('#emp-table-body');
                    employeeTableBody.empty();
                    console.log(response);
                    response.forEach(employee => {
                        const row = `
                        <tr>
                            <td class="row">${employee.employeeCode}</td>
                            <td>${(employee.employeeName == null) ? 'Note Yet Updated' : employee.employeeName}</td>
                            <td><img src="${(employee.picture == null) ? 'img/previewImg.jpg' : employee.picture}" alt="Employee Image" class="img-fluid" style="max-height: 50px;"></td>
                            <td>${(employee.gender == null) ? 'Note Yet Updated' : employee.gender}</td>
                            <td>${employee.status}</td>
                            <td>${(employee.designation == null) ? 'Note Yet Updated' : employee.designation}</td>
                            <td>${employee.userEntity.role}</td>
                            <td>${(employee.dateOfBirth == null) ? 'Note Yet Updated' : employee.dateOfBirth}</td>
                            <td>${employee.dateOfJoin}</td>
                            <td>${employee.branch.branchName}</td>
                            <td>
                                ${(employee.addressLine1 == null ||
                                employee.addressLine2 == null ||
                                employee.addressLine3 == null ||
                                employee.addressLine4 == null)
                                ? 'Not Yet Updated'
                                : `${employee.addressLine1}, ${employee.addressLine2}, ${employee.addressLine3}, ${employee.addressLine4}`
                                }
                            </td>
                            <td>${(employee.postalCode == null) ? 'Not Yet Updated' : employee.postalCode}</td>
                            <td>${(employee.contact == null) ? 'Not Yet Updated' : employee.contact}</td>
                            <td>${employee.email}</td>
                            <td>${(employee.emergencyContactPerson == null) ? 'Not Yet Updated' : employee.emergencyContactPerson}</td>
                            <td>${(employee.emergencyContact == null) ? 'Not Yet Updated' : employee.emergencyContact}</td>
                            <td>
                                <button class="btn btn-warning" onclick="updateEmployee('${employee.employeeCode}')">Update</button>
                            </td>
                        </tr>
                    `;
                        employeeTableBody.append(row);
                    });
                } else {
                    console.log('Response is not an array:', response);
                }
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }
    fetchAllEmployees();

    function updateEmployee(employeeCode) {
        employeeCodeUpdate = employeeCode;
        openEmployeeModal('Update Employee', 'Update', 'btn-warning');
        employeeListApi.getEmployee(employeeCode)
            .then(response => {
                employeeCode.val(response.employeeCode);
                employeeName.val(response.employeeName);
                empPic.val(response.picture);
                updateImagePreview(response.picture);
                empGender.val(response.gender);
                status.val(response.status);
                designation.val(response.designation);
                accessRole.val(response.accessRole);
                empDob.val(response.dateOfBirth);
                empJoinDate.val(response.joinDate);
                attachedBranch.val(response.attachedBranch);
                empAddress1.val(response.addressLine1);
                empAddress2.val(response.addressLine2);
                empAddress3.val(response.addressLine3);
                empAddress4.val(response.addressLine4);
                empPostalCode.val(response.postalCode);
                empContact.val(response.contact);
                empEmail.val(response.email);
                emergencyContactPerson.val(response.emergencyContactPerson);
                emergencyContact.val(response.emergencyContact);
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }
});

import { BranchApi } from "../api/branchApi.js";
import { BranchModel } from "../model/branchModel.js";

let branchName = $('#branch-name');
let productCode = $('#product-code');
let saveBranch = $('#save-branch');

let branchApi = new BranchApi();

saveBranch.on('click', (event) => {
    event.preventDefault();

    let branchNameValue = branchName.val();
    let productCodeValue = productCode.val();

    let branchModel = new BranchModel(
        branchNameValue,
        productCodeValue
    )

    branchApi.save(branchModel)
        .then((responseText) => {
            Swal.fire({
                icon: 'success',
                title: 'Branch Add Successful!',
                text: 'Welcome back to HelloShoeShop!',
                footer: '<a href="">Proceed to SignUp</a>',
                showConfirmButton: false,
                timer: 3000,
            });
            branchName.val('');
            productCode.val('');
        })
        .catch((error) => {
            showError('Save Unsuccessful', error.message);
        });

});

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

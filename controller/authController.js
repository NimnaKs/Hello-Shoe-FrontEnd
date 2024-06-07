import {SignInModel} from "../model/signInModel.js";
import {AuthApi} from "../api/authApi.js";
import {SignUpModel} from "../model/signUpModel.js";
import {BranchApi} from "../api/branchApi.js";

const email = $('#signIn-email');
const password = $('#signIn-password');
const signInBtn = $('#signInBtn');
const signUpForm = $('#signUpForm');
const signUpEmail = $('#signUp-email');
const signUpPassword = $('#signUp-password');
const signUpRole = $('#signUp-role');
const branch = $('#signup-branch');

const authApi = new AuthApi();
const branchApi = new BranchApi();
let globalToken = null;

function populateBranchComboBox() {
    branchApi.getAllBranch()
        .then((responseText) => {
            console.log(responseText);
            responseText.forEach((branch) => {
                $('#signup-branch').append(
                    `<option value="${branch.branchId}">${branch.branchName}</option>`
                );
            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}

populateBranchComboBox();

signInBtn.on('click', (event) => {
    event.preventDefault();
    const signInModel = new SignInModel(email.val(), password.val());

    authApi.signIn(signInModel)
        .then(response => {
            globalToken = response.token;
            console.log(globalToken);
            localStorage.setItem('authToken', globalToken);
            localStorage.setItem('userEmail', email.val());
            localStorage.setItem('userPassword', password.val());

            Swal.fire({
                icon: 'success',
                title: 'Signed In Successfully!',
                text: 'Welcome back to HelloShoeShop!',
                footer: '<a href="helloShoeShopPoss.html">Proceed to Dashboard</a>',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                window.location.href = 'helloShoeShopPoss.html';
            });
        })
        .catch(error => showError('Sign In Unsuccessful', error.message));
});


signUpForm.on('submit', (event) => {
    event.preventDefault();
    const user = new SignUpModel(
        signUpEmail.val(),
        signUpPassword.val(),
        signUpRole.val(),
        branch.val()
    );

    authApi.signUp(user)
        .then(response => {
            globalToken = response.token;
            console.log(globalToken);
            Swal.fire({
                icon: 'success',
                title: 'Signed Up Successfully!',
                text: 'Welcome to HelloShoeShop!',
                footer: '<a href="">Proceed to Dashboard</a>',
                showConfirmButton: false,
                timer: 3000,
            });
            signUpForm[0].reset();
        })
        .catch(error => showError('Sign Up Unsuccessful', error.message));
});

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

import {SignInModel} from "../model/signInModel.js";
import {AuthApi} from "../api/authApi.js";

const email = $('#signIn-email');
const password = $('#signIn-password');
const signInBtn = $('#signInBtn');

let authApi = new AuthApi();

let globalToken = null;

signInBtn.on('click',(event)=>{

    event.preventDefault();

    let emailValue = email.val();
    let passwordValue = password.val();

    let signInModel = new SignInModel(
        emailValue,
        passwordValue
    );

    authApi.signIn(signInModel)
        .then((responseText) => {
            globalToken = responseText.token;
            console.log(globalToken);
            Swal.fire({
                icon: 'success',
                title: 'Signed In Successfully!',
                text: 'Welcome back to HelloShoeShop!',
                footer: '<a href="">Proceed to Dashboard</a>',
                showConfirmButton: false,
                timer: 3000,
            });
            email.val('');
            password.val('');
        })
        .catch((error) => {
            showError('SignIn UnSuccessful', error.message);
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
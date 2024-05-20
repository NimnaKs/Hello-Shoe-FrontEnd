import {SignInModel} from "../model/signInModel.js";

const email = $('signIn-email');
const password = $('signIn-password');
const signInBtn = $('signInBtn');

signInBtn.on('click',(event)=>{
    event.preventDefault();

    let email = email.val();
    let password = password.val();

    let signIn = new SignInModel(
        email,
        password
    );


});
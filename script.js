const container = document.getElementById('container');
const registerBtn = document.getElementById('signUpToggle');
const loginBtn = document.getElementById('signInToggle');
const branchSetUpBtn = document.getElementById('branchSetUpBtn');
const branchSetUpSection = document.getElementById('branch-setUp');
const backBtn = document.getElementById('backBtn');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

$(document).ready(function () {
    branchSetUpSection.style.display = 'none';
});

branchSetUpBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    container.style.display = 'none';
    branchSetUpSection.style.display = 'block';
});

backBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    container.style.display = 'block';
    branchSetUpSection.style.display = 'none';
})



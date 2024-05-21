const $container = $('#container');
const $registerBtn = $('#signUpToggle');
const $loginBtn = $('#signInToggle');
const $branchSetUpBtn = $('#branchSetUpBtn');
const $branchSetUpSection = $('#branch-setUp');
const $backBtn = $('#backBtn');

$registerBtn.on('click', () => {
    $container.addClass('active');
});

$loginBtn.on('click', () => {
    $container.removeClass('active');
});

$(document).ready(function () {
    $branchSetUpSection.hide();
});

$branchSetUpBtn.on('click', (event) => {
    event.preventDefault();
    $container.hide();
    $branchSetUpSection.show();
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('signUpToggle');
const loginBtn = document.getElementById('signInToggle');
const signInBtn = document.getElementById('signInButton');
const loginProcessBlock = document.getElementById('process');
const dashboardSideBar = document.getElementById('dashboard-sidebar');
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".sidebarBtn");

sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signInBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    loginProcessBlock.style.display = 'none';
    dashboardSideBar.style.display = 'none';
});

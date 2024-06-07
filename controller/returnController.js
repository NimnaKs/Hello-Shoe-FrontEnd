$('#returnForm').submit(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Enter your credentials',
        html:
            '<input type="text" id="username" class="swal2-input" placeholder="Username">' +
            '<input type="password" id="password" class="swal2-input" placeholder="Password">',
        preConfirm: () => {
            const username = Swal.getPopup().querySelector('#username').value;
            const password = Swal.getPopup().querySelector('#password').value;
            if (!username || !password) {
                showError(`Please enter username and password`);
            }
            if(!(username === localStorage.getItem("userEmail")) && !(password === localStorage.getItem("userPassword") )){
                showError(`Invalid username or password`);
            }
            return { username: username, password: password };
        }
    }).then((result) => {
        const credentials = result.value;

        let returnData = {
            returnDate: $('#returnDate').val(),
            stockOrderDetailsEntity: { stockOrderDetailsId: $('#stockOrderDetailsId').val() },
            qty: parseInt($('#return-qty').val()),
            reason: $('#reason').val()
        };

        Swal.fire('Successful', 'Return has been successfully submitted.', 'success');
        $('#returnForm')[0].reset();

        /*$.ajax({
            url: 'http://localhost:9090/api/v1/returns',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(returnData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            success: function (response) {
                Swal.fire('Successful', 'Return has been successfully submitted.', 'success');
                $('#returnForm')[0].reset();
            },
            error: function (xhr, status, error) {
                Swal.fire('Error', 'Return submission failed: ' + error, 'error');
            }
        });*/
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
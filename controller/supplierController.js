$(document).ready(function () {
    let countryCBox = $('#sup-country');

    countries.forEach(function(country) {
        let option = $('<option></option>').attr('value', country).text(country);
        countryCBox.append(option);
    });
});
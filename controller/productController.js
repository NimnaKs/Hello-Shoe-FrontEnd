import {ProductApi} from "../api/productApi.js";
import {ProductListApi} from "../api/productListApi.js";
import {ProductModel} from "../model/productModel.js";

$(document).ready(function () {

    let itemForm = $('#itemForm');
    let itemFormHeading = $('#itemFormHeading');
    let itemCode = $('#item-code');
    let itemDesc = $('#item-desc');
    let itemPic = $('#item-pic');
    let itemGender = $('#item-gender');
    let itemOccasion = $('#item-occasion');
    let itemVariety = $('#item-variety');
    let itemSaveUpdateBtn = $('#item-save-update-btn');
    let itemClear = $('#itemClear');
    let itemReset = $('#itemReset');
    let itemImagePreview = $('#item-image-preview');
    let fileInput = $('#file-input');
    let itemAddBtn = $('#itemAddBtn');
    let browseBtn = $('#browse-btn');

    let productApi = new ProductApi();
    let productListApi = new ProductListApi();

    let file = null;

    function openItemModal(headingText, buttonText, buttonClass) {
        itemFormHeading.text(headingText);
        itemSaveUpdateBtn.text(buttonText);
        itemSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    function updateImagePreview(imgPath) {
        itemImagePreview.attr('src', imgPath);
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

    function populateGenderComboBox() {
        productListApi.getAllGenders()
            .then(response => {
                populateComboBox('item-gender', response, 'genderCode', 'genderDesc', 'Select Gender');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateOccasionComboBox() {
        productListApi.getAllOccasions()
            .then(response => {
                populateComboBox('item-occasion', response, 'occasionCode', 'occasionDesc', 'Select Occasion');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateVarietyComboBox() {
        productListApi.getAllVarieties()
            .then(response => {
                populateComboBox('item-variety', response, 'varietyCode', 'varietyDesc', 'Select Variety');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    itemAddBtn.on('click', function () {
        openItemModal('Add New Item', 'Save', 'btn-success');
        itemForm[0].reset();
        updateImagePreview('img/previewImg.jpg');
        populateGenderComboBox();
        populateOccasionComboBox();
        populateVarietyComboBox();
    });
    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    browseBtn.on('click', function () {
        fileInput.click();
    });

    fileInput.on('change', function () {
        file = this.files[0];
        if (file) {
            const filePath = URL.createObjectURL(file);
            itemPic.val(filePath);
            updateImagePreview(filePath);
        }
    });

    itemClear.on('click', function () {
        itemForm[0].reset();
        updateImagePreview('img/previewImg.jpg');
    });

    itemSaveUpdateBtn.on('click', function (event) {

        event.preventDefault();

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            const itemBase64 = reader.result;
            console.log(itemBase64);
            let itemDetail= itemDesc.val();
            let itemImg = itemBase64;
            let itemGen = itemGender.val();
            let itemOsion = itemOccasion.val();
            let itemVar = itemVariety.val();


            const product = new ProductModel(
                null,
                itemDetail,
                itemImg,
                itemGen,
                itemOsion,
                itemVar
            );

            if (itemSaveUpdateBtn.text() === 'Save') {
                productApi.saveProduct(product)
                    .then(response => {
                        Swal.fire('Saved!', response, 'success');
                        itemClear.click();
                        /*fetchAllProducts();*/
                    })
                    .catch(error => {
                        showError('Save Unsuccessful', error);
                    });
            } else {
                /*productListApi.updateProduct(product, itemCode.val())
                    .then(response => {
                        Swal.fire('Updated!', response, 'success');
                        itemClear.click();
                        fetchAllProducts();
                    })
                    .catch(error => {
                        showError('Update Unsuccessful', error);
                    });*/
            }
        };

    });

    function fetchAllProducts() {
        productApi.getAllProducts()
            .then(response => {
                let products = response;
                $('#item-cards-container').empty();

                products.forEach(product => {

                    let card = `
                        <div class="col-md-4 mb-4">
                            <div class="product-card">
                                <div class="product-tumb">
                                    <img src=${product.pic} alt="Product Image" id="img-product">
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">Category: ${product.varietyEntity.varietyDesc}</span>
                                    <h4><a href="#">${product.itemDesc}</a></h4>
                                    <p><strong>Item Code:</strong> ${product.itemCode}</p>
                                    <p><strong>Gender:</strong> ${product.genderEntity.genderDesc}</p>
                                    <p><strong>Occasion:</strong> ${product.occasionEntity.occasionDesc}</p>
                                </div>
                            </div>
                        </div>
            `;
                    $('#item-cards-container').append(card);

                });
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                showError('Fetch Unsuccessful', error);
            });
    }



    /*function editItem(itemId) {
        productListApi.getProductById(itemId)
            .then(response => {
                let product = JSON.parse(response);
                openItemModal('Edit Item', 'Update', 'btn-warning');

                itemCode.val(product.itemCode);
                itemDesc.val(product.itemDesc);
                itemPic.val(product.itemPic);
                itemGender.val(product.itemGender);
                itemOccasion.val(product.itemOccasion);
                itemVariety.val(product.itemVariety);
                updateImagePreview(product.itemPic);

                populateGenderComboBox();
                populateOccasionComboBox();
                populateVarietyComboBox();
            })
            .catch(error => {
                showError('Fetch Unsuccessful', error);
            });
    }

    function deleteItem(itemId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                productListApi.deleteProduct(itemId)
                    .then(response => {
                        Swal.fire('Deleted!', response, 'success');
                        fetchAllProducts();
                    })
                    .catch(error => {
                        showError('Delete Unsuccessful', error);
                    });
            }
        });
    }*/

    fetchAllProducts();
});

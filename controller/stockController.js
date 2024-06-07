import { StockApi } from "../api/stockApi.js";
import { SupplierApi } from "../api/supplierApi.js";
import { ProductApi } from "../api/productApi.js";
import { ProductListApi } from "../api/productListApi.js";
import { StockModel } from "../model/stockModel.js";

$(document).ready(function () {
    let stockAddBtn = $('#stockAddBtn');
    let heading = $('#stockFormHeading');
    let stockForm = $('#stockForm');
    let stockClear = $('#stockClear');

    let stockId = $('#stock-id');
    let supplyDate = $('#supply-date');
    let supplierId = $('#supply-Id');
    let supplierName = $('#supplier-name');
    let itemId = $('#item-Id');
    let itemDetails = $('#item-details');
    let sizeId = $('#size-Id-Cb');
    let sizeDetails = $('#size-details');
    let quantity = $('#qty');
    let unitBuyingPrice = $('#unitBuyingPrice');
    let unitSellingPrice = $('#unitSellingPrice');
    let profit = $('#profit');
    let profitMargin = $('#profitMargin');

    let stockSaveUpdateBtn = $('#stock-save-update-btn');

    let tableBody = $('#stock-table-body');

    let search = $('#searchInput');

    let stockApi = new StockApi();
    let supplierApi = new SupplierApi();
    let productApi = new ProductApi();
    let productListApi = new ProductListApi();

    populateStockTable();

    function generateStockId() {
        stockApi.generateStockId()
            .then(stId => {
                stockId.val(stId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating stock ID');
            });
    }

    function populateSupplierComboBox() {
        supplierApi.getAllSuppliers()
            .then((responseText) => {
                supplierId.empty().append('<option value="">Select Supplier</option>');
                responseText.forEach((supplier) => {
                    supplierId.append(
                        `<option value="${supplier.supplierName}">${supplier.supplierCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateItemComboBox() {
        productApi.getAllProducts()
            .then((responseText) => {
                itemId.empty().append('<option value="">Select Product</option>');
                responseText.forEach((product) => {
                    itemId.append(
                        `<option value="${product.itemDesc}">${product.itemCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateSizeComboBox() {
        productListApi.getAllSizes()
            .then((responseText) => {
                sizeId.empty().append('<option value="">Select Size</option>');
                responseText.forEach((size) => {
                    sizeId.append(
                        `<option value="${size.sizeDesc}">${size.sizeCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function setOtherProps() {
        supplyDate.val(new Date().toISOString().slice(0, 10));
        populateSupplierComboBox();
        populateItemComboBox();
        populateSizeComboBox();
    }

    stockAddBtn.on('click', function () {
        stockForm[0].reset();
        generateStockId();
        setOtherProps();
        openStockModal('Add New Stock', 'Save', 'btn-success');
    });

    stockClear.on('click', function () {
        stockForm[0].reset();
    });

    supplierId.on('change', function () {
        supplierName.val(supplierId.val());
    });

    itemId.on('change', function () {
        itemDetails.val(itemId.val());
    });

    sizeId.on('change', function () {
        sizeDetails.val(sizeId.val());
    });

    unitBuyingPrice.on('input', calculateProfitAndMargin);

    unitSellingPrice.on('input', calculateProfitAndMargin);

    function calculateProfitAndMargin() {
        let buyingPrice = parseFloat(unitBuyingPrice.val()) || 0;
        let sellingPrice = parseFloat(unitSellingPrice.val()) || 0;
        let calculatedProfit = sellingPrice - buyingPrice;
        let calculatedProfitMargin = (buyingPrice > 0) ? (calculatedProfit / buyingPrice) * 100 : 0;

        profit.val(calculatedProfit.toFixed(2));
        profitMargin.val(calculatedProfitMargin.toFixed(2));
    }

    stockSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let stockIdVal = stockId.val();
        let supplierIdVal = supplierId.find('option:selected').text();
        let itemIdVal = itemId.find('option:selected').text();
        let sizeIdVal = sizeId.find('option:selected').text();
        let quantityVal = quantity.val();
        let unitBuyingPriceVal = unitBuyingPrice.val();
        let unitSellingPriceVal = unitSellingPrice.val();

        let stockModel = new StockModel(
            supplierIdVal,
            itemIdVal,
            sizeIdVal,
            quantityVal,
            unitBuyingPriceVal,
            unitSellingPriceVal,
        );

        console.log(stockModel);

        if (stockSaveUpdateBtn.text() === 'Save') {
            stockApi.saveStock(stockModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    stockClear.click();
                    populateStockTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        } else {
            stockApi.updateStock(stockModel, stockIdVal)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    stockClear.click();
                    populateStockTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Update Unsuccessful', error);
                });
        }

    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    function populateStockTable() {
        stockApi.getAllStocks()
            .then((responseText) => {
                let stock_db = responseText;
                console.log(responseText)
                tableBody.empty();
                stock_db.forEach((stock) => {
                    let buyingPrice = parseFloat(stock.unitBuyingPrice) || 0;
                    let sellingPrice = parseFloat(stock.unitSellingPrice) || 0;
                    let calculatedProfit = sellingPrice - buyingPrice;
                    let calculatedProfitMargin = (buyingPrice > 0) ? (calculatedProfit / buyingPrice) * 100 : 0;
                    tableBody.append(
                        `<tr>
                        <th scope="row">${stock.stockId}</th>
                        <td>${new Date(stock.supplierOrderDate).toISOString().slice(0, 10)}</td>
                        <td>${stock.supplierEntity.supplierCode}</td>
                        <td>${stock.supplierEntity.supplierName}</td>
                        <td>${stock.itemEntity.itemCode}</td>
                        <td>${stock.itemEntity.itemDesc}</td>
                        <td>${stock.sizeEntity.sizeCode}</td>
                        <td>${stock.sizeEntity.sizeDesc}</td>
                        <td>${stock.qty}</td>
                        <td>${stock.unitBuyingPrice}</td>
                        <td>${stock.unitSellingPrice}</td>
                        <td>${calculatedProfit.toFixed(2)}</td>
                        <td>${calculatedProfitMargin.toFixed(2)}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#stockModal"
                                data-stock-id="${stock.stockId}" 
                                data-supplier-order-date="${new Date(stock.supplierOrderDate).toISOString().slice(0, 10)}"
                                data-supplier-code="${stock.supplierEntity.supplierCode}" 
                                data-supplier-name="${stock.supplierEntity.supplierName}"
                                data-item-code="${stock.itemEntity.itemCode}" 
                                data-item-desc="${stock.itemEntity.itemDesc}" 
                                data-size-code="${stock.sizeEntity.sizeCode}" 
                                data-size-desc="${stock.sizeEntity.itemDesc}" 
                                data-qty="${stock.qty}"
                                data-unit-buying-price="${stock.unitBuyingPrice}" data-unit-selling-price="${stock.unitSellingPrice}"
                                data-profit="${calculatedProfit.toFixed(2)}" data-profit-margin="${calculatedProfitMargin.toFixed(2)}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-stock-id="${stock.stockId}">
                                Delete
                            </button>
                        </td>
                    </tr>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function setComboBoxValue(comboBox, value) {
        if (comboBox.find(`option[value="${value}"]`).length === 0) {
            comboBox.append(`<option value="${value}" class="temp-option">${value}</option>`);
        }
    }

    tableBody.on('click', '.updateBtn', function () {

        stockId.val($(this).data('stock-id'));
        supplyDate.val($(this).data('supplier-order-date'));
        quantity.val($(this).data('qty'));
        unitBuyingPrice.val($(this).data('unit-buying-price'));
        unitSellingPrice.val($(this).data('unit-selling-price'));
        setComboBoxValue(supplierId,$(this).data('supplier-code'));
        supplierId.change();
        setComboBoxValue(itemId,$(this).data('item-code'));
        itemId.change();
        setComboBoxValue(sizeId,$(this).data('size-code'));
        sizeId.change();
        profit.val($(this).data('profit'));
        profitMargin.val($(this).data('profit-margin'));

        openStockModal('Update Stock', 'Update', 'btn-warning', stockId);
    });

    tableBody.on('click', '.deleteBtn', function () {
        const stockId = $(this).data('stock-id');
        deleteStock(stockId);
    });

    function deleteStock(stockId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                stockApi.deleteStock(stockId)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        populateStockTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Delete Unsuccessful', error);
                    });
            }
        });
    }

    function openStockModal(headingText, buttonText, buttonClass, stockId) {

        heading.text(headingText);
        stockSaveUpdateBtn.text(buttonText);
        stockSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#stock-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

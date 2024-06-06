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

    /*populateStockTable();*/

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
        openStockModal('Add New Stock', 'Save', 'btn-success');
        stockForm[0].reset();
        generateStockId();
        setOtherProps();
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

   /* stockSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let stockIdVal = stockId.val();
        let supplyDateVal = supplyDate.val();
        let supplierIdVal = supplierId.val();
        let supplierNameVal = supplierName.val();
        let itemIdVal = itemId.val();
        let itemDetailsVal = itemDetails.val();
        let sizeIdVal = sizeId.val();
        let sizeDetailsVal = sizeDetails.val();
        let quantityVal = quantity.val();
        let unitBuyingPriceVal = unitBuyingPrice.val();
        let unitSellingPriceVal = unitSellingPrice.val();
        let profitVal = profit.val();
        let profitMarginVal = profitMargin.val();

        let stockModel = new StockModel(
            null,
            supplyDateVal,
            supplierIdVal,
            supplierNameVal,
            itemIdVal,
            quantityVal,
            unitBuyingPriceVal,
            unitSellingPriceVal,
            profitVal,
            profitMarginVal
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

    });*/

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    /*function populateStockTable() {
        stockApi.getAllStocks()
            .then((responseText) => {
                let stock_db = responseText;
                tableBody.empty();
                stock_db.forEach((stock) => {
                    tableBody.append(
                        `<tr>
                        <th scope="row">${stock.stockId}</th>
                        <td>${stock.supplyDate}</td>
                        <td>${stock.supplierId}</td>
                        <td>${stock.supplierName}</td>
                        <td>${stock.itemId}</td>
                        <td>${stock.quantity}</td>
                        <td>${stock.unitBuyingPrice}</td>
                        <td>${stock.unitSellingPrice}</td>
                        <td>${stock.profit}</td>
                        <td>${stock.profitMargin}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#stockModal"
                                data-stock-id="${stock.stockId}">
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

    tableBody.on('click', '.updateBtn', function () {
        const stockId = $(this).data('stock-id');
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
    }*/

    function openStockModal(headingText, buttonText, buttonClass, stockId) {
        if (stockId) {
            stockApi.getStock(stockId)
                .then((responseText) => {
                    let stock = responseText;
                    stockId.val(stock.stockId);
                    supplyDate.val(stock.supplyDate);
                    supplierId.val(stock.supplierId);
                    supplierName.val(stock.supplierName);
                    itemId.val(stock.itemId);
                    quantity.val(stock.quantity);
                    unitBuyingPrice.val(stock.unitBuyingPrice);
                    unitSellingPrice.val(stock.unitSellingPrice);
                    profit.val(stock.profit);
                    profitMargin.val(stock.profitMargin);
                })
                .catch((error) => {
                    console.log(error);
                    showError('Fetch Unsuccessful', error);
                });
        }

        heading.text(headingText);
        stockSaveUpdateBtn.text(buttonText);
        stockSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    /*search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#stock-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });*/
});

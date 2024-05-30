const items = [
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },
    {
        itemCode: "MFS0001",
        itemDesc: "Nike Shoe",
        pic: "path/to/pic1.jpg",
        genderCode: "Male",
        occasionCode: "Formal",
        varietyCode: "Shoes"
    },

    // Add more item objects as needed
];

$(document).ready(function () {
    const container = $('#item-cards-container');

    items.forEach(item => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="product-card">
                    <div class="product-tumb">
                        <img src="https://i.imgur.com/xdbHo4E.png" alt="${item.itemDesc}">
                    </div>
                    <div class="product-details">
                        <span class="product-catagory">Category: ${item.varietyCode}</span>
                        <h4><a href="#">${item.itemDesc}</a></h4>
                        <p><strong>Item Code:</strong> ${item.itemCode}</p>
                        <p><strong>Gender:</strong> ${item.genderCode}</p>
                        <p><strong>Occasion:</strong> ${item.occasionCode}</p>
                    </div>
                </div>
            </div>
        `;
        container.append(card);
    });
});

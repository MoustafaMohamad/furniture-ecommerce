var addDisplayIndex = 0;
var products = [];
var ProductIdCounter = 1;
var deleteDisplayIndex = 0
var categories = [];



function validationName() {
    var regxname = /^[A-Za-z -]+$/gi;
    if (!(regxname.test(document.getElementById('productName').value))) {
        // document.getElementById('productName').focus();
        // document.getElementById('productName').select();
        document.getElementById('productName').style = "border: 1px solid red; outline: none;"

        document.getElementById("validname").textContent = "Invalid name"
        document.getElementById("validname").style = "color:red"

    }
    else {
        document.getElementById('productName').style = null
        document.getElementById("validname").textContent = ""
        document.getElementById("validname").style = null
    }
}

function validationCategory() {
    var regxCategory = /^[A-Za-z -]+$/gi;
    if (!(regxCategory.test(document.getElementById('categoryName').value))) {
        // document.getElementById('categoryName').focus();
        // document.getElementById('categoryName').select();
        document.getElementById('categoryName').style = "border: 1px solid red; outline: none;"

        document.getElementById("validCategory").textContent = "Invalid Category "
        document.getElementById("validCategory").style = "color:red; display: block;"

    }
    else {
        document.getElementById('categoryName').style = null
        document.getElementById("validCategory").textContent = ""
        document.getElementById("validCategory").style = null
    }
}

/********************************************************************************** */

function encodeImageFileAsURLCategory(){
    var filesSelected = document.getElementById("inputFileToLoadCategory").files;
    if (filesSelected.length > 0) { // User selected at least one image
      var fileToLoad = filesSelected[0]; // choose first image

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
         srcDataCategory = fileLoadedEvent.target.result; // <--- data: base64
      }
      
      fileReader.readAsDataURL(fileToLoad);
    }
 }

function addCategory() {

    var categoryName = document.getElementById('categoryName').value.trim();
    var categoryImage=srcDataCategory;
    if (/^[A-Za-z -]+$/gi.test(categoryName)) {
        var categoryExists = (categories.length == 0) ? false : categories.some(category => category.name === categoryName);

        if (!categoryExists) {

            var newCategory = {
                name: categoryName,
                image:categoryImage
            };

            categories.push(newCategory);
            localStorage.categoriesStorage = JSON.stringify(categories);

            document.getElementById('categoryName').value = '';
            document.getElementById('inputFileToLoadCategory').value='';
            updateCategoryTable();
            updateProductCategoryDropdown();

        }
    }
}

function updateProductCategoryDropdown() {
    var productCategoryDropdown = document.getElementById('productCategory');
    productCategoryDropdown.innerHTML = '';

    if (categories.length != 0) {
        categories = JSON.parse(localStorage.getItem('categoriesStorage'));
        categories.forEach(category => {
            var option = document.createElement('option');
            option.value = category.name;
            option.text = category.name;
            productCategoryDropdown.add(option);
        });
    }
}




function updateCategoryTable() {
    var categoryTableBody = document.getElementById('categoryTableBody');
    categoryTableBody.innerHTML = '';
    if (localStorage.categoriesStorage != null) { categories = JSON.parse(localStorage.getItem('categoriesStorage')); }
    if (localStorage.productsStorge != null) { products = JSON.parse(localStorage.getItem('productsStorge')); }

    if (categories.length != 0) {
        categories.forEach(category => {
            var numberOfProducts = (products.length == 0) ? 0 : products.filter(product => product.category === category.name).length;
            categoryTableBody.innerHTML += `
            <tr>
                <td>${category.name}</td>
                <td>${numberOfProducts}</td>
                <td><button onclick="editCategory('${category.name}')">Edit</button></td>
                <td><button onclick="deleteCategory('${category.name}')">Delete</button></td>
            </tr>`;
        });
    }
}


function getDataStored() {

    if (localStorage.getItem('productsStorge') != null) {
        products = JSON.parse(localStorage.getItem('productsStorge'));
        ProductIdCounter = 1 + parseInt((products.length == 0) ? 0 : products[products.length - 1].id);
        updateProductTable(0);
    }
}

function getCategoryStored() {

    if (localStorage.getItem('categoriesStorage') != null) {
        categories = JSON.parse(localStorage.getItem('categoriesStorage'));
        updateCategoryTable();
        updateProductCategoryDropdown();
    }
}




function deleteCategory(categoryName) {
    if (confirm("You will delet all product of this category ")) {
        var categoryIndex = categories.findIndex(category => category.name === categoryName);

        if (categoryIndex !== -1) {

            categories.splice(categoryIndex, 1);

            products = products.filter(product => product.category !== categoryName);

            localStorage.setItem('categoriesStorage', JSON.stringify(categories));
            localStorage.setItem('productsStorge', JSON.stringify(products));

            updateCategoryTable();
            updateProductCategoryDropdown();
            updateProductTable(0);
        }
    }
}

function findMatchingIndices(arr, condition) {
    let indices = [];

    arr.forEach((element, index) => {
        if (condition(element)) {
            indices.push(index);
        }
    });

    return indices;
}


function editCategory(categoryName) {

    categoryEditIndex = categories.findIndex(categorie => categorie.name === categoryName);
    var proEditIndex = findMatchingIndices(products, (pro) => pro.category === categoryName)
    console.log(proEditIndex)
    document.getElementById("categoryName").value = categories[categoryEditIndex].name;
    document.getElementById('buttoncategory').innerText = "Updat Category"

    document.getElementById('buttoncategory').onclick = function (event) {
        event.preventDefault();
        editCategorySubmit(categoryEditIndex, proEditIndex)
    };


}
function editCategorySubmit(categind, proEditArray) {
    
    categories[categind].name = document.getElementById("categoryName").value;
    for (let it = 0; it < proEditArray.length; it++) {
        products[it].category = document.getElementById("categoryName").value;
    }
    localStorage.categoriesStorage = JSON.stringify(categories);
    localStorage.productsStorge = JSON.stringify(products);

    document.getElementById("categoryName").value = "";
    document.getElementById('buttoncategory').innerText = 'Add Product';
    document.getElementById('categoryForm').onclick = addCategory;
    getCategoryStored();
    updateProductCategoryDropdown();
    getDataStored();
}

function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) { // User selected at least one image
      var fileToLoad = filesSelected[0]; // choose first image

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
         srcData = fileLoadedEvent.target.result; // <--- data: base64
      }
      
      fileReader.readAsDataURL(fileToLoad);
    }
 }


 
function addProduct() {
    
    if (document.getElementById('productDescription').value != "" ||
        document.getElementById('productCategory').value != "" ||
        document.getElementById('productName').value != "" ||
        parseFloat(document.getElementById('productPrice').value) != null ||
        parseInt(document.getElementById('productStock').value) != null) {
        ProductName = document.getElementById('productName').value;
        ProductCategory = document.getElementById('productCategory').value;
        ProductPrice = parseFloat(document.getElementById('productPrice').value);
        ProductDescription = document.getElementById('productDescription').value;
        ProductStock = parseInt(document.getElementById('productStock').value);
        ProductIdCounter = 1 + parseInt((products.length > 0) ? products[products.length - 1].id : 0);
        var newProduct = {
            id: ProductIdCounter,
            name: ProductName,
            image: srcData,
            category: ProductCategory,
            price: ProductPrice,
            description: ProductDescription,
            stock: ProductStock

        };

        products.push(newProduct);

        localStorage.productsStorge = JSON.stringify(products)
        ProductIdCounter++;
        document.getElementById('productName').value = "";
        document.getElementById('productCategory').value = "";
        document.getElementById('productPrice').value = "";
        document.getElementById('inputFileToLoad').value = "";
        document.getElementById('productDescription').value = "";
        document.getElementById('productStock').value = "";

        getDataStored()
        updateCategoryTable();

    }
}



function deleteProduct(productId) {
   var deleteindex = products.findIndex(product => product.id === productId);
    products.splice(deleteindex, 1);
    localStorage.productsStorge = JSON.stringify(products);
    updateProductTable(0);
    updateCategoryTable();
    
}


getCategoryStored();
updateProductCategoryDropdown();
getDataStored();



function updateProductTable(i) {
    tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""
    for (i; i < products.length; i++) {
        tableBody.innerHTML += `
                    <td>${i + 1}</td>
                    <td>${products[i].id}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].description}</td>
                    <td>${products[i].stock}</td>
                    <td><button onclick="editProduct(${products[i].id})">Edit</button></td>
                    <td><button onclick="deleteProduct(${products[i].id})">Delete</button></td>`;
    }
}


function editProduct(productId) {

    var editIndex = products.findIndex(product => product.id === parseInt(productId));

    var product = products[editIndex];

    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;

    document.getElementById('ButtonForm').innerText = "Update Product"

    document.getElementById('ButtonForm').onclick = function (event) {
        event.preventDefault();
        editSubmit(editIndex)
    };
}



function editSubmit(index) {

    products[index].name = document.getElementById('productName').value;
    products[index].category = document.getElementById('productCategory').value;
    products[index].price = parseFloat(document.getElementById('productPrice').value);
    products[index].description = document.getElementById('productDescription').value;
    products[index].stock = parseInt(document.getElementById('productStock').value);


    localStorage.productsStorge = JSON.stringify(products);

    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productStock').value = '';


    document.getElementById('ButtonForm').innerText = 'Add Product';
    document.getElementById('ButtonForm').onclick = addProduct;


    updateProductTable(0);
}

var userRequests = [];
var acceptedRequests=[];
var refusedRequests=[];



// Function to get user request data from local storage
function getUserRequests() {
    if (localStorage.getItem('requestproducts') !== null) {
        userRequests = JSON.parse(localStorage.getItem('requestproducts'));
    }
   
}
function getAcceptedRequests() {
    if (localStorage.getItem('acceptedRequests') !== null) {
        acceptedRequests = JSON.parse(localStorage.getItem('acceptedRequests'));
    }
   
}





function displayUserRequests() {
    var requestsTableBody = document.getElementById('requestsTableBody');
    requestsTableBody.innerHTML = '';

    userRequests.forEach(request => {
        requestsTableBody.innerHTML += `
            <tr>
                <td>${request.userid}</td>
                <td>${request.usergmail}</td>
                <td>${request.productid}</td>
                <td>${request.productname}</td>
                <td>${request.Productprice}</td>
                <td>${request.agree}</td>
                <td><button onclick="acceptRequest(${request.userid})">Accept</button></td>
                <td><button onclick="refuseRequest(${request.userid})">Refuse</button></td>
            </tr>`;
    });
}



function displayPreviousRequests() {
    var previousTableBody = document.getElementById('PreviousTableBody');
    previousTableBody.innerHTML = '';

    acceptedRequests.forEach(previous => {
        previousTableBody.innerHTML += `
            <tr>
                <td>${previous.userid}</td>
                <td>${previous.usergmail}</td>
                <td>${previous.productid}</td>
                <td>${previous.productname}</td>
                <td>${previous.Productprice}</td>
            </tr>`;
    });
}







// Function to accepting a user request
function acceptRequest(requestId) {
    var index = userRequests.findIndex(request => request.userid === requestId);
    var proid=userRequests[index].productid;
    products = JSON.parse(localStorage.getItem('productsStorge'));
    var proindex=products.findIndex(pro=> parseInt(pro.id)==parseInt(proid))


    if (index !== -1 ) {

        userRequests[index].agree = true;

        products[proindex].stock-=1;
        localStorage.productsStorge = JSON.stringify(products)
        acceptedRequests.push(userRequests[index]);
        localStorage.setItem('acceptedRequests', JSON.stringify(acceptedRequests));
        userRequests.splice(index, 1);
        localStorage.setItem('requestproducts', JSON.stringify(userRequests));
         if(products[proindex].stock===0){
             deleteProduct(proid)
        }
        displayUserRequests();
        displayPreviousRequests();
        getDataStored();
    }
}

// Function to refusing a user request
function refuseRequest(requestId) {
    var index = userRequests.findIndex(request => request.userid === requestId);

    if (index !== -1) {
        userRequests[index].agree = false;
        refusedRequests.push(userRequests[index]);
        localStorage.setItem('refusedRequests', JSON.stringify(refusedRequests));
        userRequests.splice(index, 1);
        localStorage.setItem('requestproducts', JSON.stringify(userRequests));
        displayUserRequests();
    }
}



getUserRequests();
getAcceptedRequests();
displayUserRequests();
displayPreviousRequests();











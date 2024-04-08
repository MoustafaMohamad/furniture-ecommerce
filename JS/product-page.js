var imageSrc =document.getElementById("imageSrc");
var productCatogray =document.getElementById("productCatogray");
var productName=document.getElementById("productName");
var productDescription=document.getElementById("productDescription");
var productPrice =document.getElementById("productPrice");

var productNumber=parseInt(localStorage.getItem("ProductNow")-1) ;
var products=JSON.parse(localStorage.productsStorge);

productName.innerText=products[productNumber].name;
imageSrc.src=products[productNumber].image;
productDescription.innerText=products[productNumber].description;//
productPrice.innerText=products[productNumber].price;


var allUserss = JSON.parse(localStorage.getItem("users"));


if (localStorage.productsStorge != null) {
    productsParsed = JSON.parse(localStorage.getItem("productsStorge"));
} else {
    productsParsed = [];
}

var cartBtn=document.getElementById("cartBtn");
cartBtn.onclick = function () {
    if (localStorage.userNow == null) {
        window.open("login_form.html", "_self");
    }
    else {
        var requestproducts;
        if (localStorage.requestproducts != null) {
            requestproducts = JSON.parse(localStorage.requestproducts);

        } else {
            requestproducts = [];
        }
        request = {
            userid: allUserss[localStorage.userNow].userid,
            usergmail: allUserss[localStorage.userNow].email,
            productid: productsParsed[productNumber].id,
            productname: productsParsed[productNumber].name,
            Productprice: productsParsed[productNumber].price,
            agree: "pending"

        }
        requestproducts.push(request);
        localStorage.setItem('requestproducts', JSON.stringify(requestproducts));

    }
    window.location.reload();
};


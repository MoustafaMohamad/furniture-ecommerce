// log out page 

document.getElementById("logoutbtn").onclick = function (event) {
    localStorage.userNow = null;
    window.open("login_form.html", "_self");
};


if (localStorage.userNow == "null") {
    document.getElementById("logoutbtn").innerText = "Login";
}


if (localStorage.userNow == 0) {
    document.getElementById("admin").hidden = false;
} else {
    document.getElementById("admin").hidden = true;
}


const allUsers = JSON.parse(localStorage.getItem("users"));


if (localStorage.productsStorge != null) {
    productsParsed = JSON.parse(localStorage.getItem("productsStorge"));
} else {
    productsParsed = [];
}

if (localStorage.categoriesStorage != null) {
    categoriesStorage = JSON.parse(localStorage.getItem("categoriesStorage"));
} else {
    categoriesStorage = [];
}

for (let index = 0; index < categoriesStorage.length; index++) {

    const itemcategories = document.createElement("div");
    itemcategories.style.width = "350px";
    itemcategories.style.height = "550px";
    itemcategories.style.borderRadius = "20px"
    itemcategories.style.backgroundColor = "#FFF3E3";

    document.getElementById("view-box").appendChild(itemcategories);

    const categoriesimage = document.createElement("img");
    categoriesimage.style.width = "350px";
    categoriesimage.style.height = "450px";
    categoriesimage.style.borderRadius = "20px 20px 0px 0px"
    categoriesimage.style.marginBottom = "25px"
    categoriesimage.src = categoriesStorage[index].image;

    itemcategories.appendChild(categoriesimage);

    const categoriesname = document.createElement("a");
    categoriesname.style.fontSize = "24px";
    categoriesname.style.fontWeight = "400";
    categoriesname.style.color = "#333333";
    categoriesname.style.textDecoration = "none";
    categoriesname.style.textAlign = "center";
    categoriesname.innerHTML = categoriesStorage[index].name;

    itemcategories.appendChild(categoriesname);


    categoriesimage.onclick = function () {
        localStorage.CategoryNow = categoriesStorage[index].name;
        window.open("Category.html", "_self");
    };

    categoriesname.onclick = function () {
        localStorage.CategoryNow = categoriesStorage[index].name;
        window.open("Category.html", "_self");
    };


    categoriesimage.onmousemove = (event) => {
        categoriesimage.style.opacity = "0.7";
    };

    categoriesname.onmousemove = (event) => {
        categoriesname.style.textDecoration = "underline";
        categoriesname.style.color = "#B88E2F";

    };

    categoriesimage.onmouseout = (event) => {
        categoriesimage.style.opacity = "1";
    };

    categoriesname.onmouseout = (event) => {
        categoriesname.style.textDecoration = "none";
        categoriesname.style.color = "#333333";

    };
}


function numberOfcart() {
    if (localStorage.requestproducts != null) {
        requestproducts = JSON.parse(localStorage.getItem("requestproducts"));
    } else {
        requestproducts = [];
    }
    if (localStorage.acceptedRequests != null) {
        acceptedRequests = JSON.parse(localStorage.getItem("acceptedRequests"));
    } else {
        acceptedRequests = [];
    }
    var num1 = (requestproducts.filter(product => product.userid == localStorage.userNow)).length;
    var num2 = (acceptedRequests.filter(product => product.userid == localStorage.userNow)).length;
    document.getElementById("card-namber").innerHTML = `  ${num1 + num2}  `;
}


numberOfcart();


function numberOffavorite() {
    if (localStorage.favoriteproducts != null) {
        favoriteproducts = JSON.parse(localStorage.getItem("favoriteproducts"));
    } else {
        favoriteproducts = [];
    }
    var num = (favoriteproducts.filter(product => product.userid == localStorage.userNow)).length;
    document.getElementById("favorite-namber").innerHTML = `  ${num}  `;
}


numberOffavorite();

for (let index = 0; index < productsParsed.length; index++) {



    // every product only

    const item = document.createElement("div");
    item.style.width = "280px";
    item.style.height = "522px";
    item.style.position = "relative";
    item.style.borderRadius = "20px"
    item.style.backgroundColor = "#F4F5F7";

    document.getElementById("Products-items").appendChild(item);


    const Productimage = document.createElement("img");
    Productimage.style.width = "280px";
    Productimage.style.height = "301px";
    Productimage.style.borderRadius = "20px 20px 0px 0px"
    Productimage.src = productsParsed[index].image;

    item.appendChild(Productimage);

    const Productname = document.createElement("p");
    Productname.style.fontSize = "24px";
    Productname.style.fontWeight = "600";
    Productname.style.color = "#3A3A3A";
    Productname.style.margin = "0px";
    Productname.style.marginLeft = "5px";
    Productname.innerHTML = productsParsed[index].name;

    item.appendChild(Productname);

    const Productdescription = document.createElement("p");
    Productdescription.style.fontSize = "16px";
    Productdescription.style.color = "#3A3A3A";
    Productdescription.style.margin = "0px";
    Productdescription.style.marginLeft = "5px";
    Productdescription.innerHTML = productsParsed[index].description;

    item.appendChild(Productdescription);

    const Productprice = document.createElement("p");
    Productprice.style.fontSize = "20px";
    Productprice.style.fontWeight = "600";
    Productprice.style.color = "#3A3A3A";
    Productprice.style.marginLeft = "5px";
    Productprice.innerHTML = productsParsed[index].price + " EGP";

    item.appendChild(Productprice);

    const ProductAddcart = document.createElement("button");
    ProductAddcart.innerHTML = "Add to cart";
    ProductAddcart.style.width = "185px";
    ProductAddcart.style.height = "48px";
    ProductAddcart.style.fontSize = "16px";
    ProductAddcart.style.fontWeight = "600";
    ProductAddcart.style.color = "#B88E2F";
    ProductAddcart.style.backgroundColor = "#FFFFFF";
    ProductAddcart.style.border = "0px";
    ProductAddcart.style.textAlign = "center";
    ProductAddcart.style.position = "absolute";
    ProductAddcart.style.left = "14%";
    ProductAddcart.style.top = "15%";
    ProductAddcart.style.borderRadius = "24px";


    const ProductShow = document.createElement("button");
    ProductShow.innerHTML = "Show";
    ProductShow.style.width = "80px";
    ProductShow.style.height = "48px";
    ProductShow.style.fontSize = "16px";
    ProductShow.style.fontWeight = "600";
    ProductShow.style.color = "#B88E2F";
    ProductShow.style.backgroundColor = "#FFFFFF";
    ProductShow.style.border = "0px";
    ProductShow.style.textAlign = "center";
    ProductShow.style.position = "absolute";
    ProductShow.style.left = "14%";
    ProductShow.style.top = "34%";
    ProductShow.style.borderRadius = "24px";


    const ProductAddfavorite = document.createElement("img");
    ProductAddfavorite.style.width = "40px";
    ProductAddfavorite.style.height = "40px";
    ProductAddfavorite.src = "images/Vector (1).svg";
    ProductAddfavorite.style.position = "absolute";
    ProductAddfavorite.style.left = "60%";
    ProductAddfavorite.style.top = "35%";



    item.onmousemove = (event) => {
        
        Productimage.style.opacity = "0.7";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };

    ProductAddcart.onmousemove = (event) => {
        
        Productimage.style.opacity = "0.7";
        ProductAddcart.style.color = "#ffffff";
        ProductAddcart.style.backgroundColor = "#B88E2F";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };

    ProductAddfavorite.onmousemove = (event) => {
        
        Productimage.style.opacity = "0.7";
        ProductAddfavorite.src = "images/red-heart-icon.svg";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };

    ProductShow.onmousemove = (event) => {
        
        Productimage.style.opacity = "0.7";
        ProductShow.style.color = "#ffffff";
        ProductShow.style.backgroundColor = "#B88E2F";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };


    item.onmouseout = (event) => {
        item.style.backgroundColor = "#F4F5F7";
        Productimage.style.opacity = "1";
        item.removeChild(ProductAddcart);
        item.removeChild(ProductAddfavorite);
        item.removeChild(ProductShow);
    };

    ProductAddcart.onmouseout = (event) => {
        
        Productimage.style.opacity = "0.7";
        ProductAddcart.style.color = "#B88E2F";
        ProductAddcart.style.backgroundColor = "#FFFFFF";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };

    ProductAddfavorite.onmouseout = (event) => {
       
        Productimage.style.opacity = "0.7";
        ProductAddfavorite.src = "images/Vector (1).svg";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };


    ProductShow.onmouseout = (event) => {
      
        Productimage.style.opacity = "0.7";
        ProductShow.style.color = "#B88E2F";
        ProductShow.style.backgroundColor = "#FFFFFF";
        item.appendChild(ProductAddcart);
        item.appendChild(ProductAddfavorite);
        item.appendChild(ProductShow);
    };



    // add product to customer owner


    ProductAddcart.onclick = function () {
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
                userid: allUsers[localStorage.userNow].userid,
                usergmail: allUsers[localStorage.userNow].email,
                productid: productsParsed[index].id,
                productname: productsParsed[index].name,
                Productprice: productsParsed[index].price,
                agree: "pending"

            }
            requestproducts.push(request);
            localStorage.setItem('requestproducts', JSON.stringify(requestproducts));

        }
        numberOfcart();
        numberOffavorite();
    };


    ProductAddfavorite.onclick = function () {
        if (localStorage.userNow == null) {
            window.open("login_form.html", "_self");
        }
        else {
            var favoriteproducts;
            if (localStorage.favoriteproducts != null) {
                favoriteproducts = JSON.parse(localStorage.favoriteproducts);

            } else {
                favoriteproducts = [];
            }
            favorite = {
                userid: allUsers[localStorage.userNow].userid,
                productid: productsParsed[index].id,
                productname: productsParsed[index].name,
                Productprice: productsParsed[index].price
            }
            if(!favoriteproducts.some((e) => (e.productid === productsParsed[index].id)&&(e.userid === allUsers[localStorage.userNow].userid))){
                favoriteproducts.push(favorite);
            }
            localStorage.setItem('favoriteproducts', JSON.stringify(favoriteproducts));

        }

        numberOfcart();
        numberOffavorite();
    };

    ProductShow.onclick = function () {
        localStorage.ProductNow = productsParsed[index].id;
        window.open("product-page.html", "_self");
    };
}















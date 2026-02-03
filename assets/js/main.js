document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('fixed-menu');
  menu.classList.toggle('active');
});

function addToCart(id, name, price, img) {
    var sizeGroupName = 'size-p' + id;
    
    var selectedInput = document.querySelector('input[name="' + sizeGroupName + '"]:checked');

    if (!selectedInput) {
        alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
        return; 
    }

    var label = document.querySelector('label[for="' + selectedInput.id + '"]');
    var size = label.innerText;

    var quantityInput = document.getElementById('product-quantity');
    var quantityToAdd = quantityInput ? parseInt(quantityInput.value) : 1;

    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    var existingProduct = cart.find(item => item.id == id && item.size == size);

    if (existingProduct) {
        existingProduct.quantity += quantityToAdd;
    } else {
        var newProduct = {
            id: id,
            name: name,
            price: price,
            image: img,
            size: size, 
            quantity: quantityToAdd
        };
        cart.push(newProduct);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    
    console.log("Đã thêm:", name, "- Size:", size);
    alert("Đã thêm: " + quantityToAdd + " sản phẩm " + name + " (Size: " + size + ")");
}

function buyNow (id, name, price, img) {
    var sizeGroupName = 'size-p' + id;
    
    var selectedInput = document.querySelector('input[name="' + sizeGroupName + '"]:checked');

    if (!selectedInput) {
        alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
        return; 
    }

    var label = document.querySelector('label[for="' + selectedInput.id + '"]');
    var size = label.innerText;

    var quantityInput = document.getElementById('product-quantity');
    var quantityToAdd = quantityInput ? parseInt(quantityInput.value) : 1;

    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    var existingProduct = cart.find(item => item.id == id && item.size == size);

    if (existingProduct) {
        existingProduct.quantity += quantityToAdd;
    } else {
        var newProduct = {
            id: id,
            name: name,
            price: price,
            image: img,
            size: size, 
            quantity: quantityToAdd
        };
        cart.push(newProduct);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    window.location.href = "cart.html";
}

function changeQty(step) {
    const qtyInput = document.getElementById('product-quantity');
    let currentQty = parseInt(qtyInput.value);
    
    currentQty += step;

    if (currentQty < 1) {
        currentQty = 1;
    }

    qtyInput.value = currentQty;
}

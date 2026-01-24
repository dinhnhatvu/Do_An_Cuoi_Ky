document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('fixed-menu');
  menu.classList.toggle('active');
});

function addToCart(id, name, price, img) {
    // --- BƯỚC 1: LẤY SIZE ---
    // Tạo tên nhóm size dựa trên id sản phẩm (ví dụ: size-p1)
    var sizeGroupName = 'size-p' + id;
    
    // Tìm thẻ input đang được chọn (checked)
    var selectedInput = document.querySelector('input[name="' + sizeGroupName + '"]:checked');

    // Nếu chưa chọn size thì báo lỗi và dừng lại ngay
    if (!selectedInput) {
        alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
        return; 
    }

    // Lấy text từ thẻ label tương ứng (Vì giá trị XS, S nằm trong label)
    var label = document.querySelector('label[for="' + selectedInput.id + '"]');
    var size = label.innerText; // Lấy chữ "XS", "M", v.v.

    // --- BƯỚC 2: XỬ LÝ GIỎ HÀNG ---
    // LẤY SỐ LƯỢNG TỪ Ô INPUT (QUAN TRỌNG)
    var quantityInput = document.getElementById('product-quantity');
    var quantityToAdd = quantityInput ? parseInt(quantityInput.value) : 1;

    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    // Kiểm tra sản phẩm đã có chưa. 
    // QUAN TRỌNG: Phải trùng cả ID và SIZE thì mới coi là trùng
    var existingProduct = cart.find(item => item.id == id && item.size == size);

    if (existingProduct) {
        // Nếu đã có áo đó + size đó -> Tăng số lượng
        existingProduct.quantity += quantityToAdd;
    } else {
        // Nếu chưa có -> Thêm mới với thông tin size
        var newProduct = {
            id: id,
            name: name,
            price: price,
            image: img,
            size: size, // Lưu thêm size vào đây
            quantity: quantityToAdd
        };
        cart.push(newProduct);
    }

    // --- BƯỚC 3: LƯU VÀ THÔNG BÁO ---
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
    // Lấy thẻ input
    const qtyInput = document.getElementById('product-quantity');
    // Chuyển giá trị hiện tại sang số
    let currentQty = parseInt(qtyInput.value);
    
    // Tính toán giá trị mới
    currentQty += step;

    // Đảm bảo số lượng không nhỏ hơn 1
    if (currentQty < 1) {
        currentQty = 1;
    }

    // Gán lại giá trị mới vào ô input
    qtyInput.value = currentQty;
}

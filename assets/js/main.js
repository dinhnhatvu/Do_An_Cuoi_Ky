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
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    // Kiểm tra sản phẩm đã có chưa. 
    // QUAN TRỌNG: Phải trùng cả ID và SIZE thì mới coi là trùng
    var existingProduct = cart.find(item => item.id == id && item.size == size);

    if (existingProduct) {
        // Nếu đã có áo đó + size đó -> Tăng số lượng
        existingProduct.quantity++;
    } else {
        // Nếu chưa có -> Thêm mới với thông tin size
        var newProduct = {
            id: id,
            name: name,
            price: price,
            image: img,
            size: size, // Lưu thêm size vào đây
            quantity: 1
        };
        cart.push(newProduct);
    }

    // --- BƯỚC 3: LƯU VÀ THÔNG BÁO ---
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    
    console.log("Đã thêm:", name, "- Size:", size);
    alert("Đã thêm: " + name + " (Size: " + size + ")");
}

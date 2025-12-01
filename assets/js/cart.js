// 1. Hàm hiển thị giỏ hàng
function renderCart() {
    // Lấy giỏ hàng từ LocalStorage (nếu chưa có thì là mảng rỗng)
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    // Xóa nội dung cũ
    container.innerHTML = '';

    let subtotal = 0;
    const shipping = 0; // Phí ship cố định ví dụ
    const tax = 0; // Thuế cố định ví dụ

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        subtotalEl.innerText = '$0';
        totalEl.innerText = '$0';
        return;
    }

    // Duyệt qua từng sản phẩm để tạo HTML
    cart.forEach((item, index) => {
        // Tính tổng tiền từng món
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Tạo HTML giống cấu trúc của bạn
        let html = `
        <div class="row cart-item mb-3">
            <div class="col-md-3">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-5">
                <h5 class="card-title">${item.name}</h5>
                <p class="text-muted">Size: ${item.size}</p>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
                    <input style="max-width:100px" type="text" class="form-control form-control-sm text-center quantity-input" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <p class="fw-bold">${item.price}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            </div>
        </div>
        <hr>
        `;
        container.innerHTML += html;
    });

    // Cập nhật tổng tiền hiển thị
    subtotalEl.innerText = subtotal;
    totalEl.innerText = (subtotal + shipping + tax).toFixed(2) + " vnđ";
}

// 2. Hàm cập nhật số lượng (Tăng/Giảm)
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        // Nếu số lượng giảm về 0 thì xóa luôn
        if (cart[index].quantity < 1) {
            cart.splice(index, 1);
        }
    }
    
    // Lưu lại và vẽ lại giao diện
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
}

// 3. Hàm xóa sản phẩm
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
}

// Chạy hàm render khi trang web tải xong
document.addEventListener('DOMContentLoaded', renderCart);
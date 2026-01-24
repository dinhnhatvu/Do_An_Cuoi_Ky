// 1. Hàm hiển thị giỏ hàng
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const container = document.getElementById("cart-items-container");
    const totalEl = document.getElementById("cart-total");

    container.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><p>Giỏ hàng trống.</p><a href="shop.html" class="button">Mua sắm ngay</a></div>';
        totalEl.innerText = "0₫";
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Định dạng tiền tệ
        let priceFormatted = item.price.toLocaleString('vi-VN');
        let totalFormatted = itemTotal.toLocaleString('vi-VN');

        let html = `
        <div class="row cart-item-row align-items-center text-center">
            <div class="col-md-6 d-flex align-items-start text-left" style="text-align: left;">
                <button class="btn-remove" onclick="removeItem(${index})">✕</button>
                
                <a href="details-1.html">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid mr-3" style="width: 90px;">
                </a>
                
                <div>
                    <div class="product-name"><a href="#" style="color: #000;">${item.name}</a></div>
                    <div class="product-desc">
                        Mã SP: SP-${item.id}<br>
                        Size: ${item.size}<br>
                        Nhóm: Fashion
                    </div>
                </div>
            </div>

            <div class="col-md-2 font-weight-bold">
                ${priceFormatted}₫
            </div>

            <div class="col-md-2">
                <div class="qty-box">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>

            <div class="col-md-2 font-weight-bold">
                ${totalFormatted}₫
            </div>
        </div>
        `;
        container.innerHTML += html;
    });

    totalEl.innerText = subtotal.toLocaleString('vi-VN') + "₫";
}

// 2. Hàm cập nhật số lượng (Tăng/Giảm)
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  if (cart[index]) {
    cart[index].quantity += change;

    // Nếu số lượng giảm về 0 thì xóa luôn
    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
  }

  // Lưu lại và vẽ lại giao diện
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
}

// 3. Hàm xóa sản phẩm
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
}

// Chạy hàm render khi trang web tải xong
document.addEventListener("DOMContentLoaded", renderCart);

function showQR() {
    // 1. Lấy số tiền hiện tại từ giỏ hàng
    const total = document.getElementById('cart-total').innerText;
    
    // 2. Tạo link QR (Sử dụng API miễn phí, bạn có thể thay bằng link ảnh của bạn)
    const qrUrl = "assets/images/ma_qr_momo.jpg";
    
    // 3. Cập nhật thông tin và hiển thị
    document.getElementById('qr-image').src = qrUrl;
    document.getElementById('qr-amount').innerText = total;
    document.getElementById('qr-overlay').style.display = 'flex';
}

function closeQR() {
    document.getElementById('qr-overlay').style.display = 'none';
}
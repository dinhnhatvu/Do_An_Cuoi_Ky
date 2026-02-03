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

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  if (cart[index]) {
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);

function showQR() {
    const total = document.getElementById('cart-total').innerText;
    
    const qrUrl = "assets/images/ma_qr_momo.jpg";
    
    document.getElementById('qr-image').src = qrUrl;
    document.getElementById('qr-amount').innerText = total;
    document.getElementById('qr-overlay').style.display = 'flex';
}

function closeQR() {
    document.getElementById('qr-overlay').style.display = 'none';
}
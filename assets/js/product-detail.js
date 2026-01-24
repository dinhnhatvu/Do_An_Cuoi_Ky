function changeImage(element) {
    // 1. Đổi ảnh to (Main Image)
    var mainImg = document.getElementById('mainImage');
    mainImg.src = element.src;

    // 2. Tìm danh sách các ảnh nhỏ (nằm cùng nhóm với ảnh vừa bấm)
    // "element.parentElement" chính là cái thẻ div bao quanh các ảnh nhỏ
    var container = element.parentElement; 
    var thumbs = container.querySelectorAll('img');

    // 3. Chạy vòng lặp để RESET tất cả về trạng thái bình thường
    thumbs.forEach(function(img) {
        img.classList.remove('active-thumb'); // Xóa class kích hoạt
    });

    // 4. Kích hoạt ảnh vừa bấm
    element.classList.add('active-thumb'); // Thêm class kích hoạt
}
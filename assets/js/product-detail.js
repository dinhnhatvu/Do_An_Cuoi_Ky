function changeImage(element) {
    var mainImg = document.getElementById('mainImage');
    mainImg.src = element.src;

    var container = element.parentElement; 
    var thumbs = container.querySelectorAll('img');

    thumbs.forEach(function(img) {
        img.classList.remove('active-thumb'); 
    });

    element.classList.add('active-thumb');
}
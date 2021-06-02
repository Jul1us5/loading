const lazyImages = document.querySelectorAll('img[data-src]');
const windowHeight = document.documentElement.clientHeight;

// Step: 1 | Find index
let lazyImgPosition = [];
if (lazyImages.length > 0) {

    lazyImages.forEach(img => {
        if (img.dataset.src) {
            lazyImgPosition.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    })
}

// Step: 3 | Call and Scroll
window.addEventListener('scroll', scrollActive);

function scrollActive() {
    lazyScrollCheck();
}

// Step: 2 | Find position
function lazyScrollCheck() {
    let imgIndex = lazyImgPosition.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        }
    }

    delete lazyImgPosition[imgIndex];
}
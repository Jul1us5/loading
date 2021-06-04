const lazyImages = document.querySelectorAll('img[data-src]');
const loadMapBlock = document.querySelector('.map--load');
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

    if (!loadMapBlock.classList.contains('loaded')) {
        getMap();
    }
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

function getMap() {

    const loadMapPosition = loadMapBlock.getBoundingClientRect().top + pageYOffset;
    if (pageYOffset > loadMapPosition - windowHeight) {

        const loadMapUrl = loadMapBlock.dataset.map;
        if (loadMapUrl) {

            loadMapBlock.insertAdjacentHTML(
                'beforeend',
                `<iframe src="${loadMapUrl}" width="600" height="450" style="border:0;"
             allowfullscreen="" loading="lazy"></iframe>`
            );
            loadMapBlock.classList.add('loaded');
        }
    }

}
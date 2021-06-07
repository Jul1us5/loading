const lazyImages = document.querySelectorAll('img[data-src]');
const loadMapBlock = document.querySelector('.map--load');
const loadMoreBlock = document.querySelector('.load--more');
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
    if (!loadMoreBlock.classList.contains('loaded')) {
        loadMore();
    }
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

// More loading

function loadMore() {

    const loadMorePosition = loadMoreBlock.getBoundingClientRect().top + pageYOffset;
    const loadMoreHeight = loadMoreBlock.offsetHeight;

    if (pageYOffset > (loadMorePosition + loadMoreHeight) - windowHeight) {
        getContent();
    }
}

async function getContent() {

    if (!document.querySelector('.load--icon')) {
        loadMoreBlock.insertAdjacentHTML(
            'beforeend',
            '<div class="load--icon"></div>'
        );
    }
    loadMoreBlock.classList.add('loaded');

    let response = await fetch('more.html', {
        method: 'GET',
    });

    if (response.ok) {

        let respResult = await response.text();
        loadMoreBlock.insertAdjacentHTML('beforeend', respResult);
        loadMoreBlock.classList.remove('loaded');
        if (document.querySelector('.load--icon')) {
            document.querySelector('.load--icon').remove();
        }
    } else {
        alert('!!!!!!!!!!');
    }
}


fetch('https://jul1u5.herokuapp.com/notes')
    .then(response => response.json())
    .then(data => getData(data));

function getData(param) {

    console.log(param[0]);

}
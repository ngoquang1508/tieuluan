// Slide ảnh cho trang chủ

const listImage = document.querySelector('.app-container__list-images')
const images = listImage.getElementsByTagName('img')
const btnLeft = document.querySelector('.app-container__slide-btn-left')
const btnRight = document.querySelector('.app-container__slide-btn-right')
const length = images.length;
let current = 0;

const handleChangeSlide = () => {
    let width = images[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -current}px)`;

    document.querySelector('.active').classList.remove('active');
    document.querySelector('.silde-index-' + current).classList.add('active');
    
    if (current === length - 1) {
        current = 0;
    } else {
        current++;
    }
};

let handleEventChangeSLide = setInterval(handleChangeSlide, 4000);

btnRight.addEventListener('click', () => {
    clearInterval(handleEventChangeSLide);
    handleChangeSlide();
    handleEventChangeSLide = setInterval(handleChangeSlide, 4000);
});

btnLeft.addEventListener('click', () => {
    clearInterval(handleEventChangeSLide);
    
    if (current === 0) {
        current = length - 1;
    } else {
        current--;
    }
    
    let width = images[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -current}px)`;
    
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.silde-index-' + current).classList.add('active');
    
    handleEventChangeSLide = setInterval(handleChangeSlide, 4000);
});
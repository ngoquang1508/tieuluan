import { createStorage } from "./authJS/storage.js";
import { checkLoginStatus } from "./checkLoginStatus.js";
import { events } from "../director/data/events.js";

/*
//  Kiểm tra trạng thái đăng nhập
*/
checkLoginStatus()

/**
 * Render nội dung tin tức nổi bật
*/

const newsProminentList = document.querySelector('.news-prominent--list ul')

events.forEach((item) => {
    let li = document.createElement('li')
    li.className = 'news-prominent--item'
    
    li.innerHTML = `
        <a href="${item.link}" target="_blank">
            <img src="${item.imageUrl}" alt="${item.title}" />
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <span class="learn-more">
                Tìm hiểu thêm
                <i class="fa-solid fa-arrow-right"></i>
            </span>
        </a>
    `

    newsProminentList.appendChild(li)
})



///// Hiệu ứng cho các item ở mục tin tức nổi bật
document.querySelectorAll('.news-prominent--item').forEach(item => {
    item.addEventListener('mouseover', () => {
        const learnMore = item.querySelector('.learn-more');
        if (learnMore) {
            Object.assign(learnMore.style, {
                opacity: '1',
                transform: 'scaleX(1)',
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                transformOrigin: 'left',
                color: '#ee4d2d',
            });
        }
    });

    item.addEventListener('mouseout', () => {
        const learnMore = item.querySelector('.learn-more');
        if (learnMore) {
            Object.assign(learnMore.style, {
                opacity: '0',
                transform: 'scaleX(0)',
            });
        }
    });
});



//// Nhấn like cho mục sự kiện sắp tới
let countLike = 0;
let countDislike = 0;
// Sự kiện bên trái
document.querySelectorAll('.news-event--left-item').forEach(newsItem => {
    const likeUp = newsItem.querySelector('#like-up');
    const likeDown = newsItem.querySelector('#like-down');
    const likedUp = newsItem.querySelector('#liked-up');
    const likedDown = newsItem.querySelector('#liked-down');

    const updateCounters = () => {
        likedUp.innerHTML = countLike > 0 ? `${countLike}` : '';
        likedDown.innerHTML = countDislike > 0 ? `${countDislike}` : '';
    };

    newsItem.querySelectorAll('.icon-item').forEach(iconItem => {
        iconItem.addEventListener('click', () => {
            const icon = iconItem.querySelector('i');
            
            if (icon.id === 'like-up') {
                const isActive = likeUp.classList.toggle('icon-active');
                likeDown.classList.remove('icon-active');
            
                countLike = isActive ? 1 : 0;
                countDislike = 0;
            }
            
            if (icon.id === 'like-down') {
                const isActive = likeDown.classList.toggle('icon-active');
                likeUp.classList.remove('icon-active');
            
                countDislike = isActive ? 1 : 0;
                countLike = 0;
            }
            
            updateCounters();
        });
    });
});

// Sự kiện bên phải
document.querySelectorAll('.app-event__news-event--right-item').forEach(newsItem => {
    const likeUp = newsItem.querySelector('#like-up');
    const likeDown = newsItem.querySelector('#like-down');
    const likedUp = newsItem.querySelector('#liked-up');
    const likedDown = newsItem.querySelector('#liked-down');

    const updateCounters = () => {
        likedUp.innerHTML = countLike > 0 ? `${countLike}` : '';
        likedDown.innerHTML = countDislike > 0 ? `${countDislike}` : '';
    };

    newsItem.querySelectorAll('.icon-item').forEach(iconItem => {
        iconItem.addEventListener('click', () => {
            const icon = iconItem.querySelector('i');
            
            if (icon.id === 'like-up') {
                const isActive = likeUp.classList.toggle('icon-active');
                likeDown.classList.remove('icon-active');
            
                countLike = isActive ? 1 : 0;
                countDislike = 0;
            }
            
            if (icon.id === 'like-down') {
                const isActive = likeDown.classList.toggle('icon-active');
                likeUp.classList.remove('icon-active');
            
                countDislike = isActive ? 1 : 0;
                countLike = 0;
            }         
            updateCounters();
        });
    });
});



// Cập nhật ảnh từ localStorage nếu có thay đổi
const imgIndex = document.getElementById('img_index')
const saveImageUrl = createStorage('imgUrl_setting')
const storedImage = saveImageUrl.get('imgUrl')

if (storedImage) {
    imgIndex.src = storedImage
}
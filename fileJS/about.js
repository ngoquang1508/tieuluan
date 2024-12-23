import { createStorage } from "./authJS/storage.js";
import { checkLoginStatus } from "./checkLoginStatus.js";

/*
//  Kiểm tra trạng thái đăng nhập
*/
checkLoginStatus()


//
function smoothScrollTo(container, targetPosition, duration) {
    const start = container.scrollTop;
    const distance = targetPosition - start;
    let startTime;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        container.scrollTop = start + distance * progress;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll(".app-main-container__navbar a");
    const contentsContainer = document.querySelector(".app-main-container__contents");
    const h3HasUniqueId = document.querySelectorAll('h3')

    navbarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);


            h3HasUniqueId.forEach(d => d.classList.remove('activate'))
            targetElement.classList.add('activate')

            navbarLinks.forEach(d => d.classList.remove('activate'))
            link.classList.add('activate')
            

            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - contentsContainer.offsetTop - 15; 
                smoothScrollTo(contentsContainer, offsetTop, 200);
            }
        });
    });
});

// Cập nhật ảnh từ localStoreage nếu có thay đổi
const imgIndex = document.getElementById('img_index')
const saveImageUrl = createStorage('imgUrl_setting')
const storedImage = saveImageUrl.get('imgUrl')

if (storedImage) {
    imgIndex.src = storedImage
}
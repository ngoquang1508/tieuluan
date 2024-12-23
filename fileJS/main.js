import { createStorage } from "./authJS/storage.js"
import { projectItems, projectDetails } from "./storageProject.js"
import { checkLoginStatus } from "./checkLoginStatus.js"


/*
//  Kiểm tra trạng thái đăng nhập
*/
checkLoginStatus()
    .then(() => {
        console.log('đăng nhập thành công')
    })
    .catch((error) => console.log(error))
    
/* 
//
// Hiển thị các dự án từ DB
//
*/
const activityList = document.querySelector('.app-container__activity-list')

projectItems.forEach((item, index) => {
    let divItem = document.createElement('div')
    divItem.className = 'app-container__activity-item'
    
    divItem.innerHTML = `
        <img src="${projectItems[index].imgUrl}" alt="${projectItems[index].title}"/>
        <h3>${projectItems[index].title}</h3>
        <p>${projectItems[index].content}</p>
    `

    activityList.appendChild(divItem)
})


/*
//
// hiển thị thông tin dự án tương ứng
//
*/

document.querySelectorAll('.app-container__activity-item').forEach((items, index) => {
    items.addEventListener('click', () => {
        showDetail(index)       
    })
})

const showDetail = (index) => {
    const modalOverlay = document.getElementById("modalOverlay");
    const modalDetailContent = document.getElementById("modalDetailContent");
    
    // Update modal content
    if (projectItems[index].id === projectDetails[index].id) {
        modalDetailContent.innerHTML = 
        `
            <h3>${projectDetails[index].title}</h3>
            <p>Địa chỉ: ${projectDetails[index].location}</p>
            <p>Thời gian: ${projectDetails[index].time}</p>
            <p>Đội ngũ: ${projectDetails[index].team}</p>
            <p>Dự kiến hoàn thành: ${projectDetails[index].expectedCompletion}</p>
        `
        modalDetailContent.style.lineHeight = '25px';
        modalDetailContent.style.fontSize = '16px';
    }

    
    // Show modal overlay
    modalOverlay.style.display = "flex";
}


// Lấy các ID của modal
const modalOverlay = document.getElementById("modalOverlay")
const donationOverlay = document.getElementById("donationOverlay")
const closeDetailBtn = document.getElementById("closeDetail")
const showDonationFormBtn = document.getElementById("showDonationForm")
const closeDonationFormBtn = document.getElementById("closeDonationForm")
const joinProjectBtn = document.getElementById("joinProject")

// Hàm đóng modal detail
const closeDetail = () => {
    modalOverlay.style.display = "none"
}

// Hàm đóng modal donation
const closeDonationForm = () => {
    donationOverlay.style.display = "none"
}

// Gán sự kiện
closeDetailBtn.addEventListener("click", closeDetail)



closeDonationFormBtn.addEventListener("click", closeDonationForm)

function joinProject () {
    joinProjectBtn.addEventListener("click", () => {
        if (confirm("Bạn có muốn tham gia dự án không?")) {
            console.log("Người dùng đã xác nhận tham gia dự án.")
        }
    })
}
     
        
// Kiểm tra trạng thái của login status
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    joinProject()
    showDonationFormBtn.addEventListener("click", () => {
        donationOverlay.style.display = "flex"
    })
} else {
    [joinProjectBtn, showDonationFormBtn].forEach(button => {
        button.addEventListener('click', () => {
            const question = confirm('Đăng nhập để tiếp tục?')
            if (question) {
                window.location.href = '../auth/login.html'
            }
        })
    })
}



/*
// Cập nhật ảnh từ localStorage nếu có thay đổi
*/
const imgIndex = document.getElementById('img_index')
const saveImageUrl = createStorage('imgUrl_setting')
const storedImage = saveImageUrl.get('imgUrl')

if (storedImage) {
    imgIndex.src = storedImage
}

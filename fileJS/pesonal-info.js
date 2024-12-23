import { createStorage } from "./authJS/storage.js"
import { setProfilePicture } from "./profilePicture.js"
// import { checkLoginStatusFileInfoPersonal } from "./checkLoginStatus.js"

/*
//  Kiểm tra trạng thái đăng nhập
*/
document.getElementById('logOutToInfo').addEventListener('click', () => {
    sessionStorage.setItem('isLoggedIn', 'false')
    window.location.href = '../auth/login.html'
})


// Chức năng thay đổi mật khẩu
const passwordLocal = JSON.parse(localStorage.getItem('password_setting')).password
const savePassword = createStorage('password_setting')

window.getData = event => {
    event.preventDefault()
        document.getElementById('saveChange').addEventListener('click', () => {
        const passOld = document.getElementById('passOld').value.trim()
        const passNew = document.getElementById('passNew').value.trim()


        if (passOld === '' || passNew === '') {
            alert('Vui lòng nhập đầy đủ thông tin!')
        } else if (passOld !== passwordLocal) {
            confirm('Mật khẩu hiện tại không chính xác!\n Xác nhận lấy lại mật khẩu?')
        } else if (passOld === passNew) {
            alert('Mật khẩu mới không được giống mật khẩu cũ')
        } else {
            alert('Thay đổi mật khẩu thành công!')
            savePassword.set('password', passNew)
        }  
    })
}

//////////////////////////////////////////////////////
// chức năng đóng mở modal
window.showContent = function (sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Thay đổi màu nền cho item được chọn
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.style.backgroundColor = ''
    });
}

// Mở modal thay đổi mật khẩu
window.openChangePassword = function () {
    document.getElementById('changePasswordModal').style.display = 'flex';
}

// Đóng modal thay đổi mật khẩu
window.closeChangePassword = function () {
    document.getElementById('changePasswordModal').style.display = 'none';
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('changePasswordModal');
    if (event.target === modal) {
        closeChangePassword();
    }
}

// Mặc định hiển thị "Thông Tin Cá Nhân" khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    showContent('personal-info');
});

function changeToLogin() {
    window.location.href = '../auth/login.html'
}


////////////////////////////////////////////
// Chức năng thay đổi avata
setProfilePicture()


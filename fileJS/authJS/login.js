import { accountAdmin, accountAdminister } from "./storage.js"

// Lấy data được lưu trữ trong local storage từ form đăng ký
const gmailLocal = JSON.parse(localStorage.getItem('gmail_setting'))
const userLocal = JSON.parse(localStorage.getItem('account_setting')).account
const passwordLocal = JSON.parse(localStorage.getItem('password_setting')).password

// Lấy data của người dùng nhập từ form login

const loginButton = document.querySelector('button[type="submit"]')

document.addEventListener('DOMContentLoaded', () => {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault()
        const userInput = document.getElementById('username').value.trim()
        const passwordInput = document.getElementById('password').value.trim()

        if (userInput === accountAdmin.userName && passwordInput === accountAdmin.password) {
            // Tài khoản của admin
            window.location.href = '../giamdoc.html'
        } else if (userInput === accountAdminister.userName && passwordInput === accountAdminister.password) {
            // Chuyển trang quản lý
            window.location.href = '../quanly.html'
        } else if (userInput === userLocal && passwordInput === passwordLocal) {
            // Lưu trạng thái đăng nhập thành công vào Session Storage
            sessionStorage.setItem('isLoggedIn', 'true') // Gán trạng thái đăng nhập là True 
            // Tài khoản của Người dùng
            window.location.href = '../trangchu.html'
        } else {
            alert('Tài khoản hoặc mật khẩu chưa chính xác!')
        }
    })
})




/////////////////////////////////
const inputPassword = document.querySelector('input[type="password"]')
const iconLock = document.querySelector('.fa-lock')

function showIcon() {
    iconLock.style.display = 'block'
}

function hiddenIcon() {
    iconLock.style.display = 'none'
}

inputPassword.addEventListener('keydown', () => {
    hiddenIcon()
}) 

window.onclick = function(e) {
    if (e.target !== inputPassword) {
        showIcon()
    }
}


import { getRegisterData } from './formHandler.js';

getRegisterData()
    .then(() => {
        alert('Tài khoản được tạo thành công!')
        window.location.href = '../auth/login.html'
    })
    .catch((error) => {
        console.error('Đã xảy ra lỗi:', error);
    });

export const registerGmail = document.getElementById('gmailRegister')
export const registerUseName = document.getElementById('usernameRegister')
export const registerPassword = document.getElementById('passwordRegister')


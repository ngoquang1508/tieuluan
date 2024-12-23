import { createStorage } from "./authJS/storage.js";
import { checkLoginStatus } from "./checkLoginStatus.js";


/*
//  Kiểm tra trạng thái đăng nhập
*/
checkLoginStatus()

const $ = document.getElementById.bind(document)

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    //  Form gửi thông tin 
    document.getElementById('btn-submit').addEventListener('click', (e) => {
        e.preventDefault()
        const contactUser = $('contact-user').value.trim()
        const contactEmail = $('contact-email').value.trim()
        const contactPhoneNumber = $('contact-phone_number').value.trim()
        const message = $('message').value.trim()

        const errorUser = $('error-user')
        const errorEmail = $('error-email')
        const errorPhone = $('error-phone')
        const errorMessage = $('error-message')

        let ok = [false, false, false, false]
        if (contactUser === '') {
            errorUser.innerHTML = 'Vui lòng không bỏ trống'
            errorUser.style.display = 'block'
        } else {
            errorUser.innerHTML = ''
            errorUser.style.display = 'none'
            ok[0] = true
        }
        if (contactEmail === '') {
            errorEmail.innerHTML = 'Vui lòng không bỏ trống'
            errorEmail.style.display = 'block'
        } else {
            errorEmail.innerHTML = ''
            errorEmail.style.display = 'none'
            ok[1] = true
        }
        if (contactPhoneNumber === '') {
            errorPhone.innerHTML = 'Vui lòng không bỏ trống'
            errorPhone.style.display = 'block'
        } else {
            errorPhone.innerHTML = ''
            errorPhone.style.display = 'none'
            ok[2] = true
        }
        if (message === '') {
            errorMessage.innerHTML = 'Vui lòng không bỏ trống'
            errorMessage.style.display = 'block'
        } else {
            errorMessage.innerHTML = ''
            errorMessage.style.display = 'none'
            ok[3] = true
        }

        if (ok.every(value => value === true)) {
            alert('Thông tin yêu cầu của bạn đã được gửi đi. Chúng tôi sẽ phản hồi trước 24h')
        }
    })

    // Đăng ký tình nguyện viên

    $('fviBtn').addEventListener('click', (e) => {
        e.preventDefault()
        let checkItem = [false, false, false, false, false] 

        document.querySelectorAll('.volunteer-input').forEach((inputVolunteer, index) => {
            let value = inputVolunteer.value.trim()
            checkItem[index] = value !== ''
        })
        
        if (checkItem.every(value => value === true)) {
            alert('Tạo thành công đơn đăng ký tình nguyện viên!')
        } else {
            alert('Điền đầy đủ các mục')
        }
    })
} else {
    [$('btn-submit'), $('fviBtn')].forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Đăng nhập để tiếp tục?')) {
                window.location.href = '../auth/login.html'
            }
        })
    })
}







// Cập nhật ảnh từ localStorage nếu có thay đổi
const imgIndex = $('img_index')
const saveImageUrl = createStorage('imgUrl_setting')
const storedImage = saveImageUrl.get('imgUrl')

if (storedImage) {
    imgIndex.src = storedImage
}
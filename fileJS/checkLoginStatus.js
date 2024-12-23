/*
    Kiểm tra trạng thái đăng nhập 
*/
export function checkLoginStatus () {
    return new Promise((resolve, reject) => {
        // Lấy id 
        const navbarUser = document.getElementById('navbar-user')
        const navbarAuth = document.getElementById('navbar-auth')
        const logOut = document.getElementById('logout')
        
        // Kiểm tra trạng thái từ Session Storage
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            navbarUser.style.display = 'block'
            navbarAuth.style.display = 'none'
            resolve()
        } else {
            navbarUser.style.display = 'none'
            navbarAuth.style.display = 'block'
        }
    
    
        // Nếu đăng xuất cập nhật trạng thái false
        logOut.addEventListener('click', () => {
            sessionStorage.setItem('isLoggedIn', 'false')
            resolve()
        })
        
    })
}
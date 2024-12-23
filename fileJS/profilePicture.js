    import { createStorage } from "./authJS/storage.js";

    // Chức năng thay đổi avata


    export function setProfilePicture () {
        // Lấy các phần tử file personal-info.html
        const penIcon = document.getElementById("pen");
        const fileInput = document.getElementById("fileInput");
        const profilePic = document.getElementById("profilePic");

        // Sử dụng createStorage để lấy và lưu ảnh
        const saveImageUrl = createStorage('imgUrl_setting'); // Tạo đối tượng lưu trữ cho 'imgUrl_setting'
        const storedImage = saveImageUrl.get('imgUrl'); // Lấy URL ảnh đã lưu từ localStorage
        
        // Kiểm tra nếu có ảnh đã lưu trong localStorage và hiển thị
        if (storedImage) {
            profilePic.src = storedImage
        }
        
        // Mở file khi click vào icon pen
        penIcon.addEventListener("click", () => {
            fileInput.click();
        });
        
        // Thay đổi ảnh đại diện khi người dùng chọn ảnh mới
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader(); // Tạo FileReader để đọc file
                reader.onload = () => {
                    const imageUrl = reader.result; // Lấy data URL từ FileReader
                    profilePic.src = imageUrl; // Cập nhật ảnh đại diện trang personal-info
        
                    // Lưu data URL của ảnh vào localStorage
                    saveImageUrl.set('imgUrl', imageUrl);
                };
                reader.readAsDataURL(file); // Đọc file dưới dạng data URL
            }
        });
    }
import { createStorage } from "./authJS/storage.js";
import { checkLoginStatus } from "./checkLoginStatus.js";

/*
//  Kiểm tra trạng thái đăng nhập
*/
checkLoginStatus()

// chức năng form
document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 1;
    let checkSelectMoney = false;
    let saveMoney = null;
    let currentActiveIndex = null;

    const bill = {
        title: 'Đơn xác nhận từ thiện',
        money: null,
        name: null,
        categoriesOfContribution: null,
        time: null,
    };

    function showStep(step) {
        document.querySelectorAll('.donate--step').forEach(fieldset => {
            fieldset.style.display = 'none';
        });
        document.querySelector(`#step-${step}`).style.display = 'block';
    }

    function validateStep1() {
        return new Promise((resolve, reject) => {
            if (checkSelectMoney) {
                resolve();
            } else {
                reject("Vui lòng chọn số tiền để tiếp tục.");
            }
        });
    }

    function validateStep2() {
        return new Promise((resolve, reject) => {
            const $ = document.getElementById.bind(document)
            const inputDonateName = $('inputDonateName').value.trim();
            const inputDonateEmail = $('inputDonateEmail').value.trim();
            const inputDonateTypeVal = $('inputDonateTypeVal').value.trim();
            const inputDonatePhone = $('inputDonatePhone').value.trim();

            // Hàm kiểm tra định dạng Gmail
            function validateGmail(email) {
                return !email.includes('@gmail.com');
            }

            bill.name = inputDonateName;
            bill.categoriesOfContribution = inputDonateTypeVal;

            if (!inputDonateName) {
                reject("Vui lòng nhập tên.");
            } else if (!inputDonateEmail) {
                reject("Vui lòng nhập địa chỉ Gmail.");
            } else if (validateGmail(inputDonateEmail)) {
                reject("Định dạng Gmail không hợp lệ!");
            } else if (!inputDonatePhone) {
                reject("Vui lòng nhập số điện thoại.");
            } else {
                resolve();
            }
        });
    }

    function validateStep3 () {
        return new Promise((resolve, reject) => {
            document.querySelectorAll('.checked-box').forEach(item => {
                const dieuKhoan1 = document.getElementById('checkDaDongYDieuKhoan1')
                // const dieuKhoan2 = document.getElementById('checkDaDongYDieuKhoan2')
                // const dieuKhoan3 = document.getElementById('checkDaDongYDieuKhoan3')
                console.log(item)
                if (item.checked && dieuKhoan1) {
                    resolve()
                } else {
                    reject('Vui lòng xác nhận bạn đã đồng ý với điều khoản của chúng tôi!')
                }
            })
        })
    }

    function renderBill () {
        console.table(bill)
        const listBill = document.getElementById('root')

        listBill.innerHTML = `
            <h2 class="dn-title">${bill.title}</h2>
            <p><strong>Họ và tên:</strong> ${bill.name}</p>
            <p><strong>Hạng mục đóng góp:</strong> ${bill.categoriesOfContribution}</p>
            <p><strong>Số tiền ủng hộ:</strong> ${bill.money} VNĐ</p>
            <p><strong>Thời gian:</strong> ${bill.time}</p>
        `
        Object.assign(listBill.style, {
            lineHeight: '28px',
            fontSize: '16px',
            fontFamily: 'Arial, Helvetica, sans-serif'
        })
    }

    function goToNextStep() {
        let validationPromise;

        if (currentStep === 1) {
            validationPromise = validateStep1();
        } else if (currentStep === 2) {
            validationPromise = validateStep2();
        } else if (currentStep === 3) {
            validationPromise = validateStep3();
        }

        if (validationPromise) {
            validationPromise
                .then(() => {
                    // Lưu giá trị vào đối tượng 'bill' khi chuyển bước
                    if (currentStep === 3) {
                        bill.time = new Date().toLocaleString(); // Lưu thời gian khi tới bước 3
                    }

                    currentStep++;
                    showStep(currentStep);
                    document.querySelector(`.active-${currentStep}`).classList.add('next-step');

                    if (currentStep === 4) {
                        renderBill();
                    }

                    document.querySelector('input[name="Về trang chủ"]').addEventListener('click', () => {
                            window.location.href = '../website/trangchu.html'
                        }
                    )
                })
                .catch(errorMessage => {
                    alert(errorMessage);
                });
        }
    }

    document.querySelectorAll('.next').forEach(button => {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            button.addEventListener('click', goToNextStep);
        } else {
            button.addEventListener('click', () => {
                if (confirm('Đăng nhập để tiếp tục?')) {
                    window.location.href = '../auth/login.html'
                }
            })
        }
    });

    document.querySelectorAll('.previous').forEach(button => {
        button.addEventListener('click', function () {
            currentStep--;
            showStep(currentStep);
            document.querySelector(`.active-${currentStep + 1}`).classList.remove('next-step');
        });
    });

    const inputDonateMoney = document.querySelector('input[name="donate_money"]');
    inputDonateMoney.addEventListener('focus', removeActiveClass);

    inputDonateMoney.addEventListener('input', function () {
        const value = parseFloat(inputDonateMoney.value);
        if (value > 0 && Number.isInteger(value)) {
            saveMoney = value;
            bill.money = saveMoney;
            checkSelectMoney = true;
        } else {
            bill.money = null;
        }
    });

    const inputDonateName = document.getElementById('inputDonateName');
    inputDonateName.addEventListener('input', function () {
        bill.name = inputDonateName.value.trim();
    });

    const inputDonateTypeVal = document.getElementById('inputDonateTypeVal');
    inputDonateTypeVal.addEventListener('input', function () {
        bill.categoriesOfContribution = inputDonateTypeVal.value.trim();
    });

    document.querySelectorAll('.list .check-money').forEach((item, index) => {
        item.addEventListener('click', () => {
            if (currentActiveIndex !== null) {
                document.querySelector(`.choose-${currentActiveIndex + 1}`).classList.remove('active');
            }
            currentActiveIndex = index;
            document.querySelector(`.choose-${index + 1}`).classList.add('active');

            saveMoney = parseFloat(item.dataset.money); 
            bill.money = saveMoney; 
            checkSelectMoney = true; 

            inputDonateMoney.value = '';
        });
    });

    function removeActiveClass() {
        document.querySelectorAll('.check-money').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    console.table(bill);
});




// Chức năng đóng mở select
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các phần tử .nice-select
    const niceSelects = document.querySelectorAll('.nice-select');

    // Thêm sự kiện cho từng .nice-select
    niceSelects.forEach(niceSelect => {
        const select = niceSelect.previousElementSibling; // Lấy <select> tương ứng
        const current = niceSelect.querySelector('.current');
        const list = niceSelect.querySelector('.list');
        const arrow = niceSelect.querySelector('.arrow'); // Lấy mũi tên cho từng nice-select
        
        // Hiển thị danh sách khi nhấp vào .nice-select
        niceSelect.addEventListener('click', function () {
            list.style.display = list.style.display === 'none' ? 'block' : 'none';
            // Thay đổi trạng thái xoay của mũi tên
            if (list.style.display === 'block') {
                Object.assign(arrow.style, {
                    transform: 'rotate(180deg)',
                    transition: '0.5s ease',
                })
            } else {
                Object.assign(arrow.style, {
                    transform: 'rotate(0deg)',
                    transition: '0.5s ease',
                })
            }
        });

        // Cập nhật khi chọn một mục trong danh sách
        list.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function () {
                const selectedValue = option.getAttribute('data-value');
                const selectedText = option.textContent;

                // Cập nhật <select> với giá trị đã chọn
                select.value = selectedValue;

                // Cập nhật .current để hiển thị tùy chọn đã chọn
                current.textContent = selectedText;

                // Đánh dấu tùy chọn đã chọn
                list.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Ẩn danh sách sau khi chọn
                list.style.display = 'none';
            });
        });

        // Ẩn danh sách nếu nhấp ra ngoài
        document.addEventListener('click', function (e) {
            if (!niceSelect.contains(e.target)) {
                list.style.display = 'none';
                Object.assign(arrow.style, {
                    transform: 'rotate(0deg)',
                    transition: '0.5s ease'
                })
            }
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
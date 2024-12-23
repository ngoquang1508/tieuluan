import { approveDB } from '../director/data/approve.js'
import { volunteerDB, sponsorsDB, recipientsOfSupportDB } from './database/data.js';
import { charityItemsDB } from './database/charityItemsDB.js';

/**
 * Chuyển các mục
 */

// Lấy ra tất cả các class cần thiết
const mainTab = document.querySelectorAll('.main__tab')
const mainTabLink = document.querySelectorAll('.main__tab-link')
const activeIcon = document.querySelectorAll('.active-icon')


mainTabLink.forEach((link, indexLink) => {
    link.addEventListener('click', () => {
        blockTab(indexLink)
    })
})

function blockTab(index) {
    // Ẩn tất cả các tab
    mainTab.forEach(item => {
        item.style.display = 'none'
    })
    // Ẩn tất cả active các item
    mainTabLink.forEach(itemLink => {
        itemLink.classList.remove('active')
    })
    // Ẩn tất cả active các icon
    activeIcon.forEach(itemIcon => {
        itemIcon.classList.remove('active')
    })

    // Hiển thị tab tương ứng
    mainTab[index].style.display = 'block'
    mainTabLink[index].classList.add('active')
    activeIcon[index].classList.add('active')
}


// Biểu đồ
const financialData = {
    labels: ["Số tiền tài trợ", "Đã chi tiêu", "Còn lại"],
    datasets: [{
        data: [5200000000, 2500000000, 2700000000],
        backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
        hoverOffset: 1
    }]
};

// Chart configuration for financial overview (Pie Chart)
const financialConfig = {
    type: 'pie',
    data: financialData,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Tài Chính Tổng Quan',
                font: {
                    size: 25
                }
            }
        }
    }
};

// Render financial chart
new Chart(
    document.getElementById('financialChart'),
    financialConfig
);

// Chart data for activity overview
const activityData = {
    labels: ["Dự án đang triển khai", "Dự án hoàn thành", "Tình nguyện viên", "Người nhận hỗ trợ"],
    datasets: [{
        label: "Số lượng",
        data: [15, 102, 430, 301],
        backgroundColor: ["#3F51B5", "#2196F3", "#00BCD4", "#009688"]
    }]
};

// Chart configuration for activity overview
const activityConfig = {
    type: 'bar',
    data: activityData,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Hoạt Động Tổng Quan',
                font: {
                    size: 25
                }
            }
        },
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Render activity chart
new Chart(
    document.getElementById('activityChart'),
    activityConfig
);

// Render danh sách dự án 
const tbody = document.querySelector('tbody')

approveDB.map(item => {
    let tr = document.createElement('tr')
    
    tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.content}</td>
        <td>${item.date}</td>
        <td>${item.partner}</td>
        <td>${item.cost}</td>
        <td>${item.manpower}</td>
        <td>
            <div class="options-btn">
                <button>Thay đổi</button>
                <button>Xóa</button>
            </div>
        </td>
        <td>
            <button class="send-btn">Gửi</button>
        </td>
    `
        
    tbody.appendChild(tr)
})


/**
 * Đối tác và cộng đồng + Mặt hàng từ thiện
*/

// Lấy tất cả các phần tử tbody trong danh sách các bảng
const mainPCItems = document.querySelectorAll('.main__pc-item tbody')

// Render 
function renderSponsors () {
    const mainItem = mainPCItems[0]

    sponsorsDB.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.donationAmount}</td>
            <td>${item.contact}</td>
            <td>${item.partnershipDate}</td>
            <td>${item.reason}</td>
            <td><button>Chỉnh sửa</button></td>
        `
        mainItem.appendChild(tr)
    })
}

function renderRecipientsOfSupport() {
    const mainItem = mainPCItems[1]

    recipientsOfSupportDB.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.birthday}</td>
            <td>${item.circumstance}</td>
            <td>${item.location}</td>
            <td>${item.supportReceived}</td>
            <td>${item.receivedDate}</td>
            <td>${item.reason}</td>
            <td><button>Chỉnh sửa</button></td>
        `
        mainItem.appendChild(tr)
    })
}

function renderVolunteer() {
    const mainItem = mainPCItems[2]

    volunteerDB.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.birthday}</td>
            <td>${item.skills}</td>
            <td>${item.contact}</td>
            <td>${item.joinedDate}</td>
            <td>${item.reason}</td>
            <td><button>Chỉnh sửa</button></td>
        `
        mainItem.appendChild(tr)
    })
}

function renderCharityItems() {
    const mainItem = mainPCItems[3]

    charityItemsDB.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.stockQuantity}</td>
            <td>${item.status}</td>
        `
        mainItem.appendChild(tr)
    })
}

renderSponsors()
renderRecipientsOfSupport()
renderVolunteer()
renderCharityItems()


/**
 * Create Report Form
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('report-title').value;
        const date = document.getElementById('report-date').value;
        const summary = document.getElementById('report-summary').value;
        const details = document.getElementById('report-details').value;
        
        if (title === '' || date === '' || summary === '' || details === '') {
            alert('Vui lòng điền đầy đủ thông tin báo cáo!');
            return;
        }
        
        successMessage.style.display = 'block';
        form.reset();
    });
});

/**
 * Đăng xuất
 */

const logoutBtn = document.getElementById('log-out')

logoutBtn.addEventListener('click', () => window.location.href = '../auth/login.html')
import { projectCompleted, personalSupported } from "./data/project-completed.js"
import { data } from "./data/dasboard.js"
import { approveDB } from "./data/approve.js"
import { reportDB, detailedReportDB } from "./data/report.js"



const menusItemsDropDown = document.querySelectorAll('.menu-item-dropdown')
const menusItemsStatic = document.querySelectorAll('.menu-item-static')
const sidebar = document.getElementById('sidebar')
const menuBtn = document.getElementById('menu-btn')
const darkModeBtn = document.getElementById('dark-mode-btn')
const exit = document.getElementById('exit')

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('minimize')
})

menusItemsDropDown.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        const subMenu = menuItem.querySelector('.sub-menu')
        const isActive = menuItem.classList.toggle('sub-menu-toggle')
        
        if (subMenu) {
            if (isActive) {
                subMenu.style.height = `${subMenu.scrollHeight + 6}px`
                subMenu.style.padding = '0.2rem 0'
            } else {
                subMenu.style.height = '0'
                subMenu.style.padding = '0'
            }
        }

        menusItemsDropDown.forEach(item => {
            if (item !== menuItem) {
                const otherSubmenu = item.querySelector('.sub-menu')
                
                if (otherSubmenu) {
                    item.classList.remove('sub-menu-toggle')
                    otherSubmenu.style.height = '0'
                    otherSubmenu.style.padding = '0'
                }
            }
        })
    })
})

menusItemsStatic.forEach(menuItem => {
    menuItem.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('minimize')) {
            return
        }

        menusItemsDropDown.forEach(item => {
            const otherSubmenu = item.querySelector('.sub-menu')

            if (otherSubmenu) {
                item.classList.remove('sub-menu-toggle')
                otherSubmenu.style.height = '0'
                otherSubmenu.style.padding = '0'
            }
        })
    })
})

function checkWindowsSize () {
    window.addEventListener('resize', checkWindowsSize)
}

/*
// Chuyển các mục 
*/

// Các phần tử liên quan
const sidebarContentItems = document.querySelectorAll('.sidebar-content__item');
const menuItems = document.querySelectorAll('.menu-item');
const subItemsLink = document.querySelectorAll('.sub-menu-link');
const itemChild = document.querySelectorAll('.item-child');

// Gắn sự kiện cho các mục menu chính
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Xóa lớp 'active' khỏi tất cả các mục
        menuItems.forEach(menu => menu.classList.remove('active'))

        // Nếu là mục "Thông Báo" (index === 2)
        if (index === 2) {
            // Kích hoạt liên kết nhỏ, nhưng không hiển thị sidebar ngay lập tức
            activateSubItemsLink(index)
        } else if (index === 3) {
            alert('chức năng chưa khả dụng')
        } else {
            // Hiển thị nội dung sidebar tương ứng ngay lập tức
            sidebarContentItem(index)
        }

        // Thêm lớp 'active' vào mục được nhấn
        item.classList.add('active');
    });
});

// Gắn sự kiện cho các mục nhỏ của "Thông Báo"
function activateSubItemsLink(parentIndex) {
    subItemsLink.forEach((link, subIndex) => {
        link.addEventListener('click', () => {
            // Hiển thị nội dung sidebar "Thông Báo" khi nhấn vào mục con
            sidebarContentItem(parentIndex)
            activateItemChild(subIndex)
        });
    });
}

// Hiển thị thông tin mục con khi nhấn vào item-child
function activateItemChild(subIndex) {
    // Ẩn tất cả các mục con
    itemChild.forEach((child, index) => {
        child.style.display = (index === subIndex) ? 'block' : 'none'; // Hiển thị mục con tương ứng
    });
}

// Hiển thị nội dung sidebar theo index
function sidebarContentItem(index) {
    // Ẩn tất cả nội dung sidebar
    sidebarContentItems.forEach(item => item.style.display = 'none');

    // Hiển thị nội dung tương ứng
    if (sidebarContentItems[index]) {
        sidebarContentItems[index].style.display = 'block';
    }
}




// Thoát khỏi trang Giám đốc
exit.addEventListener('click', () => {
    if (confirm('Xác nhận đăng xuất?')) {
        window.location.href = '../auth/login.html'
    }
})

/*
// Render ra các dự án đã hoàn thành
*/

const projectList = document.querySelectorAll('.projects__list')    


projectCompleted.map((item) => {
    let divItems = document.createElement('div')
    divItems.className = 'projects-completed__item'


    divItems.innerHTML = `
        <img 
            style="width: 100%;
            height: 12rem;
            object-fit: cover;
            border-radius: 10px;"
            src="${item.imageUrl}" alt="Ảnh: ${item.projectTitle}" 
        />
        <h3 className="text" className="text">${item.projectTitle}</h3>
        <div className="box-content">
            <p><strong>Đối tượng nhận hỗ trợ: </strong>${item.beneficiaries}</p>
            <p><strong>Nhà tài trợ: </strong>${item.sponsors}</p>
            <p><strong>Số tiền ủng hộ: </strong>${item.donationAmount}</p>
            <p><strong>Ngày hoàn thành: </strong>${item.completionTime}</p>
        </div>
    `
    projectList[0].appendChild(divItems)
})

/*
// Render ra các cá nhân được nhận hỗ trợ
*/

personalSupported.map(personalSupported => {
    let divItems = document.createElement('div')
    divItems.className = 'projects-completed__item'

    divItems.innerHTML = `
        <img 
            style="width: 100%;height: 12rem;object-fit: cover;border-radius: 10px;" 
            src="${personalSupported.imageUrl}" alt="Ảnh: ${personalSupported.name}"
         />
        <h3 className="text">${personalSupported.name}</h3>
        <div 
            style="font-size: 0.85rem"
            className="box-content"
        >
            <p><strong>Địa chỉ: </strong>${personalSupported.address}</p>
            <p><strong>Hoàn cảnh: </strong>${personalSupported.circumstance}</p>
            <p><strong>Số tiền ủng hộ: </strong>${personalSupported.donationAmount}</p>
            <p><strong>Trạng thái: </strong>${personalSupported.condition}</p>
        </div>
    `
    projectList[1].appendChild(divItems)
})



/*
// Render biểu đồ
*/
const rootStyle = getComputedStyle(document.documentElement)
const colorTextPrimery = rootStyle.getPropertyValue('--color-text-primary').trim()

// Cấu hình cho biểu đồ
const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: colorTextPrimery
                }
            },
            title: {
                display: true,
                text: 'Số tiền quyên góp hàng tháng',
                color: colorTextPrimery, 
                font: {
                    size: 18
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: colorTextPrimery
                }
            },
            y: {
                ticks: {
                    color: colorTextPrimery,
                    callback: (value) => value.toLocaleString('vi-VN') + ' VNĐ'
                }
            }
        }
    }
}

// Hiển thị biểu đồ
const ctx = document.getElementById('donationChart').getContext('2d')
new Chart(ctx, config)


// Render danh sách cần phê duyệt
const tbody = document.querySelector('tbody')

approveDB.map(item => {
    let tr = document.createElement('tr')
    
    tr.innerHTML = `
        <td>${item.title}</td>
        <td>${item.date}</td>
        <td>${item.content}</td>
        <td><button class="approve-btn confirm-btn">Phê Duyệt</button></td>
        <td><button class="reject-btn confirm-btn">Từ Chối</button></td>
        <td class="status"></td>
        <td><a href="${item.link}" target="_blank" class="project-link">Xem chi tiết</a></td>
    `
    
    tbody.appendChild(tr)
})

/*
 *Sự kiện duyệt dự án 
*/
const approveButtons = document.querySelectorAll('.approve-btn')
const rejectButtons = document.querySelectorAll('.reject-btn')

// Lấy tất cả các ô trạng thái
const statusCells = document.querySelectorAll('.status')

// Xử lý sự kiện khi phê duyệt báo cáo
approveButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        statusCells[index].textContent = '✓'
        statusCells[index].classList.add('approved')
        statusCells[index].classList.remove('rejected')
    })
})

// Xử lý sự kiện khi từ chối báo cáo
rejectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        statusCells[index].textContent = '✕'
        statusCells[index].classList.add('rejected')
        statusCells[index].classList.remove('approved')
    })
})



// Nhận báo cáo

// Render các báo cáo từ DB
const tbodyId = document.getElementById('tbody')

reportDB.map(item => {
    let trReport = document.createElement('tr')
    
    trReport.innerHTML = `
        <td>${item.project_name}</td>
        <td>${item.progress}</td>
        <td>${item.sponsor}</td>
        <td>${item.cooperation_date}</td>
        <td>${item.status}</td>
        <td>${item.reason}</td>
        <td>
            <button class="confirm-btn update-btn">Đánh dấu đã xem</button>
            <button class="confirm-btn details-btn" data-id="${item.id}">Xem Chi Tiết</button>
        </td>
        <td class="mark"></td>
    `
    
    tbodyId.appendChild(trReport)
})

// Đánh dấu là đã xem
const mark = document.querySelectorAll('.mark')
const updateBtns = document.querySelectorAll('.update-btn')
updateBtns.forEach((updateBtn, index) => {
    updateBtn.addEventListener('click', () => {
        mark[index].textContent = '✓'
        mark[index].classList.add('approved')
    })
})

// render nội dung chi tiết của mỗi báo cáo

const modal = document.getElementById('details-modal')
const projectDetails = document.createElement('div')
    projectDetails.id = 'project-details'
const modalContent = document.createElement('div')
modalContent.className = 'modal-content'

modal.appendChild(modalContent)
modalContent.appendChild(projectDetails)

// Hàm mở modal và hiển thị chi tiết của dự án
function showProjectDetails(id) {
    // Tìm dự án từ DB theo id
    const project = detailedReportDB.find(item => item.id === id);
    
    if (project) {
        projectDetails.innerHTML = `
            <span
                class="close-modal-btn"
                style="
                    position: fixed;
                    top: 1rem; 
                    right: 1rem;
                    cursor: pointer;
                    padding: 0.4rem 0.6rem;
                    border-radius: 5px;
                    background-color: #767676;
                    color: white;
                    font-weight: 900;"
            >✕</span>
            <h2 
                className="text"
                style="text-align: center; padding: 1.6rem 0;"
            >${project.project_name}</h2>
            <div
                style="display: flex;gap: 2rem;line-height: 1.2rem;"
            >
                <img src="${project.imageUrl}" alt="${project.project_name}" width="45%" objectFit="cover">
                <div>
                    <p><strong>Nhà tài trợ:</strong> ${project.sponsor}</p>
                    <p><strong>Ngày hợp tác:</strong> ${project.cooperation_date}</p>
                    <p><strong>Nội dung:</strong> ${project.content}</p>
                </div>
            </div>
        `;
        document.querySelector('.close-modal-btn').addEventListener('click', closeModal)
    }
    // Hiển thị modal
    modal.style.display = 'block';
}


// Lấy các nút "Xem Chi Tiết"
const detailsBtns = document.querySelectorAll('.details-btn')

// Khi nhấn vào "Xem Chi Tiết"
detailsBtns.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block'
        // Cập nhật nội dung chi tiết dự án
        projectDetails.textContent = 'Nội dung chi tiết của dự án sẽ hiển thị tại đây.'
    })
})

// Khi nhấn vào nút đóng

function closeModal () {
    modal.style.display = 'none'
}

// Khi nhấn bên ngoài modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})

document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = parseInt(e.target.getAttribute('data-id'));
        showProjectDetails(projectId);
    });
});

// Chức năng tìm kiếm
document.addEventListener("DOMContentLoaded", () => {
    const search = document.querySelector('input[type="search"]');
    
    search.addEventListener('input', () => {
        // Chọn các thẻ h2, h3, và p
        const elements = document.querySelectorAll('h2, h3, p');
        
        const searchValue = search.value;
        const regex = new RegExp(`(${searchValue})`, 'gi'); 
        
        elements.forEach(el => {
            // Khôi phục nội dung gốc trước khi tô sáng
            const originalText = el.textContent;
            el.innerHTML = searchValue 
                ? originalText.replace(regex, `<mark>$1</mark>`) 
                : originalText; 
        });
    });
});


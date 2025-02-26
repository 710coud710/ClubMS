let activities = []; // Mảng lưu trữ các hoạt động
let editIndex = -1; // Chỉ số hoạt động đang sửa
const itemsPerPage = 5; // Số hoạt động hiển thị trên mỗi trang
let currentPage = 1; // Trang hiện tại

// Fake dữ liệu ban đầu
function initializeFakeData() {
    activities = [
        {
            title: "Hội thảo công nghệ",
            description: "Hội thảo về các xu hướng công nghệ mới nhất.",
            start_datetime: "2023-12-01T09:00",
            end_datetime: "2023-12-01T17:00",
            location: "Hà Nội",
            organizer_id: "ORG001"
        },
        {
            title: "Lễ hội văn hóa",
            description: "Lễ hội giới thiệu văn hóa các vùng miền.",
            start_datetime: "2023-11-15T10:00",
            end_datetime: "2023-11-17T22:00",
            location: "TP. Hồ Chí Minh",
            organizer_id: "ORG002"
        },
        {
            title: "Cuộc thi lập trình",
            description: "Cuộc thi lập trình dành cho sinh viên.",
            start_datetime: "2023-12-10T08:00",
            end_datetime: "2023-12-12T20:00",
            location: "Đà Nẵng",
            organizer_id: "ORG003"
        }
    ];
    renderActivities();
}

// Tự động cập nhật trạng thái dựa trên ngày giờ hiện tại
function updateActivityStatus(activity) {
    const now = new Date();
    const startDatetime = new Date(activity.start_datetime);
    const endDatetime = new Date(activity.end_datetime);

    if (now < startDatetime) {
        return "Sắp diễn ra";
    } else if (now >= startDatetime && now <= endDatetime) {
        return "Đang diễn ra";
    } else {
        return "Đã kết thúc";
    }
}

// Thêm/sửa hoạt động
// Thêm/sửa hoạt động
document.getElementById('saveActivity').addEventListener('click', function () {
    const activity = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        start_datetime: document.getElementById('start_datetime').value,
        end_datetime: document.getElementById('end_datetime').value,
        location: document.getElementById('location').value,
        organizer_id: document.getElementById('organizer_id').value // Lấy giá trị mặc định
    };
    if (editIndex === -1) {
        activities.unshift(activity); // Thêm mới lên đầu danh sách
    } else {
        activities[editIndex] = activity; // Sửa
        editIndex = -1; // Đặt lại chỉ số sửa
    }
    renderActivities();
    resetForm();
    bootstrap.Modal.getInstance(document.getElementById('activityModal')).hide();
});

// Hiển thị hoạt động trong bảng
function renderActivities() {
    const tableBody = document.getElementById('activityTableBody');
    tableBody.innerHTML = '';

    // Tính toán dữ liệu cho trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const activitiesToShow = activities.slice(startIndex, endIndex);

    activitiesToShow.forEach((activity, index) => {
        const status = updateActivityStatus(activity); // Tự động cập nhật trạng thái
        const startDatetime = new Date(activity.start_datetime).toLocaleString();
        const endDatetime = new Date(activity.end_datetime).toLocaleString();
        const row = `
            <tr>
                <td>${activity.title}</td>
                <td>${activity.description}</td>
                <td>${status}</td>
                <td>${startDatetime}</td>
                <td>${endDatetime}</td>
                <td>${activity.location}</td>
                <td>${activity.organizer_id}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editActivity(${startIndex + index})">Sửa</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteActivity(${startIndex + index})">Xóa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    updateSummary();
    renderPagination();
}

// Sửa hoạt động
function editActivity(index) {
    const activity = activities[index];
    document.getElementById('title').value = activity.title;
    document.getElementById('description').value = activity.description;
    document.getElementById('start_datetime').value = activity.start_datetime;
    document.getElementById('end_datetime').value = activity.end_datetime;
    document.getElementById('location').value = activity.location;
    document.getElementById('organizer_id').value = activity.organizer_id;
    editIndex = index; // Lưu chỉ số hoạt động đang sửa
    const modal = new bootstrap.Modal(document.getElementById('activityModal'));
    modal.show();
}

// Xóa hoạt động
function deleteActivity(index) {
    activities.splice(index, 1);
    renderActivities();
}

// Đặt lại form
function resetForm() {
    document.getElementById('activityForm').reset();
    editIndex = -1; // Đặt lại chỉ số sửa
}

// Cập nhật tóm tắt hoạt động
function updateSummary() {
    const totalActivities = activities.length;
    const upcomingActivities = activities.filter(activity => updateActivityStatus(activity) === "Sắp diễn ra").length;
    const ongoingActivities = activities.filter(activity => updateActivityStatus(activity) === "Đang diễn ra").length;

    document.getElementById('totalActivities').textContent = totalActivities;
    document.getElementById('upcomingActivities').textContent = upcomingActivities;
    document.getElementById('ongoingActivities').textContent = ongoingActivities;
}

// Hiển thị navigator (phân trang)
function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(activities.length / itemsPerPage);

    // Nút Previous
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;

    // Các nút trang
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // Nút Next
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </age + 1})">Next</a>
        </li>
    `;
}

// Thay đổi trang
function changePage(page) {
    currentPage = page;
    renderActivities();
}

// Khởi tạo fake dữ liệu khi trang được tải
initializeFakeData();
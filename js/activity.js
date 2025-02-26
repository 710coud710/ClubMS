// Fake dữ liệu hoạt động
const activities = [
    {
        id: 1,
        title: "Workshop Lập trình Web",
        description: "Học cách xây dựng website từ cơ bản đến nâng cao cùng các chuyên gia trong ngành.",
        start_datetime: "2023-10-15T18:00",
        end_datetime: "2023-10-15T21:00",
        location: "Phòng 201, Tòa nhà A, Trường ĐH",
        organizer_id: "M072",
        image: "img/event.jpg"
    },
    {
        id: 2,
        title: "Cuộc thi Hackathon",
        description: "Thử thách 24h lập trình sáng tạo với giải thưởng hấp dẫn.",
        start_datetime: "2023-10-20T08:00",
        end_datetime: "2023-10-21T08:00",
        location: "Trung tâm Công nghệ, Quận 1",
        organizer_id: "M073",
        image: "img/event.jpg"
    },
    {
        id: 3,
        title: "Seminar AI & Machine Learning",
        description: "Cập nhật xu hướng và ứng dụng AI trong thực tế.",
        start_datetime: "2023-10-25T14:00",
        end_datetime: "2023-10-25T17:00",
        location: "Hội trường lớn, Tòa nhà B",
        organizer_id: "M074",
        image: "img/event.jpg"
    },
    {
        id: 4,
        title: "Giao lưu Networking",
        description: "Kết nối với các chuyên gia và doanh nghiệp trong ngành CNTT.",
        start_datetime: "2023-10-30T19:00",
        end_datetime: "2023-10-30T22:00",
        location: "Khách sạn ABC, Quận 3",
        organizer_id: "M075",
        image: "img/event.jpg"
    }
];

// Hiển thị hoạt động
function renderActivities() {
    const activityContainer = document.querySelector('.activity-container');
    activityContainer.innerHTML = '';

    activities.forEach(activity => {
        const status = getActivityStatus(activity); // Tự động cập nhật trạng thái
        const startDatetime = new Date(activity.start_datetime).toLocaleString();
        const endDatetime = new Date(activity.end_datetime).toLocaleString();

        const activityHTML = `
            <div class="activity-post mb-4 bg-white rounded shadow">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${activity.image}" class="img-fluid rounded-start" alt="Event Image" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="p-4 h-100 d-flex flex-column">
                            <div class="mb-3">
                                <h4 class="mb-1">${activity.title}</h4>
                                <small class="text-muted"><i class="far fa-calendar-alt me-1"></i>${startDatetime}</small>
                            </div>
                            <p class="mb-3 flex-grow-1">${activity.description}</p>
                            <div class="mb-3">
                                <span class="badge ${getStatusBadgeClass(status)}">${status}</span>
                            </div>
                            <div class="mb-3">
                                <i class="fas fa-user-tie me-2"></i>Người tổ chức: <strong>${activity.organizer_id}</strong>
                            </div>
                            <div class="d-flex justify-content-between align-items-end">
                                <div class="location">
                                    <i class="fas fa-map-marker-alt me-2"></i>
                                    <span>${activity.location}</span>
                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-primary join-btn" data-event-id="${activity.id}" onclick="handleJoinClick(this)">
                                        <span class="join-text">Tham gia</span>
                                        <span class="loading-spinner" style="display: none;">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        </span>
                                    </button>
                                    <button class="btn btn-outline-danger cancel-btn" data-event-id="${activity.id}" style="display: none;" onclick="handleCancelClick(this)">
                                        Hủy tham gia
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        activityContainer.innerHTML += activityHTML;
    });
}

// Tự động cập nhật trạng thái
function getActivityStatus(activity) {
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

// Lớp CSS cho trạng thái
function getStatusBadgeClass(status) {
    switch (status) {
        case "Sắp diễn ra":
            return "bg-primary";
        case "Đang diễn ra":
            return "bg-success";
        case "Đã kết thúc":
            return "bg-secondary";
        default:
            return "bg-light";
    }
}

// Xử lý tham gia hoạt động
function handleJoinClick(button) {
    button.classList.add('loading');
    setTimeout(() => {
        button.classList.remove('loading');
        button.style.display = 'none';
        button.nextElementSibling.style.display = 'block';
    }, 1000);
}

// Xử lý hủy tham gia
function handleCancelClick(button) {
    button.classList.add('loading');
    setTimeout(() => {
        button.classList.remove('loading');
        button.style.display = 'none';
        button.previousElementSibling.style.display = 'block';
    }, 1000);
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    renderActivities();
});
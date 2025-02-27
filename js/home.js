
const activities = [
    {
        id: 1,
        title: "Workshop Lập trình Web",
        description: "Học cách xây dựng website từ cơ bản đến nâng cao cùng các chuyên gia trong ngành.",
        start_datetime: "2024-10-15T18:00",
        end_datetime: "2024-10-15T21:00",
        location: "Phòng 201, Tòa nhà A, Trường ĐH",
        organizer_id: "Hứa Mạnh Luân",
        image: "img/event.jpg"
    },
    {
        id: 2,
        title: "Cuộc thi Hackathon",
        description: "Thử thách 24h lập trình sáng tạo với giải thưởng hấp dẫn.",
        start_datetime: "2024-10-20T08:00",
        end_datetime: "2024-10-21T08:00",
        location: "Trung tâm Công nghệ, Quận 1",
        organizer_id: "Hứa Mạnh Luân",
        image: "img/event.jpg"
    },
    {
        id: 3,
        title: "Sinh hoạt Câu Lạc Bộ",
        description: "Sinh hoạt thường niên của CLB.",
        start_datetime: "2025-02-25T14:00",
        end_datetime: "2025-02-25T17:00",
        location: "Phòng 101, Giảng đường C2",
        organizer_id: "Hứa Mạnh Luân",
        image: "img/event.jpg"
    },
    {
        id: 4,
        title: "Giao lưu kiến thức với các Chuyên gia",
        description: "Tọa đàm với các chuyên gia trong ngành CNTT.",
        start_datetime: "2025-02-30T19:00",
        end_datetime: "2025-02-30T22:00",
        location: "Hội trường đa năng",
        organizer_id: "Hứa Mạnh Luân",
        image: "img/event.jpg"
    }
];

// Hiển thị 2 hoạt động mới nhất
function renderRecentActivities() {
    const recentActivitiesContainer = document.getElementById('recentActivities');
    recentActivitiesContainer.innerHTML = '';

    // Sắp xếp hoạt động theo thời gian bắt đầu (mới nhất lên đầu)
    const sortedActivities = activities.sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));

    // Lấy 2 hoạt động mới nhất
    const recentActivities = sortedActivities.slice(0, 2);

    // Hiển thị hoạt động
    recentActivities.forEach(activity => {
        const startDatetime = new Date(activity.start_datetime).toLocaleString();
        const endDatetime = new Date(activity.end_datetime).toLocaleString();

        const activityHTML = `
        <div class="col-sm-6">
            <div class="activity-item bg-white rounded p-4 shadow-sm d-flex">
                <div class="me-4">
                    <img src="${activity.image}" class="rounded" alt="Event Image" style="width: 120px; height: 120px; object-fit: cover;">
                </div>
                <div class="flex-grow-1 text-left">
                    <h6 class="mb-1">${activity.title}</h6>
                    <small class="text-muted"><i class="far fa-calendar-alt me-1"></i>${startDatetime} - ${endDatetime}</small>
                    <p class="mt-2 mb-3">${activity.description}</p>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        <span>${activity.location}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
        recentActivitiesContainer.innerHTML += activityHTML;
    });
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    renderRecentActivities();
});
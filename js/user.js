const members = [
    {
        id: 1,
        name: "Hứa Mạnh Luân",
        avatar: "img/user.jpg",
        class: "CNTT",
        dob: "2000-01-01",
        role: "Chủ nhiệm",
        status: "Online"
    },
    {
        id: 2,
        name: "Nguyễn Văn A",
        avatar: "img/user.jpg",
        class: "CNTT",
        dob: "2006-05-15",
        role: "Thành viên",
        status: "Offline"
    },
    {
        id: 3,
        name: "Nguyễn Văn B",
        avatar: "img/user.jpg",
        class: "KTPM",
        dob: "2005-08-20",
        role: "Thành viên",
        status: "Online"
    }
];

// Hiển thị danh sách thành viên
function renderMembers(membersData) {
    const tbody = document.querySelector("#membersTable tbody");
    tbody.innerHTML = '';

    membersData.forEach((member, index) => {
        const row = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>
                    <img src="${member.avatar}" class="rounded-circle" alt="Avatar" style="width: 40px; height: 40px;">
                </td>
                <td>${member.name}</td>
                <td>${member.class}</td>
                <td>${member.dob}</td>
                <td>${member.role}</td>
                <td>
                    <span class="badge ${member.status === 'Online' ? 'bg-success' : 'bg-secondary'}">${member.status}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info me-2" onclick="viewProfile(${member.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="sendMessage(${member.id})">
                        <i class="fas fa-comment"></i> 
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Tìm kiếm thành viên
function searchMembers() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.class.toLowerCase().includes(searchTerm) ||
        member.dob.includes(searchTerm)
    );
    renderMembers(filteredMembers);
}

// Xem thông tin thành viên
function viewProfile(memberId) {
    // alert(`Xem thông tin thành viên có ID: ${memberId}`);
    // Chuyển hướng đến trang xem thông tin thành viên
    window.location.href = `profile.html`;
}

// Nhắn tin cho thành viên
function sendMessage(memberId) {
    // alert(`Nhắn tin cho thành viên có ID: ${memberId}`);
    // Chuyển hướng đến trang chat
    window.location.href = `chats.html`;
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    renderMembers(members);
});
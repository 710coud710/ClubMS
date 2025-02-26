document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('memberForm');
    const editMemberForm = document.getElementById('editMemberForm');
    const memberTable = document.getElementById('memberTable');

    // Danh sách thành viên (tạm thời)
    let members = [
        {
            member_id: 1,
            name: 'Nguyễn Văn A',
            student_code: 'DTC987654321',
            birthday: '2000-01-01',
            email: 'DTC987654321@ictu.edu.vn',
            number_phone: '0123456789',
            address: 'Thanh Xuân, Hà Nội',
            role: 'Thành viên',
            status: 'Thành viên hiện tại',
            username: 'DTC987654321',
            password: '123456'
        },
        {
            member_id: 2,
            name: 'Trần Thị B',
            student_code: 'DTC378945612',
            birthday: '2000-02-02',
            email: 'DTC378945612@ictu.edu.vn',
            number_phone: '0987654321',
            address: 'Tân Thịnh, TP Thái Nguyên',
            role: 'Ban Chủ nhiệm',
            status: 'Cựu thành viên',
            username: 'DTC987654321',
            password: '123456'
        },
        {
            member_id: 3,
            name: 'Lê Văn C',
            student_code: 'DTC98765781',
            birthday: '2000-01-01',
            email: 'DTC98765781@ictu.edu.vn',
            number_phone: '0123456789',
            address: 'Sầm Sơn, Thanh Hóa',
            role: 'Chủ nhiệm',
            status: 'Thành viên hiện tại',
            username: 'DTC98765781',
            password: '123456'
        }
    ];

    // Hiển thị dữ liệu mẫu khi trang được tải
    if (memberTable) {
        members.forEach(member => {
            addMemberToTable(member);
        });
        updateSummary();
    }


    // Xử lý khi form thêm thành viên được submit
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const studentCode = document.getElementById('studentCode').value;
            const member = {
                member_id: members.length + 1,
                name: document.getElementById('memberName').value,
                student_code: studentCode,
                birthday: document.getElementById('birthday').value,
                email: document.getElementById('email').value,
                number_phone: document.getElementById('numberPhone').value,
                address: document.getElementById('address').value,
                role: document.getElementById('role').value,
                status: document.getElementById('status').value,
                username: studentCode, // Mặc định username là student_code
                password: '123456'    // Mặc định password là 123456
            };

            // Thêm thành viên vào danh sách
            members.push(member);

            // Hiển thị thành viên trong bảng
            addMemberToTable(member);

            // Cập nhật bảng tóm tắt
            updateSummary();

            // Reset form và đóng modal
            memberForm.reset();
            bootstrap.Modal.getInstance(document.getElementById('addMemberModal')).hide();
        });
    }


    // Xử lý khi form sửa thành viên được submit
    if (editMemberForm) {
        editMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const index = document.getElementById('editMemberIndex').value;
            const updatedMember = {
                member_id: members[index].member_id,
                name: document.getElementById('editMemberName').value,
                student_code: document.getElementById('editStudentCode').value,
                birthday: document.getElementById('editBirthday').value,
                email: document.getElementById('editEmail').value,
                number_phone: document.getElementById('editNumberPhone').value,
                address: document.getElementById('editAddress').value,
                role: document.getElementById('editRole').value,
                status: document.getElementById('editStatus').value,
                // username: document.getElementById('editUsername').value,
                password: document.getElementById('editPassword').value
            };

            // Cập nhật thành viên trong danh sách
            members[index] = updatedMember;

            // Cập nhật lại bảng
            refreshMemberTable();

            // Cập nhật bảng tóm tắt
            updateSummary();

            // Reset form và đóng modal
            editMemberForm.reset();
            bootstrap.Modal.getInstance(document.getElementById('editMemberModal')).hide();
        });
    }

    // Thêm thành viên vào bảng
    function addMemberToTable(member, addToTop = false) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.member_id}</td>
            <td>${member.name}</td>
            <td>${member.student_code}</td>
            <td>${member.birthday}</td>
            <td>${member.email}</td>
            <td>${member.number_phone}</td>
            <td>${member.address}</td>
            <td>${member.role}</td>
            <td>${member.status}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editMember(this)">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteMember(this)">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        if (memberTable) {
            if (addToTop && memberTable.firstChild) {
                // Thêm vào đầu bảng
                memberTable.insertBefore(row, memberTable.firstChild);
            } else {
                // Thêm vào cuối bảng
                memberTable.appendChild(row);
            }
        }
    }

    // Làm mới bảng thành viên
    function refreshMemberTable() {
        if (memberTable) {
            memberTable.innerHTML = ''; // Xóa toàn bộ nội dung bảng
            members.forEach(member => {
                addMemberToTable(member);
            });
        }
    }

    // Xóa thành viên
    window.deleteMember = function(button) {
        const row = button.closest('tr');
        const index = Array.from(memberTable.children).indexOf(row);
        members.splice(index, 1);
        row.remove();
        updateSummary();
    }

    // Sửa thành viên
    window.editMember = function(button) {
        const row = button.closest('tr');
        const index = Array.from(memberTable.children).indexOf(row);
        const member = members[index];

        // Điền dữ liệu vào form sửa
        document.getElementById('editMemberIndex').value = index;
        document.getElementById('editMemberName').value = member.name;
        document.getElementById('editStudentCode').value = member.student_code;
        document.getElementById('editBirthday').value = member.birthday;
        document.getElementById('editEmail').value = member.email;
        document.getElementById('editNumberPhone').value = member.number_phone;
        document.getElementById('editAddress').value = member.address;
        document.getElementById('editUsername').value = member.username;
        document.getElementById('editPassword').value = member.password;
        document.getElementById('editRole').value = member.role;
        document.getElementById('editStatus').value = member.status;

        // Mở modal sửa
        new bootstrap.Modal(document.getElementById('editMemberModal')).show();
    }

    function updateSummary() {
        const totalMembers = members.length;
        const activeMembers = members.filter(member => member.status === 'Thành viên hiện tại').length;
        const inactiveMembers = totalMembers - activeMembers;

        // Hiển thị thông tin
        document.getElementById('totalMembers').textContent = totalMembers;
        document.getElementById('activeMembers').textContent = activeMembers;
        document.getElementById('inactiveMembers').textContent = inactiveMembers;
    }
});
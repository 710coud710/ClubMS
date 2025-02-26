// Bật chế độ chỉnh sửa tất cả
function enableAllEdit() {
    const fields = ['fullName', 'email', 'phone', 'address', 'description', 'password'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) input.removeAttribute('readonly');
    });
    document.getElementById('editAllButton').innerHTML = '<i class="fa fa-save me-2"></i>Lưu';
    document.getElementById('editAllButton').onclick = saveAllChanges;
}

// Lưu tất cả thay đổi
function saveAllChanges() {
    const fields = ['fullName', 'email', 'phone', 'address', 'description', 'password'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) input.setAttribute('readonly', true);
    });
    document.getElementById('editAllButton').innerHTML = '<i class="fa fa-edit me-2"></i>Sửa';
    document.getElementById('editAllButton').onclick = enableAllEdit;
    alert('Đã lưu tất cả thay đổi');
}

// Hiển thị/ẩn mật khẩu
document.getElementById('showPassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        this.innerHTML = '<i class="fa fa-eye"></i>';
    }
});

// Đổi avatar
document.getElementById('changeAvatar').addEventListener('click', function () {
    document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('avatarImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Gán sự kiện cho nút Sửa
document.getElementById('editAllButton').onclick = enableAllEdit;
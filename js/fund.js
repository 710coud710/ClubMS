document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM cần thiết
    const fundForm = document.getElementById('fundForm');
    const editForm = document.getElementById('editForm');
    const transactionTable = document.getElementById('transactionTable');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpense = document.getElementById('totalExpense');
    const balance = document.getElementById('balance');

    // Danh sách các giao dịch (thêm dữ liệu tạm thời)
    let transactions = [
        {
            date: '2023-10-01',
            type: 'Thu',
            amount: 500000,
            category: 'Lệ phí thành viên',
            description: 'Thành viên Nguyễn Văn A nộp quỹ'
        },
        {
            date: '2023-10-02',
            type: 'Chi',
            amount: 200000,
            category: 'Sự kiện',
            description: 'Mua đồ ăn cho sự kiện'
        },
        {
            date: '2023-10-03',
            type: 'Thu',
            amount: 300000,
            category: 'Quyên góp',
            description: 'Quyên góp từ nhà tài trợ'
        }
    ];

    // Hiển thị dữ liệu tạm thời khi trang được tải
    if (transactionTable) {
        transactions.forEach(transaction => {
            addTransactionToTable(transaction, true); // Thêm vào đầu bảng
        });
        updateSummary();
    }

    // Xử lý khi form thêm giao dịch được submit
    if (fundForm) {
        fundForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const transaction = {
                date: document.getElementById('date').value,
                type: document.getElementById('type').value,
                amount: parseFloat(document.getElementById('amount').value),
                category: document.getElementById('category').value,
                description: document.getElementById('description').value
            };

            // Thêm giao dịch vào danh sách
            transactions.push(transaction);

            // Hiển thị giao dịch trong bảng
            addTransactionToTable(transaction, true); // Thêm vào đầu bảng

            // Cập nhật tổng thu, tổng chi và số dư
            updateSummary();

            // Reset form và đóng modal
            fundForm.reset();
            bootstrap.Modal.getInstance(document.getElementById('addTransactionModal')).hide();
        });
    }

    // Xử lý khi form sửa giao dịch được submit
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const index = document.getElementById('editIndex').value;
            const updatedTransaction = {
                date: document.getElementById('editDate').value,
                type: document.getElementById('editType').value,
                amount: parseFloat(document.getElementById('editAmount').value),
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value
            };

            // Cập nhật giao dịch trong danh sách
            transactions[index] = updatedTransaction;

            // Cập nhật lại bảng
            refreshTransactionTable();

            // Cập nhật tổng thu, tổng chi và số dư
            updateSummary();

            // Reset form và đóng modal
            editForm.reset();
            bootstrap.Modal.getInstance(document.getElementById('editTransactionModal')).hide();
        });
    }

    // Thêm giao dịch vào bảng
    function addTransactionToTable(transaction, addToTop = false) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td class="${transaction.type === 'Thu' ? 'text-success' : 'text-danger'}">
                ${transaction.amount.toLocaleString()} VND
            </td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editTransaction(this)">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTransaction(this)">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        if (transactionTable) {
            if (addToTop && transactionTable.firstChild) {
                // Thêm vào đầu bảng
                transactionTable.insertBefore(row, transactionTable.firstChild);
            } else {
                // Thêm vào cuối bảng
                transactionTable.appendChild(row);
            }
        }
    }

    // Làm mới bảng giao dịch
    function refreshTransactionTable() {
        if (transactionTable) {
            transactionTable.innerHTML = ''; // Xóa toàn bộ nội dung bảng
            transactions.forEach(transaction => {
                addTransactionToTable(transaction);
            });
        }
    }

    // Cập nhật tổng thu, tổng chi và số dư
    function updateSummary() {
        const income = transactions
            .filter(t => t.type === 'Thu')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'Chi')
            .reduce((sum, t) => sum + t.amount, 0);

        if (totalIncome) totalIncome.textContent = `${income.toLocaleString()} VND`;
        if (totalExpense) totalExpense.textContent = `${expense.toLocaleString()} VND`;
        if (balance) balance.textContent = `${(income - expense).toLocaleString()} VND`;
    }

    // Xóa giao dịch
    window.deleteTransaction = function(button) {
        const row = button.closest('tr');
        const index = Array.from(transactionTable.children).indexOf(row);
        transactions.splice(index, 1);
        row.remove();
        updateSummary();
    }

    // Sửa giao dịch
    window.editTransaction = function(button) {
        const row = button.closest('tr');
        const index = Array.from(transactionTable.children).indexOf(row);
        const transaction = transactions[index];

        // Điền dữ liệu vào form sửa
        document.getElementById('editIndex').value = index;
        document.getElementById('editDate').value = transaction.date;
        document.getElementById('editType').value = transaction.type;
        document.getElementById('editAmount').value = transaction.amount;
        document.getElementById('editCategory').value = transaction.category;
        document.getElementById('editDescription').value = transaction.description;

        // Mở modal sửa
        new bootstrap.Modal(document.getElementById('editTransactionModal')).show();
    }
});
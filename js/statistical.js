const ctx = document.getElementById('statisticsChart').getContext('2d');
const statisticsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'],
        datasets: [{
            label: 'Số lượng thành viên',
            data: [30, 35, 32, 47, 39, 36, 42],
            borderColor: '#007bff',
            fill: false
        }, {
            label: 'Số lượng hoạt động',
            data: [11, 13, 12, 18, 13, 16, 20],
            borderColor: '#28a745',
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê CLB'
            }
        }
    }
});
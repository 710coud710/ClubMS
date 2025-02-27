  // Dữ liệu tin nhắn tạm thời
  const groupChatMessages = [
    { sender: "Hứa Mạnh Luân", avatar: "img/user.jpg", message: "Chào mọi người!", time: "10:00 AM" },
    { sender: "Nguyễn Văn A", avatar: "img/user.jpg", message: "Chào chủ nhiệm!", time: "10:05 AM" }
];

const privateChatMessages = {
    1: [
        { sender: "Nguyễn Văn A", avatar: "img/user.jpg", message: "Chào bạn!", time: "10:00 AM" },
        { sender: "You", avatar: "img/user.jpg", message: "Chào bạn!", time: "10:05 AM" }
    ],
    2: [
        { sender: "Nguyễn Văn B", avatar: "img/user.jpg", message: "Bạn khỏe không?", time: "11:00 AM" },
        { sender: "You", avatar: "img/user.jpg", message: "Mình khỏe, cảm ơn!", time: "11:05 AM" }
    ]
};

// Hiển thị tin nhắn trong box chat
function renderMessages(messages) {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = '';

    messages.forEach(msg => {
        const isYou = msg.sender === "You";
        const messageHTML = `
            <div class="d-flex ${isYou ? 'justify-content-end' : 'justify-content-start'} mb-3">
                ${!isYou ? `<img src="${msg.avatar}" class="rounded-circle me-2" alt="Avatar" style="width: 40px; height: 40px;">` : ''}
                <div class="d-flex flex-column ${isYou ? 'align-items-end' : 'align-items-start'}" style="max-width: 70%;">
                    <div class="bg-light rounded p-3 ${isYou ? 'bg-primary text-white' : ''}">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <strong>${msg.sender}</strong>
                            <small class="text-muted ms-2">${msg.time}</small>
                        </div>
                        <p class="mb-0">${msg.message}</p>
                    </div>
                </div>
                ${isYou ? `<img src="${msg.avatar}" class="rounded-circle ms-2" alt="Avatar" style="width: 40px; height: 40px;">` : ''}
            </div>
        `;
        chatBox.innerHTML += messageHTML;
    });

    // Tự động cuộn xuống cuối
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Tải chat chung CLB
function loadGroupChat() {
    document.getElementById("chatTitle").textContent = "Chat chung CLB";
    document.getElementById("chatStatus").textContent = "Online";
    renderMessages(groupChatMessages);
}

// Tải chat cá nhân
function loadPrivateChat(userId) {
    const user = userId === 1 ? "Nguyễn Văn A" : "Nguyễn Văn B";
    document.getElementById("chatTitle").textContent = `Chat với ${user}`;
    document.getElementById("chatStatus").textContent = "Online";
    renderMessages(privateChatMessages[userId]);
}

// Gửi tin nhắn
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    if (message) {
        const newMessage = { sender: "You", avatar: "img/user.jpg", message, time: new Date().toLocaleTimeString() };
        groupChatMessages.push(newMessage); // Thêm vào chat chung (tạm thời)
        renderMessages(groupChatMessages);
        messageInput.value = '';
    }
}

// Hiển thị thông tin cuộc trò chuyện
function showChatInfo() {
    alert("Thông tin cuộc trò chuyện");
}

// Rời khỏi cuộc trò chuyện
function leaveChat() {
    alert("Bạn đã rời khỏi cuộc trò chuyện");
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadGroupChat(); // Mặc định hiển thị chat chung
});
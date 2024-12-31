const textBox = document.getElementById('text-box');

// Văn bản để hiển thị
const text = "Hãy suy nghĩ về câu hỏi! Câu trả lời sẽ sẵn sàng cho bạn";
// Tạo nút sẵn sàng nhận thông điệp
const button = document.createElement('button');
button.innerHTML = 'Nhận thông điệp';
button.onclick = function() {
  textBox.innerHTML = '';
  index = 0;
  typeText();
};
document.body.appendChild(button);
let index = 0;

// Hàm tạo hiệu ứng chữ chạy
function typeText() {
  if (index < text.length) {
    textBox.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 50); // Tốc độ chạy chữ (đổi số nhỏ hơn để nhanh hơn)
  }
}

// Gọi hàm chạy chữ
typeText();
// Hàm để đọc dữ liệu từ thư mục data và lấy ra input bất kỳ
async function fetchRandomMessage() {
  try {
    const response = await fetch('./data/love_message.json'); // Đường dẫn tới file JSON chứa các thông điệp
    const messages = await response.json();
    console.log(messages);
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return "Không thể lấy thông điệp. Vui lòng thử lại sau.";
  }
}


button.onclick = async function() {
  textBox.innerHTML = '';
  index = 0;
  text = await fetchRandomMessage();
  typeText();
};
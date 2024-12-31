// Biến toàn cục
const textBox = document.getElementById('text-box');
let index = 0;

// Hàm tạo hiệu ứng chữ chạy
function typeText(text) {
  if (index < text.length) {
    textBox.innerHTML += text.charAt(index);
    index++;
    setTimeout(() => typeText(text), 50); // Tốc độ chạy chữ
  }
}

// Hàm để đọc dữ liệu JSON từ server
async function loadJSON() {
  return new Promise((resolve, reject) => {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://thanhtinh1997.github.io/AppTarotCard/message/data/love_message.json', true);
    xobj.send();

    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4) {
        if (xobj.status === 200) {
          resolve(JSON.parse(xobj.responseText));
        } else {
          reject(new Error('Failed to load JSON'));
        }
      }
    };
  });
}

// Hàm lấy thông điệp ngẫu nhiên
function getRandomMessage(json) {
  const messages = [...json.love_messages.positive, ...json.love_messages.negative];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex].Message;
}

// Tạo nút "Nhận thông điệp"
const button = document.createElement('button');
button.innerHTML = 'Nhận thông điệp';
button.className = 'action-button';

button.onclick = async function () {
  textBox.innerHTML = '';
  index = 0;

  try {
    const actual_JSON = await loadJSON();
    const text = getRandomMessage(actual_JSON);

    if (text) {
      typeText(text);
    } else {
      textBox.innerHTML = 'Không thể tải thông điệp. Vui lòng thử lại sau.';
    }
  } catch (error) {
    console.error(error);
    textBox.innerHTML = 'Lỗi tải thông điệp!';
  }
};

// Tạo nút "Back to Menu"
const backButton = document.createElement('button');
backButton.innerHTML = 'Back to Menu';
backButton.className = 'action-button';

backButton.onclick = function () {
  location.href = 'menu.html';
};

// Thêm các nút vào container
const buttonContainer = document.querySelector('.button-container');
buttonContainer.appendChild(button);
buttonContainer.appendChild(backButton);

// Gọi hiệu ứng chạy chữ với văn bản mặc định
typeText("Hãy suy nghĩ về câu hỏi ,  Nhấn nút để nhận câu trả lời!");
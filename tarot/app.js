const cardImage = document.getElementById('card-image');
const result = document.getElementById('result');
const predictionText = document.getElementById('prediction');
const adviceText = document.getElementById('advice');
const drawButton = document.getElementById('draw-card');

// Danh sách các lá bài Tarot
const tarotCards = [
  {
    name: "The Fool",
    image: "tarot/fool.jpg",
    prediction: "Khởi đầu mới, cơ hội bất ngờ.",
    advice: "Hãy can đảm và nắm bắt cơ hội."
  },
  {
    name: "The Magician",
    image: "tarot/magician.jpg",
    prediction: "Sức mạnh và sự sáng tạo đang ở đỉnh cao.",
    advice: "Hãy tận dụng kỹ năng của bạn để tạo ra thành công."
  },
  {
    name: "The Lovers",
    image: "tarot/lovers.jpg",
    prediction: "Tình yêu, sự lựa chọn quan trọng.",
    advice: "Hãy lắng nghe trái tim của bạn trước khi quyết định."
  },
  {
    name: "The Tower",
    image: "tarot/tower.jpg",
    prediction: "Thay đổi đột ngột, sự sụp đổ.",
    advice: "Chấp nhận thay đổi để phát triển mạnh mẽ hơn."
  },
  {
    name: "The Sun",
    image: "tarot/sun.jpg",
    prediction: "Niềm vui, hạnh phúc và thành công.",
    advice: "Hãy tận hưởng khoảnh khắc này và tiếp tục tiến bước."
  },
  {
    name: "Death",
    image: "tarot/death.jpg",
    prediction: "Kết thúc một chu kỳ, sự chuyển đổi.",
    advice: "Hãy sẵn sàng từ bỏ cái cũ để đón nhận cái mới."
  }
];

// Hàm rút thẻ
function drawCard() {
  // Thêm hiệu ứng xoay
  cardImage.classList.add('flip');

  // Chờ hiệu ứng xoay hoàn tất (1 giây)
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const card = tarotCards[randomIndex];

    // Hiển thị hình ảnh lá bài
    cardImage.src = card.image;

    // Hiển thị kết quả
    predictionText.textContent = `Dự đoán: ${card.prediction}`;
    adviceText.textContent = `Lời khuyên: ${card.advice}`;
    result.style.display = 'block';

    // Đổi nút thành 'Rút Lại'
    drawButton.textContent = 'Rút Lại';

    // Xóa hiệu ứng xoay để reset cho lần bấm tiếp theo
    setTimeout(() => {
      cardImage.classList.remove('flip');
    }, 1000);
  }, 500); // Đợi 0.5 giây để lật lá bài trước khi hiển thị kết quả
}

// Gắn sự kiện click
drawButton.addEventListener('click', () => {
  if (result.style.display === 'none') {
    drawCard();
  } else {
    // Reset thẻ
    cardImage.classList.add('flip'); // Thêm hiệu ứng lật ngược lại
    setTimeout(() => {
      cardImage.src = 'tarot/card-back.jpg';
      result.style.display = 'none';
      drawButton.textContent = 'Rút Thẻ';

      // Xóa hiệu ứng xoay sau khi lật lại
      setTimeout(() => {
        cardImage.classList.remove('flip');
      }, 1000);
    }, 500); // Delay 0.5 giây để hoàn thành hiệu ứng lật
  }
});

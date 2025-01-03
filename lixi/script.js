// Danh sách phần thưởng với xác suất
const rewards = [
  { amount: 5000, probability: 0.3 },   // 30%
  { amount: 10000, probability: 0.2 }, // 20%
  { amount: 20000, probability: 0.37 },// 20%
  { amount: "Chúc bạn năm mới bình an", probability: 0.01 }, // 1%
  { amount: 50000, probability: 0.05 }, // 5%
  { amount: 100000, probability: 0.04 },// 4%
  { amount: 200000, probability: 0.03 } // 3%
];

// Lấy phần tử DOM
const slider = document.getElementById("lixi-slider");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");
const items = document.querySelectorAll(".lixi-item");
const rewardImage = document.getElementById("reward-image");
const suspenseImage = document.getElementById("suspense-image");

// Bắt đầu chuyển động
slider.classList.add("start-rotate");

// Hàm tính phần thưởng dựa trên xác suất
function getRandomReward() {
  let totalProbability = 0;
  rewards.forEach((item) => {
    totalProbability += item.probability;
  });

  let random = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < rewards.length; i++) {
    cumulativeProbability += rewards[i].probability;
    if (random <= cumulativeProbability) {
      return rewards[i].amount;
    }
  }
}

// Function to create a firework element
function createFirework() {
  const firework = document.createElement('div');
  firework.classList.add('firework');
  firework.style.left = `${Math.random() * 100}vw`;
  firework.style.top = `${Math.random() * 100}vh`;
  document.getElementById('fireworks-container').appendChild(firework);

  // Remove the firework after animation ends
  firework.addEventListener('animationend', () => {
    firework.remove();
  });
}

// Xử lý khi bấm vào từng bao lì xì
items.forEach((item) => {
  item.addEventListener("click", () => {
    // Tắt click để tránh spam
    items.forEach((el) => el.style.pointerEvents = "none");

    // Dừng hiệu ứng xoay
    // slider.classList.remove("start-rotate");
    // slider.classList.add("stop-rotate");

    // Xóa kết quả lần quay trước
    result.innerHTML = "";
    rewardImage.style.backgroundImage = "";

    // Hiển thị hình ảnh hồi hộp
    suspenseImage.style.display = "block";
    suspenseImage.classList.add("show");

    // Xử lý phần thưởng sau một khoảng thời gian
    setTimeout(() => {
      // Ẩn hình ảnh hồi hộp
      suspenseImage.classList.remove("show");
      suspenseImage.style.display = "none";

      // Xử lý phần thưởng
      const reward = getRandomReward();
      result.innerHTML = `Bạn nhận được <strong>${reward.toLocaleString()} VND</strong>! 🎉`;

      // Hiển thị hình ảnh mệnh giá tương ứng
      rewardImage.style.backgroundImage = `url('lixi/img/${reward}.png')`;

      // Tạo hiệu ứng bắn pháo hoa
      for (let i = 0; i < 10; i++) {
        createFirework();
      }

      // Di chuyển slider ra khỏi màn hình
      slider.style.transform = "translateX(-100vw)";
      slider.style.transition = "transform 1s ease-in-out";

      // Làm nổi bật bao lì xì được chọn và đưa về chính giữa
      const itemPosition = item.style.getPropertyValue('--position');
      const rotateAngle = (itemPosition - 1) * (360 / items.length);
      item.style.transform = `rotateY(${-rotateAngle}deg) translateZ(200px) rotateX(360deg)`;
      item.style.transition = "transform 1s ease-in-out";
      item.classList.add("selected");

      // Hiện nút rút lại
      resetBtn.style.display = "inline-block";
    }, 2000); // Thời gian chờ 2 giây để tạo hiệu ứng hồi hộp
  });
});

// Xử lý nút rút lại
resetBtn.addEventListener("click", () => {
  // Reset trạng thái
  resetBtn.style.display = "none";

  items.forEach((item) => {
    item.style.transform = "rotateY(calc( (var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(200px)"; // Đưa về kích thước và vị trí ban đầu
    item.style.pointerEvents = "auto";
    item.classList.remove("selected");
  });

  // Reset hiệu ứng xoay
  slider.classList.remove("stop-rotate");

  // Bắt đầu lại hiệu ứng xoay
  slider.classList.add("start-rotate");
});

// Function to create a flower element
function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = `${Math.random() * 100}vw`;
  flower.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2s and 5s
  flower.style.opacity = Math.random();
  document.getElementById('flower-container').appendChild(flower);

  // Remove the flower after animation ends
  flower.addEventListener('animationend', () => {
    flower.remove();
  });
}

// Create flowers at intervals
setInterval(createFlower, 300);
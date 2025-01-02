// Tự động thêm ngày, tháng, năm vào dropdown
const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

// Thêm ngày (1-31)
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  daySelect.appendChild(option);
}

// Thêm tháng (1-12)
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  monthSelect.appendChild(option);
}

// Thêm năm (1900 - hiện tại)
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  yearSelect.appendChild(option);
}

// Xử lý form submit
document.getElementById("numerologyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const day = parseInt(daySelect.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);

  // Tính số thần học
  const numerologyNumber = calculateNumerologyNumber(day, month, year);

  // Dự đoán
  const prediction = getPrediction(numerologyNumber);

  // Hiển thị kết quả
  document.getElementById("result").innerText = `Số thần học của bạn là: ${numerologyNumber}\n${prediction}`;
});

// Tính toán số thần học
function calculateNumerologyNumber(day, month, year) {
  const digits = `${day}${month}${year}`.split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return sum;
}

// Dự đoán số thần học
function getPrediction(number) {
  const predictions = {
    1: "Bạn là người lãnh đạo, tự tin và quyết đoán.",
    2: "Bạn là người hòa nhã, nhạy cảm và có khả năng ngoại giao.",
    3: "Bạn sáng tạo, năng động và lạc quan.",
    4: "Bạn thực tế, kiên trì và có trách nhiệm.",
    5: "Bạn thích phiêu lưu, tò mò và dễ thích nghi.",
    6: "Bạn là người biết yêu thương, có trách nhiệm và đáng tin cậy.",
    7: "Bạn là người sâu sắc, ham học hỏi và thích khám phá.",
    8: "Bạn có tố chất lãnh đạo và khả năng kiếm tiền tốt.",
    9: "Bạn là người giàu lòng nhân ái và yêu thương cộng đồng.",
    11: "Bạn là người có trực giác mạnh mẽ và sứ mệnh đặc biệt.",
    22: "Bạn là người có tầm nhìn lớn và có khả năng lãnh đạo xuất sắc."
  };
  return predictions[number] || "Không tìm thấy dự đoán.";
}

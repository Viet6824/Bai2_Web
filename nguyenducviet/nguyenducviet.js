const API_URL = "http://localhost:1880/timkiem";

const tableBody = document.getElementById("ketqua");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btnSearch");

// 🔹 Hàm tải toàn bộ dữ liệu nhân viên
async function loadAllEmployees() {
  tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">⏳ Đang tải dữ liệu...</td></tr>`;
  try {
    const response = await fetch(API_URL);
    const employees = await response.json();
    renderTable(employees);
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center;">Lỗi kết nối tới API!</td></tr>`;
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

// 🔹 Hàm hiển thị dữ liệu ra bảng
function renderTable(data) {
  if (!data || data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">⚠️ Không tìm thấy nhân viên nào!</td></tr>`;
    return;
  }

  tableBody.innerHTML = data.map(nv => `
    <tr>
      <td>${nv.id}</td>
      <td>${nv.ten}</td>
      <td>${nv.gioitinh}</td>
      <td>${nv.sdt}</td>
      <td>${nv.gmail}</td>
    </tr>
  `).join('');
}

// 🔹 Hàm tìm kiếm nhân viên
async function searchEmployee() {
  const keyword = searchInput.value.trim().toLowerCase();

  try {
    const response = await fetch(API_URL);
    const employees = await response.json();

    // Lọc theo tên hoặc ID
    const filtered = employees.filter(nv =>
      nv.ten.toLowerCase().includes(keyword) ||
      nv.id.toString().includes(keyword)
    );

    renderTable(filtered);
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center;">Lỗi khi tìm kiếm!</td></tr>`;
    console.error("Lỗi tìm kiếm:", error);
  }
}

// 🔹 Tìm kiếm khi nhấn nút
searchBtn.addEventListener("click", searchEmployee);

// 🔹 Tìm kiếm live (khi gõ)
searchInput.addEventListener("input", () => {
  clearTimeout(window._typingTimer);
  window._typingTimer = setTimeout(searchEmployee, 500);
});

// 🔹 Tải toàn bộ nhân viên khi mở trang
window.addEventListener("load", loadAllEmployees);

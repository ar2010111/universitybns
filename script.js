const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const successSound = document.getElementById('successSound');
const scriptUrl = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT/exec";

let headers = [];

async function fetchHeaders() {
  try {
    const res = await fetch(`${scriptUrl}?headers=true`);
    const data = await res.json();
    headers = data;
  } catch (err) {
    console.error("Error fetching headers:", err);
  }
}

fetchHeaders();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = "<div class='loader'></div>";

  try {
    const res = await fetch(`${scriptUrl}?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>😢 لا توجد نتائج.</p>";
      return;
    }

    let html = "";
    data.forEach(row => {
      html += `<div class="card">`;
      for (let i = 0; i < row.length; i++) {
        html += `<p><strong>${headers[i] || "غير معروف"}:</strong> ${row[i]}</p>`;
      }
      html += `</div>`;
    });

    resultsDiv.innerHTML = html;
    successSound.play();

  } catch (err) {
    resultsDiv.innerHTML = "<p style='color:red;'>❌ خطأ في جلب النتائج.</p>";
  }
});

function search() {
  const id = document.getElementById("national-id").value;
  if (id.trim() === "") {
    alert("يرجى إدخال الرقم القومي");
  } else {
    alert("جاري البحث عن الرقم: " + id);
    // يمكنك ربط هذا الزر بقاعدة بيانات أو API لاحقًا
  }
}

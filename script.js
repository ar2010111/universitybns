function search() {
  const id = document.getElementById("national-id").value;
  if (id.trim() === "") {
    alert("يرجى إدخال الرقم القومي");
    return;
  }

  fetch(`https://script.google.com/macros/s/AKfycbxxkUg2qg8P3xO7rQJGOaJyaIMggznDCRuvNaaqJejW5xeUcSpnv3UofJkFzfkiS9z3/exec?id=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "found") {
        alert(`تم العثور على الخريج:\nالاسم: ${data.name}\nالدرجة: ${data.degree}\nسنة التخرج: ${data.year}`);
      } else {
        alert("لم يتم العثور على الخريج.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال.");
    });
}

function callBackend(e) {
  let text = e.value;
  fetch(`http://10.25.102.196:81/search?text=${text}`, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => console.log("Success", data))
    .catch((err) => console.log("Error", err));
}

function search() {
  console.log("Sup");
  let obj = document.getElementById("searchBar");
  obj.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("Entered");
      callBackend(e);
    }
  });
}

function searchButton() {
  console.log("Search Button Clicked");
  textObj = document.getElementById("searchBar");
  callBackend(textObj);
}

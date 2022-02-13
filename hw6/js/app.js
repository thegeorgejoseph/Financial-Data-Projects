function callBackend(e) {
  let text = e.value;
  fetch(`http://10.25.102.196:81/search?text=${text}`, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => createCompanyHTML(data))
    .catch((err) => console.log("Error", err));
}

function createCompanyHTML(data) {
  profile = data["Profile"];
  logo = profile["logo"];
  let companyProfile = document.getElementsByClassName("company-profile")[0];
  html = `<img src=${logo}>`;
  tableEntries = ``;
  console.log(profile);
  for (let [key, value] in profile) {
    console.log(key);
    tableEntries += `<tr><th>${key}</th><th>${value}</th></tr>`;
  }
  html += `<table>` + tableEntries + `</table>`;
  companyProfile.innerHTML = html;
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
let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login";

let submit = document.getElementById("Submit");
let userName = document.getElementById("userName");
let password = document.getElementById("Password");

if (localStorage.getItem("loginStatus") === "true") {
  window.location = "./orders.html";
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (userName.value === password.value) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: userName.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Login Successful!");
        localStorage.setItem("loginStatus", true);
        window.location = "./orders.html";
      });
  } else {
    alert("Please enter valid credentials!");
  }
});

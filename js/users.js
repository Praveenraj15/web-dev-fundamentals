$(document).ready(function () {
  if (
    localStorage.getItem("loginStatus") == null ||
    localStorage.getItem("loginStatus") === "false"
  ) {
    alert("Please login first");
    window.location = "./index.html";
  }

  const getUserData = () => {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        usersDisplay(data);
      })
      .catch((err) => console.log(err));
  };

  getUserData();

  const usersDisplay = (data) => {
    let usersDetails = "";
    for (let i = 0; i < data.length; i++) {
      usersDetails += `<tr>
    <td class="id">${data[i].id}</td>
    <td><img src="${data[i].profilePic}" /></td>
    <td class="dark_text">${data[i].fullName}</td>
    <td class="grey_text">${data[i].dob}</td>
    <td class="dark_text">${data[i].gender}</td>
    <td class="dark_text">${data[i].currentCity}, ${data[i].currentCountry}</td>
</tr>`;
    }

    $("#ordersBody").html(usersDetails);
  };

  const noResult = () => {
    let noResultText = `<p class="noResult">No Result Found</p>`;
    $("#ordersBody").html(noResultText);
  };

  $(".search_submit").click(function (e) {
    e.preventDefault();
    let searchText = $(".user_search_filed").val().toLowerCase();
    if (searchText.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    } else {
      fetch(
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
          searchText
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            usersDisplay(data);
          } else {
            noResult();
          }
        })
        .catch((err) => console.log(err));
    }
  });

  $(".search_reset").click(function (e) {
    e.preventDefault();
    $(".user_search_filed").val("");
    getUserData();
  });

  $("#logout").click(function () {
    localStorage.setItem("loginStatus", false);
    window.location = "./index.html";
  });
});

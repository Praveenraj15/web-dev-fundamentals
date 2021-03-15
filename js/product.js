$(document).ready(function () {
  let productList = [];

  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      productDisplay(productList);
    })
    .catch((err) => console.log(err));

  const productDisplay = (data) => {
    let productDetails = "";
    for (let i = 0; i < data.length; i++) {
      productDetails += `<tr>
    <td class="id">${data[i].id}</td>
    <td class="name">${data[i].medicineName}</td>
    <td class="brand">${data[i].medicineBrand}
    </td>
    <td class="eDate">${data[i].expiryDate}</td>
    <td class="price">$${data[i].unitPrice}</td>
    <td class="price">${data[i].stock}</td>
</tr>`;
    }

    $("#productBody").html(productDetails);
  };

  function filterData() {
    let count = 0;
    let productDetails = "";
    const presentDate = new Date();
    if (productList.length > 0) {
      for (let i = 0; i < productList.length; i++) {
        if (
          !$("#expiredCheck").is(":checked") &&
          new Date(productList[i].expiryDate) < presentDate
        ) {
          continue;
        } else if (
          !$("#lstockCheck").is(":checked") &&
          productList[i].stock < 100
        ) {
          continue;
        } else {
          count++;
          productDetails += `<tr>
          <td class="id">${productList[i].id}</td>
          <td class="name">${productList[i].medicineName}</td>
          <td class="brand">${productList[i].medicineBrand}
          </td>
          <td class="eDate">${productList[i].expiryDate}</td>
          <td class="price">$${productList[i].unitPrice}</td>
          <td class="price">${productList[i].stock}</td>
      </tr>`;
        }
      }
    }
    $(".ordersCount").html(count);
    $("#productBody").html(productDetails);
  }

  $(".filer_checkbox").on("change", function () {
    filterData();
  });
});

$(document).ready(function () {
  let orderList = [];

  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
    .then((response) => response.json())
    .then((data) => {
      orderList = data;
      productDisplay(orderList);
    })
    .catch((err) => console.log(err));

  const productDisplay = (data) => {
    let ordersDetails = "";
    for (let i = 0; i < data.length; i++) {
      ordersDetails += `<tr>
    <td class="id">${data[i].id}</td>
    <td class="customer">${data[i].customerName}</td>
    <td class="date">${data[i].orderDate}<br>
        <span class="time">${data[i].orderTime}</span>
    </td>
    <td class="amount">$${data[i].amount}</td>
    <td class="status">${data[i].orderStatus}</td>
</tr>`;
    }

    $("#ordersBody").html(ordersDetails);
  };

  $(".filter_check").click(function () {
    let filterArr = $(".filter_check:checked")
      .map(function () {
        return this.value;
      })
      .get();
    getClickedArr(filterArr);
  });

  const getClickedArr = (data) => {
    let newOderList = [];
    if (orderList.length > 0) {
      for (let i = 0; i < data.length; i++) {
        orderList.filter((item) => {
          if (item.orderStatus == data[i]) {
            newOderList.push(item);
          }
        });
      }
    }
    $(".ordersCount").html(newOderList.length);
    productDisplay(newOderList);
  };
});

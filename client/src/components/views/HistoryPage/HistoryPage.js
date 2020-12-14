import React from "react";

//이미 리덕스에 히스토리 페이지가 있어 props를 리덕스 통해 가져와 바로 활용한다!
function HistoryPage(props) {
  console.log(props);
  return (
    <div style={{ width: "80%", margin: "3rem auto", marginTop: "-1%" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price} USD</td>
                <td>{item.quantity}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;

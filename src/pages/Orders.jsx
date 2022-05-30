import { useEffect, useState } from "react";

function Orders() {
    const baseUrl = "https://annjakubel-java-webshop.herokuapp.com/";
    const [orders, setOrders] = useState([]);

    const authData = JSON.parse(sessionStorage.getItem("authData"));
    const expiration = new Date(authData.expiration);
    let token;
    if (expiration > new Date()) {
        token = authData.token;
    } else {
      sessionStorage.deleteItem();
    }

    useEffect(()=>{ 
        fetch(baseUrl + "/orders", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()) 
        .then(body => setOrders(body));
      },[token]); 

    return (<div>
    { orders.map(element => 
          <div>
            <div>Tellimuse number: {element.id}</div>
            <div>Summa: {element.orderSum} €</div>
            <div>Tegemise aeg: {element.creationDate} €</div>
            <div>{element.products.map(product => 
                <div>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </div>)}</div>
          </div>) } 
    </div>)
}

export default Orders;
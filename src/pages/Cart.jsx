import { useState } from "react";

function Cart() {
    const [cartProducts, setCartProducts] = useState(getCartProducts());

    function getCartProducts() {
        if (localStorage.getItem("cartProducts")) {
            return JSON.parse(localStorage.getItem("cartProducts"));

        } else {
            return [];
        }
    }

    function deleteFromCart(product) {
        const index = cartProducts.indexOf(product);
        cartProducts.splice(index,1);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        setCartProducts(cartProducts.slice());
    }

    function calculateSumOfCart() {
        let sumOfCart = 0;
        cartProducts.forEach(element => sumOfCart += Number(element.price))
        return sumOfCart;
    }

    function onPay() {
        fetch("http://localhost:8080/payment", {
            method: "POST",
            body: JSON.stringify(cartProducts),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ3ZWJzaG9wIiwic3ViIjoibUBtLmNvbSIsImV4cCI6MTY1MjI2ODUxOH0.NcItS2zK0ZpPVevVTAsimRPTFR3RLyiM8-Sjk8E2IKp_fYGW6FxBgvgqFtKS8VC9E850clXIN2zEdVIT83n-Tg"
            }
        }).then(res => res.json())
        .then(body => window.location.href = body.url);
    }

    return (<div>{cartProducts.map((element, index) => 
        <div>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <button onClick={() => deleteFromCart(index)}>X</button>
        </div>
        )}
          <div>Kokku: {calculateSumOfCart() } €</div>
          <button onClick={onPay}>Maksma</button>
        </div>)
    
}

export default Cart;
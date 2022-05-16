import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function AddProduct() {
    const nameRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const descriptionRef = useRef();
    const stockRef = useRef();
    const activeRef = useRef();
    const navigation = useNavigate();

    function addNewProduct() {
        const newProduct = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            imgSrc: imgSrcRef.current.value,
            description: descriptionRef.current.value,
            stock: stockRef.current.value,
            active: activeRef.current.checked,
          }

          const authData = JSON.parse(sessionStorage.getItem("authData"));
          const expiration = new Date(authData.expiration);
          let token;
          if (expiration > new Date()) {
              token = authData.token;
          } else {
              sessionStorage.deleteItem();
          }

          fetch("http://localhost:8080/products",
            {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

        ).then(() => navigation(""));
    }

    return (
        <div>
            <Link to="/admin">
                <Button>Tagasi</Button>
            </Link>
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text"/> <br />
            <label>Hind</label> <br />
            <input ref={priceRef} type="number"/> <br />
            <label>Pildi aadresss</label> <br />
            <input ref={imgSrcRef} type="text"/> <br />
            <label>Kirjeldus</label> <br />
            <input ref={descriptionRef} type="text"/> <br />
            <label>Laoseis</label> <br />
            <input ref={stockRef} type="number"/> <br />
            <label>Aktiivne</label> <br />
            <input ref={activeRef} type="checkbox"/> <br />
            <Button onClick={addNewProduct} variant="success">Sisesta uus toode</Button>
        </div>
    );
}

export default AddProduct;
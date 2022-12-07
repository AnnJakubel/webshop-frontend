import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function AddAdmin() {
    const personCodeRef = useRef();
    
    const navigation = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isAllOk, setAllOk] = useState(false);
    const [person, setPerson] = useState({});
  
    const authData = JSON.parse(sessionStorage.getItem("authData"));
      const expiration = new Date(authData.expiration);
      let token;
      if (expiration > new Date()) {
        token = authData.token;
      } else {
        sessionStorage.removeItem("authData");
    }


    function findPerson() {
        fetch("http://localhost:8080/person/" + personCodeRef.current.value,{
        headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(res => res.json())
        .then(body => setPerson(body));
    }

    function changeToAdmin() {
        fetch("http://localhost:8080/add-admin/" + personCodeRef.current.value,{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      }  
    
      function changeToSuperAdmin() {
        fetch("http://localhost:8080/add-super-admin/" + personCodeRef.current.value,{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
    }  

    function checkIfAllOk() {
        // if (personCodeRef.current.value !== "") {
          setAllOk(personCodeRef.current.value !== "");
        // } else {
        //   setAllOk(false);
        // }
    }


    return (
        <div>
          <Link to="/admin">
            <Button>Tagasi</Button>
          </Link>   <br />
          <div>{errorMessage}</div>
          <label>Isikukood*</label> <br />
          <input onChange={checkIfAllOk} ref={personCodeRef} type="number" /> <br />
          <Button disabled={!isAllOk} onClick={findPerson} variant="success">Otsi kasutaja üles</Button>
          {
            person && 
            <div>
            <div>Nimi: {person.firstName + person.lastName}</div>
            <div>Nimi: {person.email}</div>
            <button onClick={changeToAdmin}>Muuda administraatoriks</button>
            <button onClick={changeToSuperAdmin}>Muuda superadministraatoriks</button>
            </div>
          }
          {
            person && !person.email &&
            <div>Kasutajat ei leitud, kontrolli isikukoodi</div>
          }
        </div>)
    }
    
    export default AddAdmin;
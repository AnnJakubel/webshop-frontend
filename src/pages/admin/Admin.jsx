import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Admin() {
    return (
        <div>
            <Link to="/admin/lisa-toode">
                <Button>Lisa toode</Button>
            </Link>

             <Link to="/admin/halda-tooteid">
                <Button>Halda tooteid</Button>
            </Link>

            <Link to="/admin/lisa-admin">
                <Button>Lisa administraator</Button>
            </Link>

             <Link to="/admin/halda-admine">
                <Button>Halda administraatoreid</Button>
            </Link>
        </div>
    )
}

export default Admin;
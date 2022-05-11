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
        </div>
    )
}

export default Admin;

import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="empty-cart">
            <p className="empty-cart-text">404 PAGE NOT FOUND</p>
            <Link to={'/'}><Button color="primary">Back to Home!</Button>
            </Link>
        </div>
    )
}

export default PageNotFound;

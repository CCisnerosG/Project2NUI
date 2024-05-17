import { Link } from "react-router-dom"
import './admin.scss';

const AdminSelect = () => {
    return (
        <>
            <div className="admi">
                <Link to="/AdminProducts"><button className="admi__btn">Product Management</button></Link>
                <Link to="/AdminOrders"><button className="admi__btn">Order Management</button></Link>
            </div>
        </>
    )
}

export default AdminSelect;
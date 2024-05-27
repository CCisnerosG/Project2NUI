import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import './admin.scss';
import { useEffect, useState } from "react";
import axios from "axios";


const AdminSelect = () => {
    const [items, setItems] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/pokemon')
            .then(response => {
                setItems(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/order', {
            headers:
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setOrders(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    });

    return (
        <>
            <div className="admi">
                <Card className="py-4 admi__card">
                    <Link to="/AdminProducts" className="admi__link">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                            <h4 className="font-bold text-large">Product Management</h4>
                            <small className="text-default-500">{items} current pokémons in stock</small>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2 admi__card-img">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://dotesports.com/wp-content/uploads/2022/08/05131231/Pokemon-Jigsaw-puzzle.jpeg"
                            />
                        </CardBody>
                    </Link>
                </Card>

                <Card className="py-4 admi__card">
                    <Link to="/AdminOrders" className="admi__link">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                            <h4 className="font-bold text-large">Order Management</h4>
                            <small className="text-default-500">{orders} total orders</small>

                        </CardHeader>
                        <CardBody className="overflow-visible py-2 admi__card-img">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://cdn.dribbble.com/users/6245075/screenshots/16269935/pokeball.png"

                            />
                        </CardBody>
                    </Link>
                </Card>

            </div >
        </>
    )
}

export default AdminSelect;
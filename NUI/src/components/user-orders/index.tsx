
import { Accordion, AccordionItem, Avatar, Button, Divider, Slider } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import './userorder.scss'
import { Link } from "react-router-dom";

interface State {
    id: number;
    name: string;
}

interface User {
    fullName: string;
    address: string;
    email: string;
}

interface Product {
    icon_sprite: string;
    name: string;
    id: number;
    quantity: number;
}

interface Order {
    id: string;
    orderDate: string;
    total: number;
    paymentMethod: string;
    user: User;
    formattedDate?: string;
    fullName: string;
    address: string;
    email: string;
    state: State;
    products: Product[];
}


const UserOrderPanel: React.FC = () => {
    const [data, setData] = useState<Order[]>([]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/order/user/with-products', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setData(response.data)
                console.log(response.data);
                setData(response.data.map((order: Order) => ({
                    ...order,
                    formattedDate: format(parseISO(order.orderDate), 'MMM / dd / yyyy')
                })));
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, []);


    if (data.length === 0) {
        return (
            <div className="empty-cart">
                <p className="empty-cart-text">There are no orders to see...yet!</p>
                <Link to={'/PokemonList'}><Button color="primary">Back to Shopping!</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="order">
            <div className="order__container">
                <section className="order__section-title">
                    <p className="title">ORDER HISTORY</p>
                </section>
                {/* Envio */}
                <section className="order__section">
                    {data && data.map((item: Order) => (
                        <div key={item.id}>
                            <Accordion>
                                <AccordionItem
                                    aria-label="Accordion item"
                                    subtitle={'Press for details'}
                                    title={`Order no: ${item.id}`}
                                    startContent={
                                        <div className="flex justify-between w-[100%]">
                                            <div>
                                                <Avatar
                                                    isBordered
                                                    color="primary"
                                                    radius="lg"
                                                    src="pokeball-hero.svg"
                                                />
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="order__panel">
                                        <div className="order__panel-left">
                                            <p className="order__panel-left-title">Your Selected Pokemons</p>
                                            <div className="order__panel-left-icons">
                                                {item.products && item.products.map((pokemon) => (
                                                    <div className="order__panel-left-icons-cntr" key={pokemon.id}>
                                                        <img className="order__panel-left-img" src={pokemon.pokemon.icon_sprite} alt={`${pokemon.pokemon.name} icon`} />
                                                        <p className="order__panel-left-quantity">x {pokemon.quantity}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="order__panel-right">
                                            <div className="order__panel-right-section-one">
                                                <div className="order__panel-right-title">
                                                    <p>{item.user.fullName}</p>
                                                </div>
                                                <div className="order__panel-right-subtitle">
                                                    <p>Order details</p>
                                                </div>
                                                <div className="order__panel-right-userinfo">
                                                    <div className="order__panel-right-userinfo-item">
                                                        <img src="location.svg" alt="Location Icon" className="mr-3" />
                                                        <p>{item.address}</p>
                                                    </div>
                                                    <div className="order__panel-right-userinfo-item">
                                                        <img src="mail.svg" alt="Mail icon" className="mr-3" />
                                                        <p>{item.user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="order__panel-right-section-two">
                                                <div className="order__panel-right-orderinfo">
                                                    <div className="order__panel-right-orderinfo-item">
                                                        <p className="order__panel-right-orderinfo-text">Total</p>
                                                        <p className="order__panel-right-orderinfo-value">${item.total}</p>
                                                    </div>
                                                    <div className="order__panel-right-orderinfo-item">
                                                        <p className="order__panel-right-orderinfo-text">Order Date</p>
                                                        <p className="order__panel-right-orderinfo-value">{item.formattedDate}</p>
                                                    </div>
                                                    <div className="order__panel-right-orderinfo-item">
                                                        <p className="order__panel-right-orderinfo-text">Payment</p>
                                                        <p className="order__panel-right-orderinfo-value">{item.paymentMethod}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="order__panel-right-section-three">
                                                <div className="order__panel-right-section-three-title">
                                                    <div className="order__panel-right-title">
                                                        <p>Order Status</p>
                                                    </div>
                                                    <div className="order__panel-right-subtitle">
                                                        <p>Here you can update the status of an order</p>
                                                    </div>
                                                </div>
                                                <div className="order__panel-right-section-three-slider">

                                                    {item.state.id === 1 && (
                                                        <Slider
                                                            aria-label="Slider"
                                                            size="sm"
                                                            step={1}
                                                            showSteps={true}
                                                            maxValue={3}
                                                            minValue={1}
                                                            defaultValue={item.state.id}
                                                            onChange={value => handleChange(value, item.id)}
                                                            className="max-w-md mt-5"
                                                            color="primary"
                                                            marks={[
                                                                { value: 3, label: "CANCELLED" },
                                                                { value: 2, label: "CONFIRMED" },
                                                                { value: 1, label: "PENDING" },
                                                            ]}
                                                        />
                                                    )}
                                                    {item.state.id === 2 && (
                                                        <Slider
                                                            aria-label="Slider"
                                                            size="sm"
                                                            step={1}
                                                            showSteps={true}
                                                            maxValue={3}
                                                            minValue={1}
                                                            defaultValue={item.state.id}
                                                            onChange={value => handleChange(value, item.id)}
                                                            className="max-w-md mt-5"
                                                            color="success"
                                                            marks={[
                                                                { value: 3, label: "CANCELLED" },
                                                                { value: 2, label: "CONFIRMED" },
                                                                { value: 1, label: "PENDING" },
                                                            ]}
                                                        />
                                                    )}
                                                    {item.state.id === 3 && (
                                                        <Slider
                                                            aria-label="Slider"
                                                            size="sm"
                                                            step={1}
                                                            showSteps={true}
                                                            maxValue={3}
                                                            minValue={1}
                                                            defaultValue={item.state.id}
                                                            onChange={value => handleChange(value, item.id)}
                                                            className="max-w-md mt-5"
                                                            color="danger"
                                                            marks={[
                                                                { value: 3, label: "CANCELLED" },
                                                                { value: 2, label: "CONFIRMED" },
                                                                { value: 1, label: "PENDING" },
                                                            ]}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                            <Divider />
                        </div>
                    ))}
                </section>
            </div >
        </div >
    )
}
export default UserOrderPanel;
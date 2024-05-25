
import { Accordion, AccordionItem, Avatar, Divider, Slider } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import './adminorder.scss'

interface State {
    id: number;
    name: string;
}

interface User {
    fullName: string;
    address: string;
    email: string;
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
    state: State
}


const AdminOrderPanel: React.FC = () => {
    const [data, setData] = useState([]);
    // const [formattedDate, setFormattedDate] = useState('');
    const [selectedValue, setSelectedValue] = useState<number | number[]>(1);


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/order', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setData(response.data)
                // setData(response.data.map((order: Order) => ({
                //     ...order,
                //     formattedDate: format(parseISO(order.orderDate), 'MMM / dd / yy')
                // })));
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, [data]);

    const handleChange = (value: number | number[], orderId: string) => {
        setSelectedValue(value);
        if (selectedValue) {
            axios.put(`http://localhost:8080/api/v1/order/new-state?orderId=${orderId}&stateId=${value}`, {}, {
                headers:
                    { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    const orders = response.data.map((order: Order) => {
                        const isoDate = order.orderDate;
                        const date = parseISO(isoDate);
                        const formattedDate = format(date, 'MMM / dd / yy');
                        return { ...order, formattedDate };
                    });
                    setData(orders);
                })
                .catch(error => {
                    console.error('Error fetching the data:', error);
                });
        }
    };

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
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png" alt="Bulba" />
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
                                                    <div className="flex">
                                                        <img src="location.svg" alt="Location Icon" className="mr-3" />
                                                        <p>{item.address}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <img src="mail.svg" alt="Mail icon" className="mr-3" />
                                                        <p>{item.user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="order__panel-right-section-two">
                                                <div className="order__panel-right-orderinfo">
                                                    <p>Total: ${item.total}</p>
                                                    <p>Order Date: {item.formattedDate}</p>
                                                    <p>Payment Method: {item.paymentMethod}</p>
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
            </div>
        </div >
    )
}
export default AdminOrderPanel;
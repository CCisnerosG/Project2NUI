import { useEffect, useState } from "react";
import './shopping.scss'
import { Divider } from "@nextui-org/divider";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import axios from "axios";

const Cart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        axios.get(`http://localhost:8080/api/v1/shoppingCart/products?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const updateCart = (updatedCart) => {
        setData(updatedCart);
    };

    const addQuantity = (itemId: number) => {
        const updatedCart = data.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        updateCart(updatedCart);
    };

    const subtractQuantity = (itemId : number) => {
        const updatedCart = data.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        updateCart(updatedCart);
    };

    const deleteItem = (itemId: number) => {
        const updatedCart = data.filter(item => item.id !== itemId);
        updateCart(updatedCart);
    };


    if (data.length === 0) {
        return (
            <div className="empty-cart">
                <p className="empty-cart-text">Your cart is empty</p>
                <Link to={'/PokemonList'}><Button color="primary">Back to Shopping!</Button>
                </Link>
            </div>
        );
    }

    const totalAmount = data.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="bar-container">
            <Divider />
            <div className="shopping__header">
                <div className="shopping__title">
                    <div className="shopping__img-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Pokeball" />
                    </div>
                    <Divider orientation="vertical" className="h-10" />
                    <div className="shopping__text-container">
                        <p className="shopping__text">Your cart</p>
                    </div>
                </div>
                <div className="shopping__topkmlist">
                    <Link to='/PokemonList'>
                        <p className="shopping__topkmlist-text">Continue Shopping</p>
                    </Link>
                </div>
            </div>
            <Divider />
            <div className="table-sidebar">
                <div className="mytable">
                    <table className="shopping">
                        <tbody>
                            {data && data.map((item) => (
                                <tr className="item__container" key={item.pokemon.id}>
                                    <td className='item__image-container'>
                                        <img className='item__image' src={item.pokemon.sprite} alt={`${item.pokemon.name} image`} />
                                    </td>
                                    <td className="item__info">
                                        <div className="item__name-container">
                                            <p className='item__name'>{item.pokemon.name}</p>
                                        </div>
                                    </td>
                                    <td className="item__info">
                                        <div className="item__quantity">
                                            <span className="item__quantity-number">{item.quantity}</span>
                                            <div className="item__quantity-buttons">
                                                <button className="btn-cart" onClick={() => addQuantity(item.id)}>+</button>
                                                <button className="btn-cart" onClick={() => subtractQuantity(item.id)}>-</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="item__info">
                                        <div className="item__price-container">
                                            <p className='item__price'>${(item.pokemon.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td className="item__trash">
                                        <button onClick={() => deleteItem(item.pokemon.id)}><img className='item__trash-icon' src="/trash.svg" alt="Delete icon" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sidebar">
                    <div className="sidebar__info">
                        <p className="sidebar__title">
                            YOUR TOTAL:
                        </p>
                        <p className="sidebar__total">
                            ${totalAmount.toFixed(2)}
                        </p>
                    </div>

                    <div className="sidebar__button">
                        <Link to='/Checkout' className="sidebar__btn-tocheckout">
                            <button className="sidebar__btn-tocheckout">CHECKOUT</button>
                        </Link>
                    </div>
                </div>

            </div>
            <Divider />
        </div>
    );
};

export default Cart;
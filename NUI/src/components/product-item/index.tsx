import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './item.scss';
import { Button } from "@nextui-org/react";

const PokeItem = ({ item }) => {
    const [cart, setCart] = useState([]);


    // useEffect(() => {
    //     if (cart.length > 0) {
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         console.log(cart)
    //     }
    // }, [cart]);

    const addToCart = () => {
        const index = cart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart[index].quantity += 1;
            setCart(updatedCart);
            console.log("Este es el if")
        } else {
            const updatedItem = { ...item, quantity: 1 };
            console.log(cart)
            setCart([...cart, updatedItem])
            console.log("Este es el else")
        }
    };

    return (
        <>
            <div className="pkm">
                <Link to={`/ProductDetails/${item.id}`}>
                    <div className="pkm__img-container">
                        <img className="pkm__img" src={item.sprite} alt={`Pokemon ${item.name}`} />
                    </div>
                    <div className="pkm__details">
                        <div className="pkm__head">
                            <p className="pkm__total">${item.price}</p>
                            <p className="pkm__head-title">{item.name}</p>
                            <p className="pkm__head-number">Pokemon No. {item.id}</p>
                        </div>
                        <div className="pkm__content">
                            <div className="pkm__content-info">
                                <div className="pkm__content-types">
                                    <p><b>TYPE:</b> {item.type}</p>
                                </div>
                                <p className="pkm__content-height"><b>HEIGHT:</b> {item.height} inch</p>
                                <p className="pkm__content-weight"><b>WEIGHT:</b> {item.weight} lbs</p>
                            </div>
                            <div className="pkm__pricing">
                                <p className="pkm__subtotal">Sub-total: ${item.subtotal}</p>
                                <p className="pkm__taxes">Taxes: ${item.taxes}</p>
                                <p className="pkm__save">Save: ${item.save}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="mybtn__container">
                    <Button className="mybtn" color="success" onClick={addToCart}>Add to Cart</Button>
                </div>
            </div>
        </>
    );
};

export default PokeItem;

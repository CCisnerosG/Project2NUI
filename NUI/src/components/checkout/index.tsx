import React, { useEffect, useState } from "react";
import './checkout.scss'
import { Divider } from "@nextui-org/divider";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import ModalNUI from "../modal";

const Checkout = () => {
    const [data, setData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setData(storedCart);
        }
    }, []);


    const completePurchase = () => {
        localStorage.removeItem('cart');
    }

    const subtotalAmount = data.reduce((subtotal, item) => subtotal + (item.subtotal * item.quantity), 0);
    const taxesAmount = data.reduce((taxes, item) => taxes + (item.taxes * item.quantity), 0);
    const saveAmount = data.reduce((save, item) => save + (item.save * item.quantity), 0);
    const totalAmount = ((subtotalAmount + taxesAmount) - saveAmount);



    return (
        <div className="checkout">
            {/* Resumen */}
            <div className="checkout__summary">
                <p className="checkout__title">Order Summary</p>
                <div className="checkout__table-container">
                    <table className="checkout__table">
                        <tbody>
                            {data && data.map((item) => (
                                <tr className="checkout__item-container" key={item.id}>
                                    <td className="checkout__info-quantity">
                                        <div className="checkout__quantity">x{item.quantity}</div>
                                    </td>
                                    <td className="checkout__info-name">
                                        <div className='checkout__name'>{item.name}</div>
                                    </td>
                                    <td className="checkout__info-price">
                                        <div className="checkout__info-price">${(item.subtotal * item.quantity).toFixed(2)}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Divider className="checkout__divider" />
                <div className="checkout__shipping">
                    <div className="checkout__shipping-info">
                        <p className="checkout__shipping-name">Shipping</p>
                        <p className='checkout__shipping-amount'>$0</p>
                    </div>
                    <div className="checkout__shipping-info">
                        <p className="checkout__shipping-discount-text">Discount</p>
                        <p className='checkout__shipping-discount-amount'>$0</p>
                    </div>
                </div>
                <Divider className="checkout__divider" />
                <div className="checkout__shipping">
                    <div className="checkout__shipping-info">
                        <p className="checkout__shipping-name">Sub-total</p>
                        <p className='checkout__shipping-amount'>${subtotalAmount}</p>
                    </div>
                    <div className="checkout__shipping-info">
                        <p className="checkout__shipping-discount-text">Taxes</p>
                        <p className='checkout__shipping-discount-amount'>${taxesAmount}</p>
                    </div>
                    <div className="checkout__shipping-info">
                        <p className="checkout__shipping-discount-text">Savings</p>
                        <p className='checkout__shipping-discount-amount'>- ${saveAmount}</p>
                    </div>
                </div>
                <Divider className="checkout__divider" />
                <div className="checkout__total">
                    <p className="checkout__total-text">Order Total</p>
                    <p className="checkout__total-amount">${totalAmount.toFixed(2)}</p>
                </div>
            </div>

            <div className="checkout__forms">
                <p className="forms__title">YOU'RE ALMOST THERE!</p>
                {/* Envio */}
                <div className="forms__header">
                    <div className="forms__header-number"><p>1</p>
                    </div>
                    <p className="forms__header-text"> PERSONAL INFORMATION</p>
                </div>

                <div className="forms__shipping-form">
                    <div className="forms__name-lastname">
                        <Input isRequired type="text" label="Full Name" className="forms__myinput" />
                        <Input isRequired type="email" label="Email" className="forms__myinput" />
                    </div>

                    <div className="forms__country-phone">
                        <div className="forms__select">
                            <span className="forms__select-flag" aria-hidden="true"></span>
                            <label htmlFor="country-selector" className="forms__label">Select Country</label>
                            <select className="forms__select-input" name="country-selector" id="country-selector" aria-labelledby="country-selector-label">
                                <option className="forms__select-input" value="0">Select Country</option>
                                <option className="forms__select-input" value="US">United States</option>
                                <option className="forms__select-input" value="MX">Mexico</option>
                                <option className="forms__select-input" value="CR">Costa Rica</option>
                            </select>
                        </div>

                        <Input isRequired type="text" label="Phone Number" className="forms__myinput" />
                    </div>

                    <div className="forms__city-state-zip">
                        <Input isRequired type="text" label="State" className="forms__myinput-three" />
                        <Input isRequired type="text" label="City" className="forms__myinput-three" />
                        <Input isRequired type="text" label="Zip Code" className="forms__myinput-three" />
                    </div>

                    <div className="forms__address">
                        <Input isRequired type="text" label="Address" className="forms__myinput-one" />
                    </div>
                </div>
                {/* Tarjeta */}

                <div className="forms__header">
                    <div className="forms__header-number"><p>2</p>
                    </div>
                    <p className="forms__header-text"> PAYMENT DETAILS</p>
                    <img className='forms__img' src="lock.svg" alt="Lock icon" />
                </div>

                <div className="forms__creditcard-form">
                    <div className="forms__creditcard">
                        <Input
                            isRequired
                            type="text"
                            label="Credit Card Number (0000-0000-0000-0000)"
                            className="forms__myinput-one"
                        />
                    </div>
                    <div className="forms__security-expiration">
                        <Input isRequired type="password" label="CVV" className="forms__myinput" />
                        <Input isRequired type="date" label="Expiration Date" className="forms__myinput" />
                    </div>

                    <div className="forms__buttons">
                        <Button className=" bg-[black] text-[white]" onClick={completePurchase} onPress={onOpen}>
                            Pay with <img className="applepay" src="apple-pay.svg" alt="Apple Pay" />
                        </Button>
                        <Button color="success" className="text-[black]" onClick={completePurchase} onPress={onOpen}>
                            Pay
                        </Button>
                        <ModalNUI isOpen={isOpen} onClose={onClose} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Checkout;
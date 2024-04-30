import React, { useEffect, useState } from "react";
import './checkout.scss'
import { Divider } from "@nextui-org/divider";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";

const Checkout = () => {
    const [data, setData] = useState([]);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setData(storedCart);
        }
    }, []);

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
                        <p className='checkout__shipping-amount'>$30</p>
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

                <div className="forms__name-lastname">
                    <Input isRequired type="text" label="Full Name" className="forms__myinput" />
                    <Input isRequired type="email" label="Email" className="forms__myinput" />
                </div>

                <div className="forms__country-zip">
                    <div className="forms__select">
                        <span className="forms__select-flag" aria-hidden="true"></span>
                        <select className="forms__select-input" name="country-selector" id="country-selector">
                            <option className="forms__select-input" value="0">Select Country</option>
                            <option className="forms__select-input" value="IT">Italy</option>
                            <option className="forms__select-input" value="PT">Portugal</option>
                            <option className="forms__select-input" value="ES">Spain</option>
                        </select>
                    </div>
                    <Input isRequired type="text" label="Zip" className="forms__myinput" />
                </div>

                {/* Tarjeta */}
                <div className="w-1/3 mx-auto">
                    {/* <h1 className="text-3xl mt-5 text-center p-5">Enter Credit Card Details</h1> */}
                    <form className="flex flex-col flex-wrap gap-3 w-full p-5 bg-gray-100 rounded-lg">
                        <div className="w-full flex flex-col">
                            <p className="font-bold mb-3">Supported Cards</p>
                            <div className="flex gap-5">
                                <img src="https://www.svgrepo.com/show/328144/visa.svg" alt="Visa" className="w-10" />
                                <img src="https://www.svgrepo.com/show/328151/discover.svg" alt="Discover" className="w-10" />
                                <img src="https://www.svgrepo.com/show/354044/mastercard.svg" alt="MasterCard" className="w-10" />
                                <img src="https://www.svgrepo.com/show/14823/amex.svg" alt="AMEX" className="w-10" />
                            </div>
                        </div>
                        <label className="relative w-full flex flex-col">
                            <span className="font-bold mb-3">Card number</span>
                            <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                                name="card_number" placeholder="0000 0000 0000 0000" id="cardNumber" />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <img id="cardType" src="imgs/visa.svg"
                                className="hidden absolute bottom-0 right-0 -mb-0.5 -translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                                alt="" />
                        </label>
                        <p className="mt-0 text-red-500 hidden" id="invalidCardNumber">Invalid Card number</p>

                        <label className="relative flex-1 flex flex-col">
                            <span className="font-bold mb-3">Expire date</span>
                            <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                                name="expire_date" placeholder="MM/YY" id="expireDate" />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </label>
                        <p className="mt-0 text-red-500 hidden" id="invalidExpireDate">Invalid Date</p>

                        <label className="relative flex-1 flex flex-col">
                            <span className="font-bold flex items-center gap-3 mb-3">
                                CVC/CVV
                                <span className="relative group">
                                    <span
                                        className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                                        Enter 3 digit of CVV</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </span>
                            <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                                name="card_cvc" placeholder="&bull;&bull;&bull;" id="cvv" />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </label>
                        <p className="mt-0 text-red-500 hidden" id="invalidCVV">Invalid CVV</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
import { ChangeEvent, useEffect, useState } from "react";
import './checkout.scss'
import { Divider } from "@nextui-org/divider";
import { Button, Input, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import ModalNUI from "../modal";
import { useCountriesContext } from "../../context/countries-context";
import axios from "axios";

// interface Pokemon {
//     id: number;
//     name: string;
//     subtotal: number;
//     taxes: number;
//     save: number;
// }

interface Pokemon {
    id: number;
    name: string;
    subtotal: number;
    taxes: number;
    save: number;
}

interface CartItem {
    pokemon: Pokemon;
    quantity: number;
}

const data: CartItem[] = [];

// interface Country {
//     id: number;
//     name: string;
//     states: string[];
// }

interface PokemonData {
    pokemon: {
        subtotal: number;
        taxes: number;
        save: number;
    },
    quantity: number;
}

const Check = () => {
    const [data, setData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [isValidCreditCard, setIsValidCreditCard] = useState(false);
    const [cardType, setCardType] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [city, setCity] = useState('');
    const country = useCountriesContext();
    const [zipCode, setZipCode] = useState('');
    const [isValidZipCode, setIsValidZipCode] = useState(false);
    const [cvv, setCVV] = useState('');
    const [isValidCVV, setIsValidCVV] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [expirationDate, setExpirationDate] = useState("");
    const [isExpirationValid, setIsExpirationValid] = useState(true);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');



    useEffect(() => {
        setIsFormValid(
            selectedCountry !== '' &&
            selectedState !== '' &&
            isValidZipCode &&
            creditCardNumber !== '' &&
            isValidCreditCard &&
            cvv !== '' &&
            isValidCVV &&
            isExpirationValid
        );
    }, [selectedCountry, selectedState, isValidZipCode, creditCardNumber, isValidCreditCard, cvv, isValidCVV, isExpirationValid]);

    useEffect(() => {
        if (selectedCountry) {
            const selectedCountryData = country.find(c => c.id === parseInt(selectedCountry));
            if (selectedCountryData) {
                setStates(selectedCountryData.states);
            }
        }
    }, [selectedCountry, country]);

    // Setteando pais
    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedCountry(value);
        setSelectedState('');
    };

    // Seteando State de cada pais
    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedState(value);
    };

    // City
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
    };

    //ZIP
    const handleZipCode = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setZipCode(value);
        setIsValidZipCode(verifyZipCode(value));
    };

    const verifyZipCode = (value: string): boolean => {
        const zipCodeRegex = /^\d{5}$/;
        const isValid = zipCodeRegex.test(value);
        return isValid;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/shoppingCart/products?`, {
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

    useEffect(() => {
        const combinedAddress = `${selectedCountry}, ${selectedState}, ${city} ,${zipCode}, ${address}`;
        setAddress(combinedAddress);
    }, [selectedCountry, selectedState, zipCode]);


    useEffect(() => {
        const combinedPaymentMethod = `${creditCardNumber} (${cardType})`;
        setPaymentMethod(combinedPaymentMethod);
    }, [creditCardNumber, cardType]);


    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };


    const completePurchase = () => {
        const params = {
            address: address,
            paymentMethod: paymentMethod,
        }

        axios.post(`http://localhost:8080/api/v1/order/from-cart?address=${params.address}&paymentMethod=${params.paymentMethod}`,
            {}
            , {
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

    }


    //Seteando Tarjeta de credito
    function validateCreditCard(cardNumber: string) {
        const cleanedNumber = cardNumber.replace(/\D/g, "");
        const isVisa = cleanedNumber.match(/^4\d{12}(?:\d{3})?$/);
        const isMastercard = cleanedNumber.match(/^5[1-5]\d{14}$/);
        const isAmex = cleanedNumber.match(/^3[47]\d{13}$/);
        const isValidLuhn = (num: string) => {
            let sum = 0;
            for (let i = 0; i < num.length; i++) {
                let digit = parseInt(num[num.length - 1 - i]);
                if (i % 2 === 1) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum += digit;
            }
            return sum % 10 === 0;
        };
        return (isVisa || isMastercard || isAmex) && isValidLuhn(cleanedNumber);
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCreditCardNumber(value);
        setIsValidCreditCard(validateCreditCard(value));

        if (value.match(/^4/)) {
            setCardType('Visa');
        } else if (value.match(/^5[1-5]/)) {
            setCardType('Mastercard');
        } else if (value.match(/^3[47]/)) {
            setCardType('American Express');
        } else {
            setCardType('');
        }
    };

    //CVV
    const handleCVV = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCVV(value);
        setIsValidCVV(verifyCVV(value));
    };

    function verifyCVV(value: string) {
        const cvvRegex = /^\d{3}$/;
        const isValid = cvvRegex.test(value);
        return isValid;
    }

    //Expiration Date
    const handleExpirationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cleanedValue = value.replace(/\D/g, "");
        const formattedDate = formatExpirationDate(cleanedValue);
        const isValid = validateExpirationDate(cleanedValue);
        setExpirationDate(formattedDate);
        setIsExpirationValid(isValid);
    };

    const formatExpirationDate = (value: string) => {
        if (value.length === 0) return "";
        if (value.length <= 2) return value;
        return value.slice(0, 2) + "/" + value.slice(2);
    };


    const validateExpirationDate = (value: string) => {
        const mm = value.slice(0, 2);
        const yy = value.slice(2);
        const mmInt = parseInt(mm);
        const yyInt = parseInt(yy);
        return mmInt >= 1 && mmInt <= 12 && yyInt >= 24;
    };





    const subtotalAmount = data.reduce((subtotal, item: PokemonData) => subtotal + (item.pokemon.subtotal * item.quantity), 0);
    const taxesAmount = data.reduce((taxes, item: PokemonData) => taxes + (item.pokemon.taxes * item.quantity), 0);
    const saveAmount = data.reduce((save, item: PokemonData) => save + (item.pokemon.save * item.quantity), 0);
    const totalAmount = ((subtotalAmount + taxesAmount) - saveAmount);



    return (
        <div className="checkout">
            {/* Resumen */}
            <div className="checkout__summary">
                <p className="checkout__title">Order Summary</p>
                <div className="checkout__table-container">
                    <table className="checkout__table">
                        <tbody>
                            {data && data.map((item: CartItem) => (
                                <tr className="checkout__item-container" key={item.pokemon.id}>
                                    <td className="checkout__info-quantity">
                                        <div className="checkout__quantity">x{item.quantity}</div>
                                    </td>
                                    <td className="checkout__info-name">
                                        <div className='checkout__name'>{item.pokemon.name}</div>
                                    </td>
                                    <td className="checkout__info-price">
                                        <div className="checkout__info-price">${(item.pokemon.subtotal * item.quantity).toFixed(2)}</div>
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
                        <Select
                            isRequired
                            label="Country"
                            placeholder="Select a Country"
                            className="forms__myinput myselectNUI"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            {country.map((country) => (
                                <SelectItem key={country.id} value={country.id}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input isRequired type="text" label="Phone Number" className="forms__myinput" />
                    </div>

                    <div className="forms__city-state-zip">
                        <Select
                            isRequired
                            label="State"
                            placeholder="Select a State"
                            className="max-w-xs forms__myinput-three myselectNUI"
                            value={selectedState}
                            onChange={handleStateChange}
                        >
                            {states.map((state, index) => (
                                <SelectItem key={index} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input isRequired type="text" label="City" className="forms__myinput-three" onChange={handleCityChange} />
                        <div className="forms__city-state-zip-zip">
                            <Input isRequired type="text" label="Zip" className="forms__myinput-three" onChange={handleZipCode}
                                onBlur={verifyZipCode} />
                            {isValidZipCode ? (
                                <p className="text-tiny text-danger"></p>
                            ) : (
                                <p className="text-tiny text-danger">ZIP not valid</p>
                            )}
                        </div>
                    </div>

                    <div className="forms__address">
                        <Input isRequired type="text" label="Address" className="forms__myinput-one" onChange={handleAddressChange} />
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
                            value={creditCardNumber}
                            onChange={handleChange}
                        />
                        {isValidCreditCard ? (
                            <p className="text-tiny text-primary">{cardType}</p>
                        ) : (
                            <p className="text-tiny text-danger">Credit card number not valid</p>
                        )}
                    </div>
                    <div className="forms__security-expiration">
                        <div className="forms__security-expiration-cvv">
                            <Input isRequired type="password" label="CVV" className="forms__myinput" onChange={handleCVV}
                                onBlur={verifyCVV} />
                            {isValidCVV ? (
                                <p className="text-tiny text-danger"></p>
                            ) : (
                                <p className="text-tiny text-danger">CVV not valid</p>
                            )}
                        </div>
                        <div className="expiration">
                            <Input isRequired
                                type="text"
                                label="Expiration Date MM/YY"
                                className="forms__myinput"
                                value={expirationDate}
                                onChange={handleExpirationChange}
                                maxLength={5} />
                            {!isExpirationValid && (
                                <>
                                    <p className="text-tiny text-danger">Invalid expiration date (expiration year must be at least 24)</p>
                                    <p className="text-tiny text-danger">Months must be 01-12</p>
                                    <p className="text-tiny text-danger">Expiration year must be at least 24</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="forms__buttons">
                    <Button type="submit" className=" bg-[black] text-[white]" isDisabled={!isFormValid} onClick={completePurchase} onPress={onOpen}>
                        Pay with <img className="applepay" src="apple-pay.svg" alt="Apple Pay" />
                    </Button>
                    <Button type="submit" color="success" className="text-[black]" isDisabled={!isFormValid} onClick={completePurchase} onPress={onOpen}>
                        Pay
                    </Button>
                    <ModalNUI isOpen={isOpen} onClose={onClose} />
                </div>
            </div>
        </div >
    )
}

export default Check;
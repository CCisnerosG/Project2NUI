import PokeItem from "../product-item";
import './list.scss';
import { Divider } from "@nextui-org/divider";
import { usePokemonContext } from "../../context/pokemon-context";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

const PokeProducts = () => {
    const [cart, setCart] = useState([]);


    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart)
        }
    }, [cart]);

    const addToCart = (item) => {
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

    const addQuantity = () => {
        quantity += 1;
    }

    const substractQuantity = () => {
        quantity -= 1;
    }

    const data = usePokemonContext();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = data?.slice(firstItem, lastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Divider className="my-4" />
            <p className="text-small text-default-500">Selected Page: {currentPage}</p>
            <div className="list-container">
                <div className="list">
                    {currentItems && currentItems.map((item) => (
                        <PokeItem key={item.id} item={item} addToCart={() => addToCart(item)} />
                    ))}
                </div>
            </div>
            <Divider className="my-4" />
            {data && data.length > itemsPerPage && (
                <Pagination
                    total={Math.ceil(data.length / itemsPerPage)}
                    color="secondary"
                    page={currentPage}
                    onChange={paginate}
                    className="ml-7"
                />
            )}
            <div className="flex gap-2 mypag-btn">
                <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onClick={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default PokeProducts;

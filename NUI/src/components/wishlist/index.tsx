import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './wishlist.scss';
import toast from "react-hot-toast";

interface WishlistItem {
    id: number;
    pokemon: {
        id: number;
        name: string;
        sprite: string;
        weight: number;
        height: number;
        price: number;
    };
}

const Wish = () => {
    const [data, setData] = useState<WishlistItem[]>([]);


    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            axios.get(`http://localhost:8080/api/v1/wishlist/products?userId=${user.userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(response => {
                    setData(response.data)
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            console.error('User data not found in localStorage');
        }
    }, []);

    if (data.length === 0) {
        return (
            <div className="empty-cart">
                <p className="empty-cart-text">Your wishlist is empty</p>
                <Link to={'/PokemonList'}><Button color="primary">Back to Shopping!</Button>
                </Link>
            </div>
        );
    }

    const handleToCart = () => {
        axios.post(`http://localhost:8080/api/v1/shoppingCart/moveFromWishlist?`, null,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    const deleteItem = (itemId: number) => {
        axios.delete(`http://localhost:8080/api/v1/wishlist/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log(response.data);
                setData(data.filter(item => item.pokemon.id !== itemId))
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const oneProductToCart = (itemId: number) => {
        console.log(localStorage.getItem("token"));
        axios.post(`http://localhost:8080/api/v1/shoppingCart/add?&pokemonId=${itemId}&quantity=${1}`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    console.log('Sirvio la pus');
                } else {
                    console.log('No sirve');
                }
            })
            .catch(error => {
                console.log(`Error: ${error.message}`);
            });
        deleteItem(itemId);
    }

    return (
        <>
            <Button onClick={handleToCart}>ADD ALL TO WISHLIST</Button>
            <Table isStriped aria-label="Example static collection table" className="mywishlist__table">
                <TableHeader >
                    <TableColumn className="mywishlist__tableheader"> </TableColumn>
                    <TableColumn className="mywishlist__tableheader">POKEMON</TableColumn>
                    <TableColumn className="mywishlist__tableheader">DESCRIPTION</TableColumn>
                    <TableColumn className="mywishlist__tableheader">PRICE</TableColumn>
                    <TableColumn className="mywishlist__tableheader"> </TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.pokemon.id}>
                            <TableCell><button onClick={() => deleteItem(item.pokemon.id)}><img className='item__trash-icon' src="/trash.svg" alt="Delete icon" /></button></TableCell>
                            <TableCell>
                                <div className="mywishlist__cell">
                                    <img src={item.pokemon.sprite} alt={item.pokemon.name} className="pkm-img-wish" />
                                    <p>{item.pokemon.name}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="mywishlist__cell">
                                    <img src="weight.svg" alt="Weight icon" />
                                    <p> {item.pokemon.weight}lbs </p>
                                    <Divider className="rotate-90 w-10" />
                                    <img src="height.svg" alt="Height icon" />
                                    <p> {item.pokemon.height}inch.</p>
                                </div>
                            </TableCell>
                            <TableCell>${item.pokemon.price}</TableCell>
                            <TableCell>
                                <Button color="success" className="p-0" onClick={() => oneProductToCart(item.pokemon.id)}>Add to Cart</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Wish;
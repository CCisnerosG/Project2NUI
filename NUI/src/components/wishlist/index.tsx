import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './wishlist.scss';

const Wish = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
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

    return (
        <>
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
                            <TableCell> x </TableCell>
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
                                <Button color="success" className="p-0" onClick={() => handleEditClick(pokemon)}>Add to Cart</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Wish;
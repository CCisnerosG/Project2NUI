import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, useDisclosure, CircularProgress } from "@nextui-org/react";
import './admintable.scss';
import axios from "axios";
import ModalAdmin from "../modal-admin";
import { Pokemon } from "../../context/pokemon-context";

export default function ProductTable() {
    const [data, setData] = useState<Pokemon[] | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isCreating, setIsCreating] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);


    const fetchPokemon = () => {
        axios.get('http://localhost:8080/api/v1/pokemon')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }

    useEffect(() => {
        fetchPokemon();
    }, []);

    if (!data) {
        return <div className="empty-cart"><CircularProgress label="Loading..." /></div>;
    }

    const deletePokemon = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/v1/pokemon/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        fetchPokemon();
    };

    const handleEditClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        onOpen();
    };

    const handleCreatePokemon = () => {
        setSelectedPokemon(null);
        setIsCreating(true);
        onOpen();
    };

    const handleModalClose = () => {
        setSelectedPokemon(null);
        setIsCreating(false);
        onClose();
        fetchPokemon();
    };

    return (
        <>
            <div className="admin__container">
                <Button className="m-4" color="success" onClick={() => handleCreatePokemon()}>New Pokemon</Button>
                <div className="admin__table">
                    <Table aria-label="Example static collection table" className="my__table">
                        <TableHeader >
                            <TableColumn className="my__tableheader">ID</TableColumn>
                            <TableColumn className="my__tableheader">IMAGE</TableColumn>
                            <TableColumn className="my__tableheader">NAME</TableColumn>
                            <TableColumn className="my__tableheader">PRICE</TableColumn>
                            <TableColumn className="my__tableheader">ACTION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data.map((pokemon: Pokemon) => (
                                <TableRow key={pokemon.id}>
                                    <TableCell>{pokemon.id}</TableCell>
                                    <TableCell><img src={pokemon.sprite} alt={pokemon.name} className="pkm-img-admin" /></TableCell>
                                    <TableCell>{pokemon.name}</TableCell>
                                    <TableCell>${pokemon.price}</TableCell>
                                    <TableCell>
                                        <Button color="warning" className="p-0" onClick={() => handleEditClick(pokemon)}>EDIT</Button>
                                        <Button color="danger" className="p-0 bg-red-700" onClick={() => deletePokemon(pokemon.id)}>DELETE</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {isOpen && (isCreating || selectedPokemon) && (
                        <ModalAdmin isOpen={isOpen} onClose={handleModalClose} pokemon={selectedPokemon} isCreating={isCreating} />
                    )}
                </div>
            </div>
        </>
    );
}

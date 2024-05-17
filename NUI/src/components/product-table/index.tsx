import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, useDisclosure } from "@nextui-org/react";
import { usePokemonContext } from "../../context/pokemon-context";
import './admintable.scss';
import axios from "axios";
import ModalAdmin from "../admin-modal";

export default function ProductTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const data = usePokemonContext();
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    if (!data) {
        return <div>Loading...</div>;
    }

    const deletePokemon = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/v1/pokemon/${id}`);
    };

    const handleEditClick = (pokemon) => {
        setSelectedPokemon(pokemon);
        onOpen();
    };

    return (
        <>
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
                        {data.map((pokemon) => (
                            <TableRow key={pokemon.id}>
                                <TableCell>{pokemon.id}</TableCell>
                                <TableCell><img src={pokemon.sprite} alt={pokemon.name} className="pkm-img-admin" /></TableCell>
                                <TableCell>{pokemon.name}</TableCell>
                                <TableCell>{pokemon.price}</TableCell>
                                <TableCell>
                                    <Button color="warning" className="p-0" onClick={() => handleEditClick(pokemon)}>EDIT</Button>
                                    <Button color="danger" className="p-0 bg-red-700" onClick={() => deletePokemon(pokemon.id)}>DELETE</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {selectedPokemon && <ModalAdmin isOpen={isOpen} onClose={onClose} pokemon={selectedPokemon} />}
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import './adminmodal.scss';
import axios from "axios";
import { Pokemon } from '../../context/pokemon-context';

interface ModalAdminProps {
    isOpen: boolean;
    onClose: () => void;
    pokemon: Pokemon | null;
    isCreating: boolean;
}

const ModalAdmin: React.FC<ModalAdminProps> = ({ isOpen, onClose, pokemon, isCreating }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sprite, setSprite] = useState('');
    const [type, setType] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [price, setPrice] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [taxes, setTaxes] = useState('');
    const [save, setSave] = useState('');
    const [generation, setGeneration] = useState('');
    const [cries, setCries] = useState('');
    const [legendary, setLegendary] = useState('');

    useEffect(() => {
        if (!isCreating && pokemon) {
            setId(pokemon.id.toString());
            setName(pokemon.name);
            setDescription(pokemon.description);
            setSprite(pokemon.sprite);
            setType(pokemon.type);
            setWeight(pokemon.weight.toString());
            setHeight(pokemon.height.toString());
            setPrice(pokemon.price.toString());
            setSubtotal(pokemon.subtotal.toString());
            setTaxes(pokemon.taxes.toString());
            setSave(pokemon.save.toString());
            setGeneration(pokemon.generation.toString());
            setCries(pokemon.cries);
            setLegendary(pokemon.legendary.toString());
        }
    }, [isCreating, pokemon]);

    const stringToBoolean = (value: string): boolean => {
        return value.toLowerCase() === 'true';
    };

    const handleSubmit = () => {
        const newPokemon: Pokemon = {
            id: parseInt(id),
            name,
            description,
            sprite,
            type,
            weight: parseInt(weight),
            height: parseInt(height),
            price: parseInt(price),
            subtotal: parseInt(subtotal),
            taxes: parseInt(taxes),
            save: parseInt(save),
            generation: parseInt(generation),
            cries,
            legendary: stringToBoolean(legendary)
        };
        if (isCreating) {
            axios.post('http://localhost:8080/api/v1/pokemon', newPokemon, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    console.log("Pokemon created successfully", response.data);
                    onClose();
                })
                .catch(error => {
                    console.error("Error creating pokemon:", error);
                });
        } else {
            if (pokemon) {
                axios.put(`http://localhost:8080/api/v1/pokemon/${pokemon.id}`, newPokemon, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then(response => {
                        console.log("Pokemon updated successfully", response.data);
                        onClose();
                    })
                    .catch(error => {
                        console.error("Error updating pokemon:", error);
                    });
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isKeyboardDismissDisabled={true} className="admin__modal max-w-full">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 modal__header">{isCreating ? 'Create Pokemon' : 'Edit Pokemon'}</ModalHeader>
                <ModalBody>
                    <img src={sprite} alt={name} className="max-w-40" />
                    {isCreating && (
                        <Input className="input" type="number" isRequired value={id} label="Pokemon Number" onChange={(e) => setId(e.target.value)} />
                    )}
                    <Input className="input" isRequired value={name} label="Name" onChange={(e) => setName(e.target.value)} />
                    <Input className="input" isRequired value={description} label="Description" onChange={(e) => setDescription(e.target.value)} />
                    <Input className="input" isRequired value={sprite} label="Sprite" onChange={(e) => setSprite(e.target.value)} />
                    <div className="pokemon__type-weight-height">
                        <Input className="input" isRequired value={type} label="Type" onChange={(e) => setType(e.target.value)} />
                        <Input className="input" type="number" isRequired value={weight} label="Weight" onChange={(e) => setWeight(e.target.value)} />
                        <Input className="input" type="number" isRequired value={height} label="Height" onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="pokemon__money">
                        <Input className="input" type="number" isRequired value={price} label="Price" onChange={(e) => setPrice(e.target.value)} />
                        <Input className="input" type="number" isRequired value={subtotal} label="Subtotal" onChange={(e) => setSubtotal(e.target.value)} />
                        <Input className="input" type="number" isRequired value={taxes} label="Taxes" onChange={(e) => setTaxes(e.target.value)} />
                        <Input className="input" type="number" isRequired value={save} label="Save" onChange={(e) => setSave(e.target.value)} />
                    </div>
                    <Input className="input" type="number" isRequired value={generation} label="Generation" onChange={(e) => setGeneration(e.target.value)} />
                    <Input className="input" isRequired value={cries} label="Cries" onChange={(e) => setCries(e.target.value)} />
                    <Input className="input" isRequired value={legendary} label="Legendary" onChange={(e) => setLegendary(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="secondary" onPress={handleSubmit}>
                        {isCreating ? 'Create' : 'Save'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalAdmin;
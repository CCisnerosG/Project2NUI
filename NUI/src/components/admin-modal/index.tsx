import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import './adminmodal.scss';
import axios from "axios";
import { useState } from "react";


const ModalAdmin = ({ isOpen, onClose, pokemon }) => {
    if (!pokemon) return null;
    const [name, setName] = useState(pokemon.name);
    const [description, setDescription] = useState(pokemon.description);
    const [sprite, setSprite] = useState(pokemon.sprite);
    const [type, setType] = useState(pokemon.type);
    const [weight, setWeight] = useState(pokemon.weight);
    const [height, setHeight] = useState(pokemon.height);
    const [price, setPrice] = useState(pokemon.price);
    const [subtotal, setSubtotal] = useState(pokemon.subtotal);
    const [taxes, setTaxes] = useState(pokemon.taxes);
    const [save, setSave] = useState(pokemon.save);
    const [generation, setGeneration] = useState(pokemon.generation);
    const [cries, setCries] = useState(pokemon.cries);
    const [legendary, setLegendary] = useState(pokemon.legendary);

    const updatePokemon = () => {
        const updatedPokemon = {
            id: pokemon.id,
            name,
            description,
            sprite,
            type,
            weight,
            height,
            price,
            subtotal,
            taxes,
            save,
            generation,
            cries,
            legendary
        };
        axios.put(`http://localhost:8080/api/v1/pokemon/${pokemon.id}`, updatedPokemon)
            .then(response => {
                console.log("Pokemon updated successfully", response.data);
                onClose();
            })
            .catch(error => {
                console.error("Error updating pokemon:", error);
            });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true} className="admin__modal max-w-full">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 modal__header">Edit Pokemon</ModalHeader>
                <ModalBody>
                    <img src={sprite} alt={name} className="max-w-40" />
                    <Input isRequired value={name} label="Name" onChange={(e) => setName(e.target.value)} />
                    <Input isRequired value={description} label="description" onChange={(e) => setDescription(e.target.value)} />
                    <Input isRequired value={sprite} label="sprite" onChange={(e) => setSprite(e.target.value)} />
                    <div className="pokemon__type-weight-height">
                        <Input isRequired value={type} label="type" onChange={(e) => setType(e.target.value)} />
                        <Input isRequired value={weight} label="weight" onChange={(e) => setWeight(e.target.value)} />
                        <Input isRequired value={height} label="height" onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="pokemon__money">
                        <Input isRequired value={price} label="price" onChange={(e) => setPrice(e.target.value)} />
                        <Input isRequired value={subtotal} label="subtotal" onChange={(e) => setSubtotal(e.target.value)} />
                        <Input isRequired value={taxes} label="taxes" onChange={(e) => setTaxes(e.target.value)} />
                        <Input isRequired value={save} label="save" onChange={(e) => setSave(e.target.value)} />
                    </div>
                    <Input isRequired value={generation} label="generation" onChange={(e) => setGeneration(e.target.value)} />
                    <Input isRequired value={cries} label="cries" onChange={(e) => setCries(e.target.value)} />
                    <Input isRequired value={legendary} label="legendary" onChange={(e) => setLegendary(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="secondary" onPress={updatePokemon}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalAdmin;
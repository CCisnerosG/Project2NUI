import PokeItem from "../product-item";
import './list.scss';
import { Divider } from "@nextui-org/divider";
import { usePokemonContext } from "../../context/pokemon-context";

const PokeProducts = () => {
    const data = usePokemonContext();

    return (
        <>
            <Divider className="my-4" />
            <div className="list-container">
                <div className="list">
                    {data && data.map((item) => {
                        return <PokeItem key={item.id} item={item} />;
                    })}
                </div>
            </div>
            <Divider className="my-4" />

        </>
    );
};

export default PokeProducts;
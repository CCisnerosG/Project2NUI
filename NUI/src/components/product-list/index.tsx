import PokeItem from "../product-item";
import './list.scss';
import { Divider } from "@nextui-org/divider";
import { usePokemonContext } from "../../context/pokemon-context";
import { useState } from "react";

const PokeProducts = () => {
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
            <div className="list-container">
                <div className="list">
                    {currentItems && currentItems.map((item) => (
                        <PokeItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <Divider className="my-4" />
            <div className="pagination">
                {data && data.length > itemsPerPage && (
                    <ul className="pagination-list">
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                            <li key={i} className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className="pagination-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default PokeProducts;

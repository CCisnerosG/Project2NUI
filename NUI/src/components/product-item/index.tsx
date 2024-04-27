import React from "react";
import { Link } from "react-router-dom";
import './item.scss';
import subject from "../../service/service";
import { Button } from "@nextui-org/react";

const PokeItem = ({ item }) => {

    const handleItem = (item: any) => {
        subject.next([
            item,
            ...subject.value,
        ]);
    }

    return (
        <><div className="pkm">
            <Link to={`/ProductDetails/${item.id}`}>
                <div className="pkm__img-container">
                    <img className="pkm__img" src={item.sprite} alt={`Pokemon ${item.name}`} />
                </div>
                <div className="pkm__details">
                    <div className="pkm__head">
                        <p className="pkm__total">${item.price}</p>
                        <p className="pkm__head-title">{item.name}</p>
                        <p className="pkm__head-number">Pokemon No. {item.id}</p>
                    </div>
                    <div className="pkm__content">
                        <div className="pkm__content-info">
                            <div className="pkm__content-types">
                                <p><b>TYPE:</b> {item.type}</p>
                            </div>
                            <p className="pkm__content-height"><b>HEIGHT:</b> {item.height} inch</p>
                            <p className="pkm__content-weight"><b>WEIGHT:</b> {item.weight} lbs</p>
                        </div>
                        <div className="pkm__pricing">
                            <p className="pkm__subtotal">Sub-total: ${item.subtotal}</p>
                            <p className="pkm__taxes">Taxes: ${item.taxes}</p>
                            <p className="pkm__save">Save: ${item.save}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="mybtn__container">
                <Button className="mybtn" color="success" onClick={() => handleItem(item)}>Add to Cart</Button>
            </div>
        </div>
            {/* //------Pagination ---------- */}

            {/* <div className="flex flex-col gap-5">
                <p className="text-small text-default-500">Selected Page: {currentPage}</p>
                <Pagination
                    total={10}
                    color="secondary"
                    page={currentPage}
                    onChange={setCurrentPage}
                />
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                    >
                        Next
                    </Button>
                </div>
            </div> */}

        </>
    );
};

export default PokeItem;
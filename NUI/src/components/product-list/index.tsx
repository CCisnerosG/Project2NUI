import PokeItem from "../product-item";
import './list.scss';
import { Divider } from "@nextui-org/divider";
import { usePokemonContext } from "../../context/pokemon-context";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Radio, RadioGroup } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

const PokeProducts = () => {
    const [cart, setCart] = useState([]);
    const [filters, setFilters] = useState({ name: '', type: '', generation: '', minPrice: '', maxPrice: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const applyFilters = (items) => {
        return items.filter(item => {
            if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false;
            }
            if (filters.type && item.type !== filters.type) {
                return false;
            }
            if (filters.generation && item.generation !== parseInt(filters.generation)) {
                return false;
            }
            if (filters.minPrice && item.price < parseInt(filters.minPrice)) {
                return false;
            }
            if (filters.maxPrice && item.price > parseInt(filters.maxPrice)) {
                return false;
            }
            return true;
        });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNameFilterChange = (event) => {
        const name = event.target.value;
        setFilters({ ...filters, name });
    };

    const handleAllTypesFilter = () => {
        setFilters({ ...filters, type: '' });
    };

    const handleTypeFilterChange = (type) => {
        setFilters({ ...filters, type });
    };

    const handleGenFilterChange = (generation) => {
        setFilters({ ...filters, generation });
    }

    const handleMinPriceFilterChange = (event) => {
        const minPrice = event.target.value;
        setFilters({ ...filters, minPrice });
    };

    const handleMaxPriceFilterChange = (event) => {
        const maxPrice = event.target.value;
        setFilters({ ...filters, maxPrice });
    };

    const types = ['Grass', 'Electric', 'Normal', 'Fire', 'Poison', 'Ground', 'Bug', 'Psychic', 'Steel', 'Rock', 'Dark', 'Dragon'];
    const generations = ['Kanto', 'Johto', 'Hoen', 'Sinnoh']

    const data = usePokemonContext();
    const filteredItems = data ? applyFilters(data) : [];
    const totalItems = filteredItems.length;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = filteredItems.slice(firstItem, lastItem);

    return (
        <>

            {/* Filters */}
            <div className="search-container">
                <input
                    type="text"
                    value={filters.name}
                    onChange={handleNameFilterChange}
                    placeholder="Search by name..."
                    className="searchbar"
                />
            </div>
            <Accordion selectionMode="multiple" className="mb-8 accord">
                <AccordionItem key="type" aria-label="Type" title="Filters by Type" className="myaccordion">
                    <div className="filter__type">
                        <div className="filter__type-btns">
                            <Button
                                variant={filters.type === '' ? "contained" : "flat"}
                                onClick={handleAllTypesFilter}
                            >
                                All
                            </Button>
                            {types.map((type) => (
                                <Button
                                    key={type}
                                    variant={filters.type === type.toLowerCase() ? "contained" : "flat"}
                                    onClick={() => handleTypeFilterChange(type)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div >
                </AccordionItem>

                <AccordionItem key="region" aria-label="Region" title="Filter by Region" className="myaccordion">
                    <div className="filter__gen">
                        <RadioGroup
                            label="Filter by Region"
                            orientation="horizontal"
                        >
                            <Radio
                                variant={filters.generation === '' ? "contained" : "flat"}
                                onClick={() => handleGenFilterChange('')}
                            >
                                All
                            </Radio>

                            {generations.map((generation, index) => (

                                <Radio
                                    value={index}
                                    key={index}
                                    variant={filters.generation === `${index + 1}` ? "contained" : "flat"}
                                    onClick={() => handleGenFilterChange(`${index + 1}`)}
                                >
                                    {generation}
                                </Radio>

                            ))}
                        </RadioGroup>
                    </div>
                </AccordionItem>

                <AccordionItem key="price" aria-label="Price" title="Filter by Price Range" className="myaccordion">
                    <div className="filter__price">
                        <div className="filter__type-btns">
                            <input
                                type="number"
                                value={filters.minPrice}
                                onChange={handleMinPriceFilterChange}
                                placeholder="Min Price"
                                className="searchbar"
                            />

                            <input
                                type="number"
                                value={filters.maxPrice}
                                onChange={handleMaxPriceFilterChange}
                                placeholder="Max Price"
                                className="searchbar"
                            />
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>


            {totalItems === 0 && (
                <p className="pkm-notfound">Pokémon not found</p>
            )
            }

            {
                totalItems > 0 && (
                    <>
                        <p className="text-small text-default-500 ml-9">Selected Page: {currentPage}</p>
                        <div className="list-container">
                            <div className="list">
                                {currentItems.map((item) => (
                                    <PokeItem key={item.id} item={item} addToCart={() => addToCart(item)} />
                                ))}
                            </div>
                        </div>
                        <Divider className="my-4" />

                        {/* Pagination */}
                        {totalItems > itemsPerPage && (
                            <Pagination
                                total={Math.ceil(totalItems / itemsPerPage)}
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
                                style={{ display: totalItems > itemsPerPage ? 'block' : 'none' }}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default PokeProducts;
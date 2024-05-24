import PokeItem from "../product-item";
import './list.scss';
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Radio, RadioGroup } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

interface PokeItem {
    id: number;
    name: string;
    type: string;
    generation: number;
    price: number;
    quantity: number;
    sprite: string;
    height: number;
    weight: number;
    subtotal: number;
    taxes: number;
    total: number;
    save: number;
}

interface FilterParams {
    name?: string;
    type?: string;
    generation?: string;
    minPrice?: string;
    maxPrice?: string;
    page: number;
}

const PokeProducts = () => {
    const [filters, setFilters] = useState({ name: '', type: '', generation: '', minPrice: '', maxPrice: '' });
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState<PokeItem[]>([]);
    const [totalItems, setTotalItems] = useState();
    // const itemsPerPage = 10;

    useEffect(() => {
        filter()
    }, [currentPage, filters]);


    const addToCart = (item: PokeItem) => {
        console.log(localStorage.getItem("token"));
        axios.post(`http://localhost:8080/api/v1/shoppingCart/add?&pokemonId=${item.id}&quantity=${1}`, null, {
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
                toast.error(`Error: ${error.message}`);
            });
    }

    const addToWishlist = (item: PokeItem) => {
        axios.post(`http://localhost:8080/api/v1/wishlist/add?&pokemonId=${item.id}`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                toast.error(`Error: ${error.message}`);
            });
    }

    const filter = () => {
        const params: FilterParams = {
            page: currentPage,
        };

        if (filters.name) params.name = filters.name;
        if (filters.type) params.type = filters.type;
        if (filters.generation) params.generation = filters.generation;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;

        axios.get(`http://localhost:8080/api/v1/pokemon/filter?`, {
            params: params
        })
            .then(response => {
                setData(response.data.content);
                setTotalItems(response.data.size);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // const paginate = (pageNumber: number) => {
    //     setCurrentPage(pageNumber);
    // };

    const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setFilters({ ...filters, name });
        setCurrentPage(0);
    };

    const handleAllTypesFilter = () => {
        setFilters({ ...filters, type: '' });
        setCurrentPage(0);
    };

    const handleTypeFilterChange = (type: string) => {
        setFilters({ ...filters, type });
        setCurrentPage(0);
    };

    const handleGenFilterChange = (generation: string) => {
        setFilters({ ...filters, generation });
        setCurrentPage(0);
    }

    const handleMinPriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minPrice = event.target.value;
        setFilters({ ...filters, minPrice });
        setCurrentPage(0);
    };

    const handleMaxPriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = event.target.value;
        setFilters({ ...filters, maxPrice });
        setCurrentPage(0);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };


    const types = ['Grass', 'Electric', 'Normal', 'Fire', 'Poison', 'Ground', 'Bug', 'Psychic', 'Steel', 'Rock', 'Dark', 'Dragon'];
    const generations = ['Kanto', 'Johto', 'Hoen', 'Sinnoh']

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
                                color="primary"
                                variant={filters.type === '' ? "solid" : "bordered"}
                                onClick={handleAllTypesFilter}
                            >
                                All
                            </Button>
                            {types.map((type) => (
                                <Button
                                    key={type}
                                    color="primary"
                                    variant={filters.type === type ? "solid" : "bordered"}
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
                                variant={filters.generation === '' ? "bordered" : "solid"}
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


            {data.length === 0 && (
                <p className="pkm-notfound">Pokémon not found</p>
            )
            }

            {
                data.length > 0 && (
                    <>
                        <p className="text-small text-default-500 ml-9">Selected Page: {currentPage + 1}</p>
                        <div className="list-container">
                            <div className="list">
                                {data.map((item) => (
                                    <PokeItem key={item.id} item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                ))}
                            </div>
                        </div>
                        <Divider className="my-4" />

                        {/* Pagination */}
                        {totalPages > 0 && (
                            <Pagination
                                total={totalPages}
                                color="secondary"
                                page={currentPage + 1}
                                onChange={handlePageChange}
                                className="ml-7"
                            />
                        )}
                        <div className="flex gap-2 mypag-btn">
                            <Button
                                size="sm"
                                variant="flat"
                                color="secondary"
                                isDisabled={currentPage === 0}
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </Button>
                            <Button
                                size="sm"
                                variant="flat"
                                color="secondary"
                                isDisabled={currentPage === totalPages - 1}
                                onClick={handleNextPage}
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
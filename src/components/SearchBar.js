import { useState } from "react";
import { Button } from "reactstrap";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div className='d-flex'>
            <input
                type="text"
                placeholder="Search games, forums, anything really!"
                value={searchTerm}
                onChange={handleSearchChange}
                className='search-bar'
            />
            <Button type='submit' className='bg-secondary'>Search</Button>
        </div>
    );
};

export default SearchBar;
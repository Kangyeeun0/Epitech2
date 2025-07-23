import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { useState } from 'react';
import products from './goods';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredData = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <>
            <div className="header-total">
                <div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="SEARCH A BITBACK"
                            className="search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        <img src="/img/search.png" className="search-icon" />
                    </div>
                    {searchText ? (
                        <ul className="header-search-ul">
                            <p className="header-search-title">PRODUCTS</p>
                            <div className="header-search-border"></div>
                            {filteredData.map((item, i) => (
                                <li key={i} className="header-search-li">
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        ''
                    )}
                </div>
                <div className="header-div">
                    <img src="/img/gamer.png" className="header-title-img" />
                    <h1 className="header-title">BitBack</h1>
                </div>
                <div className="header-icon-div">
                    <img src="/img/account.png" className="header-icon" onClick={() => navigate('/login')} />
                    <img src="/img/cart.png" className="header-icon2" />
                </div>
            </div>
            <div className="header-categories">
                <span
                    className="categories-item"
                    onClick={() => navigate('/')}
                    style={{ borderBottom: isHome ? '1px solid' : 'none' }}
                >
                    Home
                </span>
                <div className="header-dropdown-div">
                    <span className="categories-item" onClick={toggleDropdown}>
                        Categories{' '}
                        <img
                            src="/img/arrow.png"
                            className={isDropdownOpen ? 'header-arrow-img-up' : 'header-arrow-img-down'}
                        />
                    </span>

                    {isDropdownOpen && (
                        <ul className="category-dropdown">
                            <li>Super Nintendo</li>
                            <li>Sega Genesis</li>
                            <li>Game Boy</li>
                            <li>PlayStation 1</li>
                            <li>Nintendo 64</li>
                        </ul>
                    )}
                </div>
                <span className="categories-item">Shop Gift Guide</span>
                <span className="categories-item">Contact</span>
                <span className="categories-item2">FAQ</span>
            </div>
        </>
    );
}

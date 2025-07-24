import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { useState } from 'react';
import products from './goods';

export default function Header() {
    const isLogin = localStorage.getItem('login');
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredData = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('filter', filteredData);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const onClickLogin = () => {
        if (isLogin) {
            return;
        } else {
            navigate('/login');
        }
    };

    const onClickSearchItem = (id) => {
        setSearchText('');
        navigate(`/product/${id}`);
    };

    const onClickBrand = (brand) => {
        navigate(`/cardList`, {
            state: brand,
        });
        toggleDropdown(false);
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
                                <li key={i} className="header-search-li" onClick={() => onClickSearchItem(item.id)}>
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
                    <img src="/img/account.png" className="header-icon" onClick={onClickLogin} />
                    <img src="/img/cart.png" className="header-icon2" onClick={() => navigate('/myCart')} />
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
                        Brands{' '}
                        <img
                            src="/img/arrow.png"
                            className={isDropdownOpen ? 'header-arrow-img-up' : 'header-arrow-img-down'}
                        />
                    </span>

                    {isDropdownOpen && (
                        <ul className="category-dropdown">
                            <li onClick={() => onClickBrand('AYNTEK')}>AYNTEK</li>
                            <li onClick={() => onClickBrand('AYANEO')}>AYANEO</li>
                            <li onClick={() => onClickBrand('ANBERNIC')}>ANBERNIC</li>
                            <li onClick={() => onClickBrand('ANBERNICRG')}>ANBERNICRG</li>
                            <li onClick={() => onClickBrand('GKD')}>GKD</li>
                            <li onClick={() => onClickBrand('MIYOO')}>MIYOO</li>
                            <li onClick={() => onClickBrand('RETROID POCKET')}>Retroid Pocket</li>
                            <li onClick={() => onClickBrand('POWKIDDY')}>POWKIDDY</li>
                        </ul>
                    )}
                </div>
                <span className="categories-item">Shop Gift Guide</span>
                <span
                    className="categories-item"
                    onClick={() => {
                        navigate('/contact');
                    }}
                >
                    Contact
                </span>
                <span className="categories-item2">FAQ</span>
            </div>
        </>
    );
}

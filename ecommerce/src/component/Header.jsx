import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { useState, useEffect, useRef } from 'react';
import products from './goods';


export default function Header() {
    const isLogin = localStorage.getItem('login');
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMusicButton, setShowMusicButton] = useState(false); // 是否显示按钮
    const audioRef = useRef(null);

    // 尝试自动播放音乐
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);      // 成功播放
                    setShowMusicButton(false); // 不显示按钮
                })
                .catch((e) => {
                    console.log('自动播放失败，等待用户操作：', e);
                    setShowMusicButton(true); // 显示按钮让用户手动播放
                });
        }
    }, []);

    const filteredData = products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const onClickLogin = () => {
        if (!isLogin) {
            navigate('/login');
        }
    };

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.volume = 0.5;
            audio.play().catch((e) => {
                console.log('用户点击播放失败：', e);
            });
            setIsPlaying(true);
        }
    };

    return (
        <>
            <audio ref={audioRef} loop>
                <source src="/80s-love-synthwave-music-272232.mp3" type="audio/mpeg" />
            </audio>

            {showMusicButton && (
                <button
                    onClick={toggleMusic}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        marginRight: '12%',
                        right: '0',
                        zIndex: 999,
                        backgroundColor:"transparent",
                        padding: '5px',
                        border: '0',
                        borderRadius: '0px',
                        letterSpacing: "2px",
                        cursor: 'pointer'
                    }}
                >
                    <img 
                        src={isPlaying ? "/img/stop.png" : "/img/play.png"} 
                        alt={isPlaying ? "Pause" : "Play"}
                        style={{ height: '60px' }}
                    />
                </button>
            )}

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

                    {searchText && (
                        <ul className="header-search-ul">
                            <p className="header-search-title">PRODUCTS</p>
                            <div className="header-search-border"></div>
                            {filteredData.map((item, i) => (
                                <li key={i} className="header-search-li">
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="header-div">
                    <img src="/img/gamer.png" className="header-title-img" />
                    <h1 className="header-title">BitBack</h1>
                </div>

                <div className="header-icon-div">
                    <img
                        src="/img/account.png"
                        className="header-icon"
                        onClick={onClickLogin}
                    />
                    <img
                        src="/img/cart.png"
                        className="header-icon2"
                        onClick={() => navigate('/myCart')}
                    />
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
                            className={
                                isDropdownOpen
                                    ? 'header-arrow-img-up'
                                    : 'header-arrow-img-down'
                            }
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

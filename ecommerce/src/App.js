import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './component/Header';
import Card from './pages/Card';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/product/:id" element={<Card />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

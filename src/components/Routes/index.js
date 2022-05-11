import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
            <Route path='*' element={<Home/>}/>
                <Route path='/' exact  element={<Home/>}/>
                <Route path='/profil' exact element={<Profil/>}/>
                <Route path='/trending' exact element={<Trending/>}/>
            </Routes>
        </Router>
    );
};

export default index;
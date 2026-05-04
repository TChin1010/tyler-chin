import React, { useEffect, useState } from 'react';
import Footer from '../widgets/Footer';
import Header from '../widgets/header';
import HomeMain from '../widgets/HomeMain';
import PlaylistBar from '../widgets/PlaylistBar';
import './Home.css'
import Div from '../components/html/Div';

export default function Home() {

    return (
        <Div id='home-container'>  
            <Header />
            <Div id='content-container'>
                <PlaylistBar />
                <HomeMain />
            </Div>
            <Footer />
        </Div>
    )
}
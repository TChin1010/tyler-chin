import React, { useEffect, useState } from 'react';
import Footer from '../widgets/Footer';
import Header from '../widgets/Header';
import PlaylistBar from '../widgets/PlaylistBar';
import MyProjectContentContainer from '../widgets/MyProjectContentContainer';
import AboutMeContentContainer from '../widgets/AboutMeContentContainer';
import Div from '../components/html/Div';
import ClickToStart from '../widgets/ClickToStart';
import './Home.css';

export type View = 'projects' | 'about' | 'contact' | 'music' | 'food';

export default function Home() {
    const [activeContent, setActiveContent] = useState<View>('projects')

    return (
        <>
            <ClickToStart></ClickToStart>
            <Div id='home-container'>  
                <Header />
                <Div id='content-container'>
                    <PlaylistBar onSelect={setActiveContent} />
                    {activeContent === 'projects' && <MyProjectContentContainer />}
                    {activeContent === 'about' && <AboutMeContentContainer />}
                </Div>
                <Footer />
            </Div>
        </>
    )
}

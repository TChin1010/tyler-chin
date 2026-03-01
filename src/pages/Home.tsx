import React from 'react'
import SpaceCanvas from '../components/html/SpaceCanvas'
import StarCanvas from '../components/html/StarCanvas'
import Header from '../widgets/header'

import { useTranslation } from 'react-i18next'

import './Home.css'



export default function Home() {
    const { t } = useTranslation()
    const welcomeDivStyle = {
        height: "100px",
    }
    return (
        <>  
        <SpaceCanvas />
        <StarCanvas />
        <Header></Header>
        <div style={{height: '1000px'}}></div>
        </>
    )
}
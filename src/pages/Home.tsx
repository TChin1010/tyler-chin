import React from 'react'
import SpaceCanvas from '../components/html/SpaceCanvas'
import StarCanvas from '../components/html/StarCanvas'

import { useTranslation } from 'react-i18next'
import './Home.css'

export default function Home() {
    const { t } = useTranslation()
    return (
        <>  
        <div className="test">{t("welcome")}</div>
        <SpaceCanvas />
        <StarCanvas />
        </>
    )
}
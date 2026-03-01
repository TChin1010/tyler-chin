import React, { useEffect, useState } from "react"
import LANGUAGES from "../utils/i18n/langCodes"
import  Div from '../components/html/Div'
import languageSelectorStyle from "./LanguageSelect"
import { ReactSelect } from "../components/html/Select"

// language selector css

const options = [
    { value: LANGUAGES.ENGLISH, label: 'English' },
    { value: LANGUAGES.SIMPLIFIED_CHINESE, label: '简体中文' },
    { value: LANGUAGES.CANTONESE_CHINESE, label: '粵語' },
]

/**
 * Contains the HTML dom for a header element
 * 
 * @returns the header
 */
export default function Header() {
    const [isScrolling, setScrolling] = useState(false)
    let timeoutId: ReturnType<typeof setTimeout>;;

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(true)
            clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                setScrolling(false)
            }, 500)
        }
        window.addEventListener('scroll', handleScroll)
    }, [])
    return (
        <Div className = {'main-header'} id={isScrolling ? 'scrolling-header' : ''}>
            <ReactSelect options={options} styles={languageSelectorStyle}></ReactSelect>
        </Div>
    )
}
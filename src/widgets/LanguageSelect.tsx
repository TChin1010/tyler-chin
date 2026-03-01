import { StylesConfig } from 'react-select';

const WIDTH = "200px"
const OPTION_HEIGHT = "20px"

// applies styles for controlling selecting options
// and what happens
export const languageSelectorStyle: StylesConfig = {
    container: (state) => ({
        ...state,
        width: WIDTH,
        backgroundColor: 'var(--language-dropdown-bg)',
    }),
    menu: (state) => ({
        ...state,
        width: WIDTH,
        backgroundColor: 'var(--language-dropdown-bg)',
    }),
    control: () => ({
        backgroundColor: 'var(--language-dropdown-bg)',
        color: 'white',
        fontSize: 30,
        width: WIDTH,
        textAlign: "center"
    }),
    option: () => ({
        backgroundColor: 'var(--language-dropdown-bg)',
        width: WIDTH,
        height: "60px",
        fontSize: 30,
        color: 'white',
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white', // Change this to your preferred macro or color
    }),
}

export default languageSelectorStyle;
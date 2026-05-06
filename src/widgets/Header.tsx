/**
 * @fileoverview Contains parts of the footer
 */
import React, {useState} from 'react';
import Select from 'react-select';
import LanguageMacros from '../utils/i18n/LanguageMacros';
import DefaultStyle from '../utils/React-Select/DefaultSelect';
import { useTranslation } from 'react-i18next';
import './Header.css';

type Option = {
    value: String,
    label: String
}

const options: Option[]= [
    { value: LanguageMacros.English, label: "English" },
    { value: LanguageMacros.Chinese, label: "中文" },
    { value: LanguageMacros.Cantonese, label: "粵語" },
];

/**
 * Creates a header with my name, status and langauge options
 * @returns An HTML dom element for the header
 */
export function Header() {
    const { i18n } = useTranslation();
    const [selectedOption, setOption] = useState<Option | null>(options.find(o => o.value === i18n.language) ?? null);

    return (
        <header className={'header'}>
            <h2>Tyler Chin</h2>
            <h3> Currently searching for an internship</h3>
            <Select
                styles={DefaultStyle}
                value={selectedOption}
                options={options}
                onChange={setOption}
            />
        </header>

    );
}

export default Header;

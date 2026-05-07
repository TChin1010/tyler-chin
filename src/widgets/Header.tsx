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
    const { t, i18n } = useTranslation("Header");
    const [selectedOption, setOption] = useState<Option | null>(options.find(o => o.value === i18n.language) ?? null);

    const selectLanguage = (option: Option | null) => {
        if (option) {
            i18n.changeLanguage(option.value.toString());
            setOption(option);
        }
    };

    return (
        <header className={'header'}>
            <h2>{t('name')}</h2>
            <h3>{t('status')}</h3>
            <Select
                isSearchable={false}
                styles={DefaultStyle}
                value={selectedOption}
                options={options}
                onChange={selectLanguage}
            />
        </header>

    );
}

export default Header;

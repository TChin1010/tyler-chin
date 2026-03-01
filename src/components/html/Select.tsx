import React from 'react';
import Select, { StylesConfig } from 'react-select'

type SelectProps = {
    options?: { value: string; label: string }[],
    styles: StylesConfig<{ value: string; label: string; }>
}
export function ReactSelect(props: SelectProps) {
    return <Select {...props} ></Select>
}
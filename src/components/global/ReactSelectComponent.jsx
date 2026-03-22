import React, { useState } from "react";
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import styles from './global.module.css';

const ReactSelectComponent = (props) => {
    const {
        className = '',
        placeholder = 'Select',
        onChange,
        options,
        isMulti = false,
        value = {},
        label = '',
        required = false,
        error,
        menuIsOpen
    } = props;


    return (
        <div className={`${styles.customSelectGrp}`}>
            {
                label &&
                <Form.Label className={`${styles.custom_formLabel}`}>
                    {label}
                    {
                        required &&
                        <span className={`${styles.labelMandatory} ps-1`}>*</span>
                    }
                </Form.Label>
            }
            <Select
                options={options}
                className={styles.customSelectWrapper}
                classNamePrefix={`customSelect`}
                placeholder={placeholder}
                isMulti={isMulti}
                // value={value}
                onChange={onChange}
                // defaultValue={options[0]}
                menuIsOpen={menuIsOpen}
            />
            {
                error &&
                <Form.Label className='text-danger mt-1'>{error}</Form.Label>
            }
        </div>
    )
};

export default ReactSelectComponent;
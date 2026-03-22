import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import styles from './global.module.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatepickerComponent = (props) => {
    const {
        icon,
        date,
        className = '',
        placeholder = 'Select',
        onChange,
        disabled = false,
        label = '',
        error = '',
        required = false
    } = props;



    return (
        <div className={`${className} ${styles.customDatepicker}`}>
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
            <div>
                <DatePicker
                    placeholderText={placeholder}
                    showIcon={icon ? true : false}
                    selected={date}
                    onChange={(date) => onChange(date)}
                    icon={icon && <FaCalendarAlt />}

                />
            </div>
            {
                error &&
                <Form.Label className='text-danger mt-1'>{error}</Form.Label>
            }
        </div>
    )
};

export default DatepickerComponent;
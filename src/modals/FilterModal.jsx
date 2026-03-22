import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Form } from 'react-bootstrap';
import InputComponent from '../components/input/Input';
import ReactSelectComponent from '../components/global/ReactSelectComponent';
import ButtonComponent from '../components/button/Button';
import DatepickerComponent from '../components/global/DatepickerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createPet, fetchUserDetails } from '../features/pets/petSlice';
import { toast } from "sonner";

const FilterModal = (props) => {
    const { show, handleClose, onApply } = props;

    const ALL_FILTERS = [
        { key: 'ownershipType', label: 'Ownership Type', type: 'select' },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'species', label: 'Species', type: 'select' },
        { key: 'color', label: 'Color', type: 'text' },
        { key: 'gender', label: 'Gender', type: 'select' },
        { key: 'reproductiveStatus', label: 'Reproductive Status', type: 'select' },
        { key: 'bloodGroup', label: 'Blood Group', type: 'select' },
        { key: 'temperament', label: 'Temperament', type: 'select' },
    ];

    const OPTIONS = {
        ownershipType: [
            { value: 'household', label: 'Household Pet' },
            { value: 'stray', label: 'Rescue/Shelter' },
        ],
        species: [
            { value: 'dog', label: 'Dog' },
            { value: 'cat', label: 'Cat' },
        ],
        gender: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ],
        reproductiveStatus: [
            { value: 'intact', label: 'Intact' },
            { value: 'spayed', label: 'Spayed' },
        ],
        bloodGroup: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 'c', label: 'c' }
        ],
        temperament: [
            { value: 'independent ', label: 'Independent' },
            { value: 'calm', label: 'Calm' },
            { value: 'friendly', label: 'Friendly' },
        ],
    };


    const [step, setStep] = useState('select');
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [filterValues, setFilterValues] = useState({});


    const handleCheck = (key) => {
        setCheckedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleAdd = () => {
        if (checkedKeys.length === 0) return;
        setStep('fill');
    };

    const handleValueChange = (key, value) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        const payload = {};
        checkedKeys.forEach((key) => {
            const val = filterValues[key];
            if (!val) return;
            // select fields return option object, text fields return string
            if (typeof val === 'object' && val.value) {
                payload[key] = [val.value];
            } else if (typeof val === 'string' && val.trim()) {
                payload[key] = val.trim();
            }
        });
        onApply(payload);
        handleClose();
    };

    const handleResetAll = () => {
        setCheckedKeys([]);
        setFilterValues({});
        setStep('select');
        onApply({});
    };


    const selectedFilters = ALL_FILTERS.filter((f) => checkedKeys.includes(f.key));

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='CustomOffcanva'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {step === 'select' && (
                    <div className='filterSelectStep'>
                        <p className='filterByLabel mb-3'>Filter by :</p>

                        {ALL_FILTERS.map((filter) => (
                            <div key={filter.key} className='filterCheckItem mb-3'>
                                <input
                                    type='checkbox'
                                    id={filter.key}
                                    checked={checkedKeys.includes(filter.key)}
                                    onChange={() => handleCheck(filter.key)}
                                    className='filterCheckbox'
                                />
                                <label htmlFor={filter.key} className='filterCheckLabel'>
                                    {filter.label}
                                </label>
                            </div>
                        ))}

                        <div className='mt-4 d-flex justify-content-end'>
                            <ButtonComponent
                                btnText='Add'
                                className='themeBtn fw-600'
                                onClick={handleAdd}
                                disabled={checkedKeys.length === 0}
                            />
                        </div>
                    </div>
                )}


                {step === 'fill' && (
                    <div className='filterFillStep'>
                        <ButtonComponent
                            className='addFilterLink mb-3'
                            btnText=' + Add Filter'
                            onClick={() => setStep('select')}
                        />

                        {selectedFilters.map((filter) => (
                            <div key={filter.key} className='mb-3'>
                                {filter.type === 'select' ? (
                                    <ReactSelectComponent
                                        options={OPTIONS[filter.key] || []}
                                        value={filterValues[filter.key] || null}
                                        onChange={(option) => handleValueChange(filter.key, option)}
                                        placeholder={filter.label}
                                    />
                                ) : (
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder={filter.label}
                                        value={filterValues[filter.key] || ''}
                                        onChange={(e) => handleValueChange(filter.key, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}

                        <div className='mt-4 d-flex align-items-center justify-content-end gap-3'>
                            <ButtonComponent
                                btnText='Reset All'
                                className='resetBtn fw-600'
                                onClick={handleResetAll}
                            />
                            <ButtonComponent
                                btnText='Apply Filters'
                                className='themeBtn fw-600'
                                onClick={handleApply}
                            />
                        </div>
                    </div>
                )}


            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default FilterModal
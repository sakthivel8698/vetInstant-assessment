import React, { useEffect, useState, useRef } from 'react';
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
import { FaRegUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const PetRegisterModal = (props) => {
    const dispatch = useDispatch();
    const { userDetails, userLoading } = useSelector((state) => state.pets);
    const { show, handleClose } = props;
    const [species, setSpecies] = useState(null)
    const [year, setYear] = useState(null)
    const [breed, setBreed] = useState(null)
    const [gender, setGender] = useState(null)
    const [reproductiveStatus, setReproductiveStatus] = useState(null)
    const [bloodGroup, setBloodGroup] = useState(null)
    const [temperament, setTemparament] = useState(null)
    const [dob, setDob] = useState();
    const [errors, setErrors] = useState({});
    const fileRef = useRef();
    const [imagePreview, setImagePreview] = useState(null);



    const [form, setForm] = useState({
        ownershipType: 'household',
        petName: '',
        color: '',
        weight: '',
        rfid: '',
        petImage: null,
    });


    const speciesOptions = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
    ]

    const yearOptions = [
        { value: 'year', label: 'Year' },
        { value: 'month', label: 'Month' },
    ]

    const breedOptions = [
        { value: 'labrador', label: 'Labrador' },
        { value: 'akita', label: 'Akita' },
    ]

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ]

    const reproductiveStatusOptions = [
        { value: 'intact', label: 'Intact' },
        { value: 'spayed', label: 'Spayed' },
    ]

    const bloodGroupOptions = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'c' }
    ]

    const temperamentOptions = [
        { value: 'independent ', label: 'Independent' },
        { value: 'calm', label: 'Calm' },
        { value: 'friendly', label: 'Friendly' },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, petImage: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const validate = () => {
        const newErrors = {};
        if (!form.petName) newErrors.petName = 'Name is required';
        if (!species) newErrors.species = 'Species is required';
        if (!dob) newErrors.dob = 'DOB is required';
        if (!breed) newErrors.breed = 'Breed is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {

        if (!validate()) return;

        const fd = new FormData();
        fd.append('ownershipType', form.ownershipType);
        fd.append('petName', form.petName);
        fd.append('petType', species?.value || '');
        fd.append('breed', breed?.value || '');
        fd.append('gender', gender?.value || '');
        fd.append('color', form.color);
        fd.append('weight', form.weight);
        fd.append('rfid', form.rfid);
        fd.append('reproductiveStatus', reproductiveStatus?.value || '');
        fd.append('bloodGroup', bloodGroup?.value || '');
        fd.append('temperament', temperament?.value || '');

        if (dob) {
            const formatted = new Date(dob).toISOString().split('T')[0];
            fd.append('dob', formatted);
        }

        if (form.petImage) {
            fd.append('petImage', form.petImage);
        }

        const result = await dispatch(createPet(fd));

        if (createPet.fulfilled.match(result)) {
            toast.success('Pet registered successfully!');
            handleClose();
        } else {
            toast.error(result.payload || 'Failed to register pet');
        }



    }



    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' className='CustomOffcanva'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Pet Registration</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='registerOffcanva'>
                    <div className="stepper">
                        <div className="step">
                            <FaCheckCircle className='steperIcon' />
                            <span className="step-label">Step 1</span>
                        </div>
                        <div className="step-line"></div>
                        <div className="step">
                            <FaCheckCircle className='steperIcon' />
                            <span className="step-label">Step 2</span>
                        </div>
                    </div>
                    <div className='userProfile mt-4 mx-3 mb-4'>
                        <div className='ProfInfo mb-2'>
                            <FaRegUserCircle className='icon' />
                            <p className='name'>{userDetails?.name || '-'}</p>
                        </div>
                        <div className='ProfInfo mb-2'>
                            <MdEmail className='icon' />
                            <p className='name'>{userDetails?.email || '-'}</p>
                        </div>
                        <div className='ProfInfo'>
                            <FaPhoneAlt className='icon' />
                            <p className='name'>{userDetails?.mobile || '-'}</p>
                        </div>
                    </div>
                    <div className='profilePicture mb-4'>
                        <h5 className='title'>Profile Picture</h5>

                        <div className='profileUploadWrap' onClick={() => fileRef.current.click()}>
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt='pet'
                                    className='profilePreviewImg'
                                />
                            ) : (
                                <div className='profilePlaceholder'>
                                    <FaRegUser className='placeholderIcon' />
                                </div>
                            )}
                            <div className='editBadge'>
                                <MdEdit />
                            </div>
                        </div>
                        
                        <input
                            type='file'
                            accept='image/*'
                            ref={fileRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='ownershipType'>
                        <h5 className='title'>Ownership Type:</h5>
                        <div className='d-flex align-items-center gap-3 mt-2'>
                            <Form.Check
                                type={'radio'}
                                id={`Household`}
                                label={'Household Pet'}
                                name='ownershipType'
                                value='household'
                                checked={form.ownershipType === 'household'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type={'radio'}
                                id={`Rescue`}
                                label={'Rescue/Shelter'}
                                name='ownershipType'
                                value='stray'
                                checked={form.ownershipType === 'stray'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='registerFormData mt-3'>
                            <div className='row'>
                                <div className='col-lg-6 mb-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Name*'
                                        name='petName'
                                        value={form.petName}
                                        onChange={handleChange}
                                        error={errors.petName}
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={speciesOptions}
                                        value={species}
                                        placeholder='Species*'
                                        onChange={(option) => {
                                            setSpecies(option);
                                            if (errors.species) setErrors((p) => ({ ...p, species: '' }));
                                        }}
                                        error={errors.species}
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <DatepickerComponent
                                        className='form_datePicker'
                                        icon={false}
                                        placeholder='DOB*'
                                        date={dob}
                                        onChange={(date) => {
                                            setDob(date);
                                            if (errors.dob) setErrors((p) => ({ ...p, dob: '' }));
                                        }}
                                        error={errors.dob}
                                    />
                                </div>
                                {/* <div className='col-lg-6 mb-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Age in Year*'
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={yearOptions}
                                        value={year}
                                        onChange={(option) => setYear(option)}
                                        placeholder='Year*'
                                    />
                                </div> */}

                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={breedOptions}
                                        value={breed}
                                        onChange={(option) => {
                                            setBreed(option);
                                            if (errors.breed) setErrors((p) => ({ ...p, breed: '' }));
                                        }}
                                        placeholder='Breed*'
                                        error={errors.breed}
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Color*'
                                        name='color'
                                        value={form.color}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={genderOptions}
                                        value={gender}
                                        onChange={(option) => {
                                            setGender(option);
                                            if (errors.gender) setErrors((p) => ({ ...p, gender: '' }));
                                        }}
                                        placeholder='Gender'
                                        error={errors.gender}
                                    />
                                </div>

                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={reproductiveStatusOptions}
                                        value={reproductiveStatus}
                                        onChange={(option) => setReproductiveStatus(option)}
                                        placeholder='Reproductive Status'
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Weight'
                                        name='weight'
                                        value={form.weight}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Microchip Number'
                                        name='rfid'
                                        value={form.rfid}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={bloodGroupOptions}
                                        value={bloodGroup}
                                        onChange={(option) => setBloodGroup(option)}
                                        placeholder='Blood Group'
                                    />
                                </div>
                                <div className='col-lg-6 mb-3'>
                                    <ReactSelectComponent
                                        options={temperamentOptions}
                                        value={temperament}
                                        onChange={(option) => setTemparament(option)}
                                        placeholder='Temperament'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 d-flex align-items-center justify-content-end gap-3 flex-wrap'>
                        <ButtonComponent
                            btnText='Register + Book'
                            className='registerBtn themeBtn fw-600'
                        />
                        <ButtonComponent
                            btnText='Register'
                            className='registerBtn themeBtn fw-600'
                            onClick={() => handleRegister(false)}
                        />
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default PetRegisterModal
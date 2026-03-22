import React, { useState } from 'react'
import ImageComponent from '../components/images/Image'
import InputComponent from '../components/input/Input'
import ButtonComponent from '../components/button/Button'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "sonner";

function Login() {
    const [showPwd, setShowPwd] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const validate = () => {
        let errors = {};

        if (!form.username) {
            errors.username = "Username is required";
        }

        if (!form.password) {
            errors.password = "Password is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        const result = await dispatch(loginUser({
            username: form.username,
            password: form.password
        }));


        if (loginUser.fulfilled.match(result)) {
            toast.success("Login successful!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000)
        } else {
            toast.error(result.payload || "Login failed");
        }
    };


    return (
        <div className='login row m-0'>
            <div className='col-12 col-lg-6'>
                <div className='loginForm'>
                    <div className='loginContent'>
                        <ImageComponent
                            src='logo'
                            alt='logo'
                            className='logo'
                        />
                        <div className='login_card'>
                            <h2 className='title'>
                                Welcome Back
                            </h2>

                            <div className='mt-3'>
                                <div className='userNameField'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Username'
                                        label='Username'
                                        required
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        error={errors.username}
                                    />

                                    <MdOutlineEmail className='icon' />
                                </div>


                                <div className='previewPwdInp mt-2 mt-md-3'>
                                    <InputComponent
                                        className='loginFormInp'
                                        placeholder='Password'
                                        type={!showPwd ? 'password' : "text"}
                                        label='Password'
                                        required
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <span onClick={() => setShowPwd(prev => !prev)} className='cursor-pointer inpIcon'>
                                        {
                                            showPwd ?
                                                <FaRegEye className='icon' /> :
                                                <FaRegEyeSlash className='icon' />
                                        }
                                    </span>
                                </div>


                            </div>
                            <div className='mt-4'>
                                <ButtonComponent
                                    btnText='Login'
                                    className='loginBtn themeBtn fw-600'
                                    onClick={handleLogin}
                                />
                            </div>
                            <div className='forgotPwd-lbl mt-3'>

                                <Link to='/' className='linkNav'>
                                    Forgot Password?
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-6 d-none d-lg-block'>
                <div className='loginBannerBg'>
                    <ImageComponent
                        src='loginBanner'
                        alt='loginBanner'
                        className='loginBanner'
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
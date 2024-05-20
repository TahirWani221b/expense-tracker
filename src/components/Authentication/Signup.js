import React, { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [fieldsNotEmpty, setFieldsNotEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleFieldsStatus = useCallback(() => {
        if (emailRef.current.value.trim() && passwordRef.current.value.trim() && confirmPasswordRef.current.value.trim()) {
            setFieldsNotEmpty(true);
        } else {
            setFieldsNotEmpty(false);
        }
    }, []);

    const handleSignUpFormSubmission = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';

        if (!email.includes('@')) {
            setEmailError('*Please enter a valid email');
            emailRef.current.focus();
            emailRef.current.classList.add('invalid');
            return;
        } else {
            emailRef.current.classList.remove('invalid');
            setEmailError('');
        }

        if (password.length < 5) {
            setPasswordError('*Password must be at least 5 characters long');
            passwordRef.current.focus();
            passwordRef.current.classList.add('invalid');
            return;
        } else {
            setPasswordError('');
            passwordRef.current.classList.remove('invalid');
        }

        if (password !== confirmPassword) {
            setPasswordError('*Passwords do not match');
            confirmPasswordRef.current.focus();
            confirmPasswordRef.current.classList.add('invalid');
            return;
        } else {
            setPasswordError('');
            confirmPasswordRef.current.classList.remove('invalid');
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzhdWLygRRfq6wzGoWWj0oC8BSHT8XHRs', { email, password, returnSecureToken: true }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        setIsLoading(false);
    };

    return (
        <div className='sign-up-container'>
            {isLoading && <div className='loading'><div className='loader'></div></div>}
            <div className='sign-up-form'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUpFormSubmission}>
                    <input
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                        onChange={handleFieldsStatus}
                    />
                    {emailError && <small className="error-message">{emailError}</small>}
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        onChange={handleFieldsStatus}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                        onChange={handleFieldsStatus}
                    />
                    {passwordError && <small className="error-message">{passwordError}</small>}
                    <button
                        type="submit"
                        className={`${!fieldsNotEmpty && 'invalid'}`}
                        onClick={!fieldsNotEmpty ? (event) => event.preventDefault() : undefined}
                    >
                        Sign Up
                    </button>
                </form>
                <div className='sign-up-login-link'>
                    <p>Have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;

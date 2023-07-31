import React, { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { tailWindCss } from '../tailwindcss'
import { textBlack } from '../tailwindcss'
import { errorText } from '../functions/errorText.jsx'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { setLogin } from '../state'

const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    }
    //use multer
    const handleSubmit = async (values, onSubmitProps) => {
        const formData = new FormData()

        for (let value in values) {
            if (value != 'confirmPassword') {
                formData.append(value, values[value])
            }
        }

        const savedUserResponse = await fetch(
            'http://localhost:8888/register/user',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
        )

        const savedUser = await savedUserResponse.json()

        if (savedUser) {
            const userData = {
                username: values.username,
                password: values.password
            }
            const loggedInResponse = await fetch(
                'http://localhost:8888/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }
            )

            const loggedIn = await loggedInResponse.json()

            console.log(loggedIn)
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                )

                navigate('/home')
            }
        }
    }

    const Schema = yup.object().shape({
        username: yup
            .string()
            .min(4, 'must be at least 4 characters')
            .required('required'),
        password: yup
            .string()
            .min(7, 'must be at least 7 characters')
            .required('required'),
        last_name: yup
            .string()
            .min(4, 'must be at least 4 characters.')
            .required('required'),
        first_name: yup
            .string()
            .min(4, 'must be at least 4 characters.')
            .required('required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('required')
    })

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Schema}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                    handleBlur
                }) => (
                    <Form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        className='mx-auto my-5 flex min-w-full flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-5 shadow-lg'
                    >
                        {console.log(errors)}
                        <div className='flex flex-col gap-1 px-2 '>
                            <div className='flex flex-col '>
                                <label
                                    className={`text-sm font-semibold text-neutral`}
                                    htmlFor='username'
                                >
                                    Username
                                </label>

                                <input
                                    className={`max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.username && touched.username
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='username'
                                    placeholder='Enter Username'
                                ></input>
                                {errorText(errors.username, touched.username)}
                            </div>

                            <div className='flex flex-col '>
                                <label
                                    className={`text-sm font-semibold text-neutral`}
                                    htmlFor='first_name'
                                >
                                    First Name
                                </label>

                                <input
                                    className={`max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.first_name && touched.first_name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='first_name'
                                    placeholder='Enter First name'
                                ></input>
                                {errorText(
                                    errors.first_name,
                                    touched.first_name
                                )}
                            </div>

                            <div className='flex flex-col '>
                                <label
                                    className={`text-sm font-semibold text-neutral`}
                                    htmlFor='last_name'
                                >
                                    Last Name
                                </label>

                                <input
                                    className={`max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.last_name && touched.last_name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='last_name'
                                    placeholder='Enter Last name'
                                ></input>
                                {errorText(errors.last_name, touched.last_name)}
                            </div>

                            <div className='flex flex-col '>
                                <label
                                    className={`text-sm font-semibold text-neutral`}
                                    htmlFor='password'
                                >
                                    Password
                                </label>

                                <input
                                    className={`max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.password && touched.password
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    value={values.password}
                                    onChange={handleChange}
                                    id='password'
                                    placeholder='Password'
                                    type='password'
                                    onBlur={handleBlur}
                                ></input>
                                {errorText(errors.password, touched.password)}
                            </div>

                            <div className='flex flex-col '>
                                <label
                                    className={`text-sm font-semibold text-neutral`}
                                    htmlFor='confirmPassword'
                                >
                                    Confirm Password
                                </label>

                                <input
                                    className={`max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    id='confirmPassword'
                                    placeholder='Confirm Password'
                                    type='password'
                                    onBlur={handleBlur}
                                ></input>
                                {errorText(
                                    errors.confirmPassword,
                                    touched.confirmPassword
                                )}
                            </div>
                        </div>

                        <button
                            className='btn2 relative  overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider '
                            type='submit'
                        >
                            <span className='bg-green-light absolute inset-0 bg-neutral'></span>
                            <span
                                className={`absolute inset-0 flex items-center  justify-center text-primary`}
                            >
                                Submit
                            </span>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Registration

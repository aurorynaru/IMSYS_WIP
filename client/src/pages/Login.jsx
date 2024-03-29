import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../state/index.js'
import Navbar from '../components/Navbar.jsx'
import { tailWindCss } from '../tailwindcss.js'
import { tailwindError } from '../tailwindcss.js'
import { errorText } from '../functions/errorText.jsx'
import { ipAddress } from '../functions/ip.jsx'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [resError, setResError] = useState('')
    const initialValues = {
        username: '',
        password: ''
    }

    const schema = yup.object().shape({
        username: yup
            .string()
            .min(4, 'Must be at least 4 characters')
            .required('Required'),
        password: yup
            .string()
            .min(4, 'Must be at least 4 characters')
            .required('Required')
    })

    const handleSubmit = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(`${ipAddress}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const loggedIn = await loggedInResponse.json()
        if (loggedIn.error) {
            setResError(loggedIn.error)
        }

        if (loggedIn) {
            onSubmitProps.resetForm()
            dispatch(
                setLogin({
                    user: loggedIn.userData,
                    token: loggedIn.token
                })
            )

            navigate('/home')
        }
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
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
                        <div className='flex flex-col gap-3 px-2 '>
                            <div className='flex flex-col text-black '>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='username'
                                >
                                    Username
                                </label>

                                <input
                                    className={` max-w-3/5 input-primary input input-sm w-3/5 rounded-sm text-primary ${
                                        errors.username && touched.username
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='username'
                                    placeholder='Username'
                                ></input>
                                {errorText(errors.username, touched.username)}
                            </div>

                            <div className='flex flex-col text-black'>
                                <label
                                    className='text-sm font-semibold text-neutral'
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
                        </div>
                        <p
                            className={`w-full text-center text-sm text-red-500 ${
                                resError ? '' : 'invisible'
                            }`}
                        >
                            {resError ? resError : 'error'}
                        </p>

                        <button
                            className='btn2 relative  overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider '
                            type='submit'
                        >
                            <span className='absolute inset-0 bg-neutral '></span>
                            <span className='absolute inset-0 flex items-center  justify-center text-primary'>
                                Log in
                            </span>
                            Log in
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login

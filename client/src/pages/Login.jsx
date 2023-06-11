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
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [resError, setResError] = useState('')
    const initialValues = {
        username: '',
        password: ''
    }

    const schema = yup.object().shape({
        username: yup.string().min(4).required('Required'),
        password: yup.string().min(4).required('Required')
    })

    const handleSubmit = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch('http://localhost:8888/login', {
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
        console.log(loggedIn)
        if (loggedIn) {
            onSubmitProps.resetForm()
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            )

            navigate('/home')
        }
    }
    return (
        <div className='min-h-screen'>
            <Navbar />
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
                        className='mx-auto mt-10 flex w-1/3  flex-col gap-1 rounded-md pt-5 bg-base-200 shadow-lg '
                    >
                        {console.log(errors)}
                        <div className='flex flex-col gap-3 px-2 '>
                            <div className='flex flex-col text-black'>
                                <label
                                    className='text-sm text-primary-focus  font-semibold'
                                    htmlFor='username'
                                >
                                    Username
                                </label>

                                <input
                                    className={`${tailWindCss} ${
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
                                    className='text-sm  text-primary-focus font-semibold'
                                    htmlFor='password'
                                >
                                    Password
                                </label>

                                <input
                                    className={`${tailWindCss} ${
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
                            <span className='absolute inset-0 bg-blue-light '></span>
                            <span className='absolute inset-0 flex items-center  justify-center text-black'>
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

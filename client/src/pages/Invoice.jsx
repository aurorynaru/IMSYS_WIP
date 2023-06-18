import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CustomInput from '../components/CustomInput'
import CustomSelect from '../components/CustomSelect'
import CustomText from '../components/CustomText'
import CustomTextBox from '../components/CustomTextBox'
const Invoice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [customID, setCustomID] = useState('')
    const [resError, setResError] = useState('')
    const [itemPrice, setItemPrice] = useState(0)

    //supplier
    const [isLoadingClient, setIsLoadingClient] = useState(false)
    const [searchResultClient, setSearchResultClient] = useState([])
    const [ClientValue, setClientValue] = useState('')

    useEffect(() => {
        setCustomID(generateCustomID('None'))
    }, [])

    const initialValues = {
        invoice_number: '',
        client: '',
        address: '',
        items: [],
        date_created: '',
        terms: '',
        recipient: '',
        vatable_sales: '',
        vat: '',
        total_sales_vat_inclusive: '',
        less_vat: '',
        net_vat: '',
        total_amount_due: '',
        user_id: '',
        status: ''
    }

    const Schema = yup.object().shape({
        invoice_number: yup.number().min(4).required('required'),
        client: yup.string().min(3).max(100).required('required'),
        address: yup.string(),
        date_created: yup.date().required('required'),
        terms: yup.number(),
        recipient: yup.string().required('required'),
        vatable_sales: yup.number().positive('Number must be positive'),
        vat: yup
            .number()
            .min(7)
            .positive('Number must be positive')
            .required('required'),
        total_sales_vat_inclusive: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        less_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        net_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        total_amount_due: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        user_id: '',
        status: ''
    })

    const handleSubmit = (values) => {
        console.log(values)
    }

    const handleSearchClient = async (query) => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/Client/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()
                setSearchResultClient(newSearch)
                setIsLoadingClient(false)
            }
        } else {
            setSearchResultClient([])
            setIsLoadingClient(false)
        }
    }

    return (
        <>
            <Navbar />
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
                            className='mx-auto my-5 flex w-1/3 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-3 shadow-lg'
                        >
                            <div className='flex flex-col gap-3 px-2 '>
                                <h1 className='text-lg font-medium '>
                                    Create Invoice
                                </h1>
                                <div className='flex flex-col gap-1'>
                                    <label
                                        className='flex items-center text-left text-sm font-semibold text-neutral'
                                        htmlFor='brand'
                                    >
                                        Client Name
                                        <span
                                            className='tooltip tooltip-right ml-1 before:text-xs'
                                            data-tip='brand name'
                                        >
                                            <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                        </span>
                                    </label>

                                    <input
                                        className={` input-primary input input-sm rounded-sm text-primary ${
                                            errors.brand && touched.brand
                                                ? ` border-red-500 focus:ring-red-500`
                                                : ''
                                        }`}
                                        value={values.brand}
                                        onChange={(event) => {
                                            const value = event.target.value
                                            debounceSubmitBrandName(value)
                                            setCustomID(generateCustomID(value))
                                            setFieldValue('custom_id', value)
                                            setFieldValue('brand', value)
                                        }}
                                        onBlur={handleBlur}
                                        id='brand'
                                        placeholder='Enter Brand name'
                                    ></input>
                                    {searchResult.length > 0 ? (
                                        <div className=' min-w-3/3 flex h-fit max-h-[180px]  w-2/3 flex-col items-center overflow-auto rounded-md  border-2 border-gray-600  bg-base-300 p-2'>
                                            {searchResult.map((elem) => {
                                                if (elem) {
                                                    return (
                                                        <div
                                                            className=' flex h-fit w-full cursor-pointer  items-center  justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                                                            key={elem.id}
                                                        >
                                                            <p
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    const text =
                                                                        event
                                                                            .target
                                                                            .innerText

                                                                    setSearchResult(
                                                                        []
                                                                    )
                                                                    setFieldValue(
                                                                        'brand',
                                                                        text
                                                                    )

                                                                    const custom =
                                                                        setCustomID(
                                                                            generateCustomID(
                                                                                text
                                                                            )
                                                                        )

                                                                    setFieldValue(
                                                                        'custom_id',
                                                                        custom
                                                                    )
                                                                }}
                                                            >
                                                                {elem.name}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    ) : isLoading ? (
                                        <div className=' w-[50px]] flex h-[180px] max-h-[50px] flex-col  items-center justify-center   overflow-auto  rounded-md border-2  border-gray-600 bg-base-300'>
                                            <span className='loading loading-spinner loading-md text-neutral '></span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {errorText(errors.brand, touched.brand)}
                                </div>
                                {console.log(values)}
                            </div>
                            <p
                                className={`w-full text-center text-sm text-red-500 ${
                                    resError ? '' : 'invisible'
                                }`}
                            >
                                {resError ? resError : 'error'}
                            </p>
                            <button
                                className='btn2 relative overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider'
                                type='submit'
                            >
                                <span className='absolute inset-0 bg-neutral '></span>
                                <span className='absolute inset-0 flex items-center  justify-center text-primary'>
                                    Submit
                                </span>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Invoice

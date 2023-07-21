import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CustomInput from '../components/CustomInput'
import CustomSelect from '../components/CustomSelect'
import CustomText from '../components/CustomText'
import CustomTextBox from '../components/CustomTextBox'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { errorText } from '../functions/errorText'
import TableForm from '../components/TableForm'
import Search from '../components/Search'
import { tailwindError } from '../tailwindcss'
import Table from '../components/Table'
const currentDate = new Date()

const Invoice = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const headerArray = ['Quantity', 'Brand', 'Description', 'Price']
    const [resError, setResError] = useState('')
    const [errorItem, setErrorItem] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalSalesVat, setTotalSalesVat] = useState(0)
    const [vat, setVat] = useState(0)
    const [isClientSelected, setIsClientSelected] = useState(false)
    const [status, setStatus] = useState('Invoice Status')
    const [creditLimit, setCreditLimit] = useState(0)
    const [creditUsed, setCreditUsed] = useState(0)

    //supplier
    const [isLoadingClient, setIsLoadingClient] = useState(false)
    const [searchResultClient, setSearchResultClient] = useState([])

    // products
    const [itemsObject, setItemsObject] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState('')
    const [description, setDescription] = useState('')
    const [unitPrice, setUnitPrice] = useState(0)
    const [amount, setAmount] = useState(0)
    const [itemId, setItemId] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])

    //pagination
    const [min, setMin] = useState(0)
    const [max, setMax] = useState('')
    const [brand, setBrand] = useState('')
    const [desc, setDesc] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [sortPagePrice, setSortPagePrice] = useState('')
    const [sortPageQuantity, setSortPageQuantity] = useState('')
    const [sortPageBrandName, setSortPageBrandName] = useState('')
    const [sortPageDesc, setSortPageDesc] = useState('')
    const [totalQuantity, setTotalQuantity] = useState(0)

    //search
    const [brandNameSearch, setBrandNameSearch] = useState('')
    const [descSearch, setDescSearch] = useState('')

    const initialValues = {
        invoice_number: '',
        client: '',
        address: '',
        items: [],
        date_created: currentDate.toISOString().split('T')[0],
        due_date: '',
        tin: '',
        terms: '',
        recipient: '',
        clientId: ''
    }

    const Schema = yup.object().shape({
        invoice_number: yup
            .string()
            .min(4, ' must be atleast 4 numbers')
            .required('required'),
        client: yup.string().min(3).max(100).required('required'),
        address: yup.string().required('required'),
        date_created: yup.date().required('required'),
        due_date: yup.date().required('required'),
        terms: yup.number(),
        recipient: yup.string().required('required'),
        tin: yup
            .string()
            .min(15, 'Tin number must be at least 12 numbers.')
            .max(15, 'Tin number must be at max 12 numbers.')
            .required('Tin number is required')
    })

    const handleSubmit = async (values) => {
        const itemsOjb = {}

        itemsOjb.vatableSales = totalAmount.toFixed(2)
        itemsOjb.TotalAmountDue = totalSalesVat.toFixed(2)
        itemsOjb.vat = vat.toFixed(2)

        values.user_id = user.id

        values.items.push(itemsOjb)
        console.log(values)
        const savedUserResponse = await fetch(
            'http://localhost:8888/register/product',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
        )

        const savedProduct = await savedUserResponse.json()
        if (savedProduct.error) {
            setResError(savedProduct.error)
        }

        if (savedProduct) {
            if (!savedProduct.error) {
                navigate('/register/product')
                onSubmitProps.resetForm()
            }
        }
    }

    const handleSearchClient = async (query) => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/client/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()
                console.log(newSearch)
                setSearchResultClient(newSearch)
                setIsLoadingClient(false)
            }
        } else {
            setSearchResultClient([])
            setIsLoadingClient(false)
        }
    }

    const setLoading = (value) => {
        if (value === 'client') {
            setIsLoadingClient(true)
        }
    }

    const handleSearchProduct = async () => {
        const queryParameters = {}

        const minPrice = min
        const maxPrice = max
        const itemName = brand
        const pageNumber = page
        const pageSize = 10

        if (minPrice !== '') {
            queryParameters.minPrice = minPrice
        }
        if (maxPrice !== '') {
            queryParameters.maxPrice = maxPrice
        }

        if (itemName !== '') {
            queryParameters.brand = itemName
        }
        if (desc !== '') {
            queryParameters.desc = desc
        }

        if (pageNumber) {
            queryParameters.page = pageNumber
        }

        if (pageSize) {
            queryParameters.limit = pageSize
        }

        if (sortPageQuantity) {
            queryParameters.sortQuantity = sortPageQuantity
        }

        if (sortPagePrice) {
            queryParameters.sortPrice = sortPagePrice
        }

        if (sortPageBrandName) {
            queryParameters.sortBrand = sortPageBrandName
        }

        if (sortPageDesc) {
            queryParameters.sortDesc = sortPageDesc
        }

        const url = new URL('http://localhost:8888/api/search/')

        for (const param in queryParameters) {
            url.searchParams.append(param, queryParameters[param])
        }

        try {
            const response = await fetch(url, {
                method: 'GET'
            })

            if (response.ok) {
                const newSearch = await response.json()

                setItemsObject(newSearch)
            } else {
                console.error('Error:', response.status)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        if (selectedItems.length > 0) {
            setTotalAmount((prev) => {
                let amount = 0

                selectedItems.forEach((item) => {
                    amount = amount + item.amount
                })
                return amount
            })
        }
    }, [selectedItems])

    useEffect(() => {
        if (totalAmount > 0) {
            setTotalSalesVat(totalAmount * 0.12 + totalAmount)
            setVat(totalAmount * 0.12)
        } else {
            setTotalSalesVat(0)
            setVat(0)
        }
    }, [totalAmount])

    useEffect(() => {
        if (
            quantity != '' ||
            amount != '' ||
            description != '' ||
            unit != '' ||
            (unitPrice != '' && isClientSelected === true)
        ) {
            setErrorItem(false)
        }

        if (totalQuantity > quantity) {
            setErrorItem(false)
        }
    }, [description, quantity, unit, unitPrice, amount])

    useEffect(() => {
        if (totalSalesVat > 0) {
            if (totalSalesVat > creditLimit) {
                setStatus('Pending Override')
            }
        }
    }, [totalSalesVat])

    useEffect(() => {
        handleSearchProduct()
    }, [
        min,
        max,
        page,
        brand,
        desc,
        limit,
        sortPagePrice,
        sortPageQuantity,
        sortPageDesc,
        sortPageBrandName
    ])
    const debounce = (submit, delay, value) => {
        let timeoutID

        return (...args) => {
            setLoading(value)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                submit(...args)
            }, delay)
        }
    }

    const debounceSubmitClient = debounce(handleSearchClient, 200, 'client')

    const formatCreditLimit = (value) => {
        if (typeof value === 'string') {
            value = value.replace(/\D/g, '')
        }
        if (value.length > 0) {
            value = value.slice(0, 12)
        }

        const formattedValue = Number(value).toLocaleString()

        return formattedValue
    }

    const formatNumber = (value) => {
        if (typeof value === 'string') {
            value = value.replace(/\D/g, '')
        }

        if (value.length > 12) {
            value = value.slice(0, 12)
        }

        let formattedValue = ''
        let groupCount = Math.ceil(value.length / 3)

        for (let i = 0; i < groupCount; i++) {
            let startIndex = i * 3
            let endIndex = startIndex + 3
            let chunk = value.slice(startIndex, endIndex)

            if (i > 0) {
                formattedValue += '-'
            }

            formattedValue += chunk
        }

        return formattedValue
    }

    return (
        <>
            <Navbar />
            <div className='flex w-full'>
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
                            className='mx-5 my-5 flex w-1/2 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-3 shadow-lg'
                        >
                            <div className='flex flex-col gap-3 px-2'>
                                <h1 className='text-lg font-medium '>
                                    Create Invoice
                                </h1>
                                <div className='flex w-full items-center gap-5 '>
                                    <div className='flex w-1/2 flex-col gap-1 '>
                                        <label
                                            className='flex items-center text-left text-sm font-semibold text-neutral'
                                            htmlFor='client'
                                        >
                                            Client Name
                                            <span
                                                className='tooltip tooltip-right ml-1 before:text-xs'
                                                data-tip='client name'
                                            >
                                                <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                            </span>
                                        </label>

                                        <input
                                            className={` input-primary input input-sm rounded-sm text-primary ${
                                                errors.client && touched.client
                                                    ? ` border-red-500 focus:ring-red-500`
                                                    : ''
                                            }`}
                                            value={values.client}
                                            onChange={(event) => {
                                                const value = event.target.value
                                                debounceSubmitClient(value)
                                                setFieldValue('client', value)
                                            }}
                                            onBlur={handleBlur}
                                            id='client'
                                            placeholder='Enter client name'
                                        ></input>
                                        {searchResultClient.length > 0 ? (
                                            <div className='min-w-1/2 max-w-3/4 z-40 flex h-fit  max-h-[180px] w-3/4 flex-col items-center overflow-auto  rounded-md border-2  border-gray-600 bg-base-300 p-2'>
                                                {searchResultClient.map(
                                                    (elem) => {
                                                        if (elem) {
                                                            return (
                                                                <div
                                                                    onMouseEnter={(
                                                                        event
                                                                    ) => {
                                                                        const text =
                                                                            event
                                                                                .target
                                                                                .innerText
                                                                        const startDateObject =
                                                                            new Date(
                                                                                values.date_created
                                                                            )
                                                                        startDateObject.setDate(
                                                                            startDateObject.getDate() +
                                                                                elem.terms
                                                                        )

                                                                        const formattedDate =
                                                                            startDateObject
                                                                                .toISOString()
                                                                                .split(
                                                                                    'T'
                                                                                )[0]

                                                                        setFieldValue(
                                                                            'client',
                                                                            text
                                                                        )
                                                                        setFieldValue(
                                                                            'tin',
                                                                            elem.tin
                                                                        )
                                                                        setFieldValue(
                                                                            'terms',
                                                                            elem.terms
                                                                        )

                                                                        setCreditLimit(
                                                                            elem.credit_limit
                                                                        )

                                                                        setFieldValue(
                                                                            'address',
                                                                            elem.address
                                                                        )

                                                                        setFieldValue(
                                                                            'due_date',
                                                                            formattedDate
                                                                        )

                                                                        setCreditUsed(
                                                                            elem.credit_used
                                                                        )
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setFieldValue(
                                                                            'client',
                                                                            ''
                                                                        )
                                                                        setFieldValue(
                                                                            'tin',
                                                                            ''
                                                                        )
                                                                        setFieldValue(
                                                                            'terms',
                                                                            ''
                                                                        )
                                                                        setCreditLimit(
                                                                            0
                                                                        )

                                                                        setFieldValue(
                                                                            'address',
                                                                            ''
                                                                        )
                                                                        setFieldValue(
                                                                            'due_date',
                                                                            ''
                                                                        )
                                                                        setCreditUsed(
                                                                            0.0
                                                                        )
                                                                    }}
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        const text =
                                                                            event
                                                                                .target
                                                                                .innerText

                                                                        const startDateObject =
                                                                            new Date(
                                                                                values.date_created
                                                                            )
                                                                        startDateObject.setDate(
                                                                            startDateObject.getDate() +
                                                                                elem.terms
                                                                        )

                                                                        const formattedDate =
                                                                            startDateObject
                                                                                .toISOString()
                                                                                .split(
                                                                                    'T'
                                                                                )[0]

                                                                        setSearchResultClient(
                                                                            []
                                                                        )
                                                                        setFieldValue(
                                                                            'client',
                                                                            text
                                                                        )
                                                                        setFieldValue(
                                                                            'tin',
                                                                            elem.tin
                                                                        )
                                                                        setFieldValue(
                                                                            'terms',
                                                                            elem.terms
                                                                        )
                                                                        setCreditLimit(
                                                                            elem.credit_limit
                                                                        )

                                                                        setFieldValue(
                                                                            'address',
                                                                            elem.address
                                                                        )

                                                                        setFieldValue(
                                                                            'due_date',
                                                                            formattedDate
                                                                        )

                                                                        setFieldValue(
                                                                            'clientId',
                                                                            elem.id
                                                                        )

                                                                        setCreditUsed(
                                                                            elem.credit_used
                                                                        )

                                                                        setIsClientSelected(
                                                                            true
                                                                        )
                                                                    }}
                                                                    className=' flex h-fit w-full cursor-pointer  items-center  justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                                                                    key={
                                                                        elem.id
                                                                    }
                                                                >
                                                                    <p>
                                                                        {
                                                                            elem.name
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                )}
                                            </div>
                                        ) : isLoadingClient ? (
                                            <div className=' w-[50px]] flex h-[180px] max-h-[50px] flex-col  items-center justify-center   overflow-auto  rounded-md border-2  border-gray-600 bg-base-300'>
                                                <span className='loading loading-spinner loading-md text-neutral '></span>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        {errorText(
                                            errors.client,
                                            touched.client
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full items-center gap-5 px-2'>
                                <div className='flex w-1/2 flex-col'>
                                    <label
                                        className='flex items-center text-left text-sm font-semibold text-neutral'
                                        htmlFor='client'
                                    >
                                        Invoice Number
                                        <span className=' ml-1 '></span>
                                    </label>

                                    <Field
                                        className={` input-primary input input-sm rounded-sm text-primary ${
                                            errors.invoice_number &&
                                            touched.invoice_number
                                                ? ` border-red-500 focus:ring-red-500`
                                                : ''
                                        }`}
                                        type='number'
                                        name='invoice_number'
                                        value={values.invoice_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id='invoice_number'
                                        placeholder='Enter invoice number '
                                    ></Field>

                                    {errorText(
                                        errors.invoice_number,
                                        touched.invoice_number
                                    )}
                                </div>
                                <div className='flex w-1/2 flex-col'>
                                    <label
                                        className='flex items-center text-left text-sm font-semibold text-neutral'
                                        htmlFor='recipient'
                                    >
                                        Recipient Name
                                        <span className=' ml-1 '></span>
                                    </label>

                                    <Field
                                        className={` input-primary input input-sm rounded-sm text-primary ${
                                            errors.recipient &&
                                            touched.recipient
                                                ? ` border-red-500 focus:ring-red-500`
                                                : ''
                                        }`}
                                        type='string'
                                        name='recipient'
                                        value={values.recipient}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id='recipient'
                                        placeholder='Enter Recipient Name'
                                    ></Field>

                                    {errorText(
                                        errors.recipient,
                                        touched.recipient
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 px-2'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='description'
                                >
                                    Client address
                                </label>

                                <textarea
                                    className={`input-primary input input-sm h-20 rounded-sm text-primary ${
                                        errors.address && touched.address
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    value={values.address}
                                    onChange={handleChange}
                                    id='address'
                                    placeholder='Client Address'
                                    onBlur={handleBlur}
                                ></textarea>
                                {errorText(errors.address, touched.address)}
                            </div>
                            <div className='mb-2 w-full p-2'>
                                <div className='flex w-full  justify-end'>
                                    <div className='w-1/4'>
                                        <label
                                            className='tooltip flex items-center text-left text-sm font-semibold text-neutral'
                                            htmlFor='terms'
                                        >
                                            Client Terms
                                            <span
                                                className='tooltip  tooltip-right ml-1'
                                                data-tip='amount in days'
                                            >
                                                <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                            </span>
                                        </label>

                                        <Field
                                            className={`input-primary input input-sm w-full rounded-sm text-primary ${
                                                errors.terms && touched.terms
                                                    ? ' border-red-500 focus:ring-red-500'
                                                    : ''
                                            } `}
                                            name='terms'
                                            type='number'
                                            onChange={(event) => {
                                                let value = parseInt(
                                                    event.target.value
                                                )

                                                if (!value) {
                                                    value = 0
                                                }

                                                const startDateObject =
                                                    new Date(
                                                        values.date_created
                                                    )
                                                startDateObject.setDate(
                                                    startDateObject.getDate() +
                                                        value
                                                )

                                                const formattedDate =
                                                    startDateObject
                                                        .toISOString()
                                                        .split('T')[0]

                                                setFieldValue('terms', value)

                                                setFieldValue(
                                                    'due_date',
                                                    formattedDate
                                                )
                                            }}
                                            onBlur={handleBlur}
                                            value={values.terms}
                                        />

                                        {errorText(errors.terms, touched.terms)}
                                    </div>
                                </div>
                                <div className='flex w-full items-center justify-between gap-10'>
                                    <div className='flex w-1/2 flex-col'>
                                        <label
                                            className='text-sm font-semibold text-neutral'
                                            htmlFor='date_created'
                                        >
                                            Date
                                        </label>

                                        <Field
                                            className={`input-primary input input-sm rounded-sm text-primary ${
                                                errors.date_created &&
                                                touched.date_created
                                                    ? ' border-red-500 focus:ring-red-500'
                                                    : ''
                                            } `}
                                            name='date_created'
                                            type='date'
                                            onChange={(event) => {
                                                const value = event.target.value
                                                setFieldValue(
                                                    'date_created',
                                                    value
                                                )
                                                setCreatedDate(value)
                                            }}
                                            onBlur={handleBlur}
                                            value={values.date_created}
                                        />
                                    </div>

                                    <div className='flex w-1/2 flex-col'>
                                        <label
                                            className='tooltip flex items-center text-left text-sm font-semibold text-neutral'
                                            htmlFor='terms'
                                        >
                                            Due Date
                                            <span
                                                className='tooltip  tooltip-right ml-1'
                                                data-tip='Edit client terms to change'
                                            >
                                                <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                            </span>
                                        </label>

                                        <Field
                                            className={`input-primary input input-sm cursor-not-allowed rounded-sm  text-primary ${
                                                errors.due_date &&
                                                touched.due_date
                                                    ? ' border-red-500 focus:ring-red-500'
                                                    : ''
                                            } `}
                                            name='due_date'
                                            type='date'
                                            readOnly={true}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.due_date}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full items-center gap-5 px-2'>
                                <div className='flex w-1/2 flex-col'>
                                    <label
                                        className='text-sm font-semibold text-neutral'
                                        htmlFor='tin'
                                    >
                                        Tin number
                                    </label>
                                    <Field
                                        className={`input-primary input input-sm w-full rounded-sm text-primary ${
                                            errors.tin && touched.tin
                                                ? ' border-red-500 focus:ring-red-500'
                                                : ''
                                        } `}
                                        name='tin'
                                        type='text'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={formatNumber(values.tin)}
                                    />
                                    {errorText(errors.tin, touched.tin)}
                                </div>
                            </div>
                            <div className=' flex w-full flex-col '>
                                <div className='sat'>
                                    <Search
                                        setItems={setItemsObject}
                                        items={itemsObject}
                                        setPage={setPage}
                                        searchFunction={handleSearchProduct}
                                        setBrand={setBrand}
                                        setDesc={setDesc}
                                        minFunction={setMin}
                                        minPrice={min}
                                        maxFunction={setMax}
                                        maxPrice={max}
                                        sortPrice={sortPagePrice}
                                        sortPriceFunction={setSortPagePrice}
                                        sortQuantity={sortPageQuantity}
                                        sortQuantityFunction={
                                            setSortPageQuantity
                                        }
                                        setItemId={setItemId}
                                        setUnit={setUnit}
                                        setDescription={setDescription}
                                        setQuantity={setQuantity}
                                        setUnitPrice={setUnitPrice}
                                        setAmount={setAmount}
                                        sortDescFunction={setSortPageDesc}
                                        sortBrandFunction={setSortPageBrandName}
                                        brandNameSearch={brandNameSearch}
                                        setBrandNameSearch={setBrandNameSearch}
                                        descSearch={descSearch}
                                        setDescSearch={setDescSearch}
                                        setFieldValue={setFieldValue}
                                        setTotalQuantity={setTotalQuantity}
                                        headerArray={headerArray}
                                    />
                                </div>
                                <div className='flex flex-col gap-3 border-2 border-l-0 border-r-0 border-primary p-2'>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label
                                                className='text-sm font-semibold text-neutral'
                                                htmlFor='description'
                                            >
                                                Description
                                            </label>
                                            <input
                                                className={`input-primary input input-sm w-full rounded-sm text-primary`}
                                                name='description'
                                                type='text'
                                                disabled={
                                                    isClientSelected
                                                        ? false
                                                        : true
                                                }
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value
                                                    setDescription(value)
                                                }}
                                                value={description}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex w-full items-center gap-5 '>
                                        <div className='flex  flex-col'>
                                            <label
                                                className='text-sm font-semibold text-neutral'
                                                htmlFor='quantity'
                                            >
                                                Quantity
                                            </label>

                                            <input
                                                className={`input-primary input input-sm w-full rounded-sm text-primary`}
                                                name='quantity'
                                                type='number'
                                                disabled={
                                                    isClientSelected
                                                        ? false
                                                        : true
                                                }
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value
                                                    const totalAmt =
                                                        value * unitPrice

                                                    setAmount(totalAmt)
                                                    setQuantity(value)
                                                }}
                                                value={quantity}
                                            />
                                        </div>
                                        <div className='flex  flex-col'>
                                            <label
                                                className='text-sm font-semibold text-neutral'
                                                htmlFor='unit'
                                            >
                                                Unit
                                            </label>
                                            <input
                                                className={`input-primary input input-sm w-full rounded-sm text-primary`}
                                                name='unit'
                                                disabled={
                                                    isClientSelected
                                                        ? false
                                                        : true
                                                }
                                                type='text'
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value
                                                    setUnit(value)
                                                }}
                                                value={unit}
                                            />
                                        </div>

                                        <div className='flex  flex-col'>
                                            <label
                                                className='text-sm font-semibold text-neutral'
                                                htmlFor='unitPrice'
                                            >
                                                Unit Price
                                            </label>
                                            <input
                                                className={`input-primary input input-sm w-full rounded-sm text-primary`}
                                                name='unitPrice'
                                                disabled={
                                                    isClientSelected
                                                        ? false
                                                        : true
                                                }
                                                type='text'
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value
                                                    setUnitPrice(value)
                                                }}
                                                value={unitPrice}
                                            />
                                        </div>
                                    </div>

                                    <div className='w-1/3'>
                                        <label
                                            className='text-sm font-semibold text-neutral'
                                            htmlFor='amount'
                                        >
                                            Amount
                                        </label>
                                        <input
                                            className={`input-primary input input-sm w-full rounded-sm text-primary`}
                                            name='amount'
                                            disabled={
                                                isClientSelected ? false : true
                                            }
                                            type='text'
                                            onChange={(event) => {
                                                const value = event.target.value
                                                setAmount(value)
                                            }}
                                            value={amount}
                                        />
                                    </div>
                                    {errorItem && (
                                        <p
                                            className={` ${tailwindError} my-2 text-center font-bold`}
                                        >
                                            {errorItem &&
                                            totalQuantity < quantity
                                                ? 'quantity is greater that available item stock '
                                                : 'Incomplete values / Invalid values'}
                                        </p>
                                    )}
                                    <div
                                        className={`flex w-full items-center justify-center ${
                                            isClientSelected
                                                ? 'cursor-default'
                                                : 'cursor-not-allowed'
                                        }`}
                                    >
                                        <button
                                            type='button'
                                            disabled={
                                                isClientSelected ? false : true
                                            }
                                            onClick={() => {
                                                const obj = {}
                                                if (
                                                    quantity === '' ||
                                                    amount === '' ||
                                                    description === '' ||
                                                    unit === '' ||
                                                    unitPrice === ''
                                                ) {
                                                    setErrorItem(true)
                                                    return
                                                }

                                                if (totalQuantity < quantity) {
                                                    setErrorItem(true)
                                                    return
                                                }
                                                if (
                                                    description &&
                                                    unitPrice &&
                                                    quantity &&
                                                    unit &&
                                                    amount
                                                ) {
                                                    const isMatch =
                                                        selectedItems.find(
                                                            (item) =>
                                                                item.description ===
                                                                description
                                                        )
                                                    if (!isMatch) {
                                                        obj.description =
                                                            description
                                                        obj.unitPrice =
                                                            unitPrice
                                                        obj.quantity = quantity
                                                        obj.unit = unit
                                                        obj.amount = amount
                                                        obj.id = itemId
                                                        setErrorItem(false)
                                                        setSelectedItems(
                                                            (prev) => {
                                                                const arr = [
                                                                    obj
                                                                ]
                                                                const ItemsArray =
                                                                    [
                                                                        ...prev,
                                                                        ...arr
                                                                    ]

                                                                setFieldValue(
                                                                    'items',
                                                                    [
                                                                        ...prev,
                                                                        ...arr
                                                                    ]
                                                                )

                                                                return ItemsArray
                                                            }
                                                        )

                                                        const total =
                                                            amount + creditUsed

                                                        setCreditUsed(total)
                                                        setItemId('')
                                                        setUnit('')
                                                        setDescription('')
                                                        setQuantity(0)
                                                        setUnitPrice(0)
                                                        setAmount(0)
                                                        setTotalQuantity(0)
                                                    } else {
                                                        console.log('duplicate')
                                                    }
                                                } else {
                                                    setErrorItem(true)
                                                }
                                            }}
                                            className='btn-neutral btn-active btn-wide btn-sm btn hover:text-secondary'
                                        >
                                            Add new item
                                        </button>
                                    </div>
                                </div>

                                <div className=''>
                                    {itemsObject ? (
                                        <Table
                                            headerArray={headerArray}
                                            setSelectedItems={setSelectedItems}
                                            selectedItems={selectedItems}
                                            setFieldValue={setFieldValue}
                                            setUnit={setUnit}
                                            setDescription={setDescription}
                                            setQuantity={setQuantity}
                                            setUnitPrice={setUnitPrice}
                                            setAmount={setAmount}
                                            creditUsed={creditUsed}
                                            setCreditUsed={setCreditUsed}
                                            setTotalAmount={setTotalAmount}
                                            setTotalSalesVat={setTotalSalesVat}
                                            setVat={setVat}
                                        />
                                    ) : (
                                        <div className='mx-auto my-2 flex w-full items-center justify-center'>
                                            <span className='loading loading-spinner loading-lg'></span>
                                        </div>
                                    )}

                                    <div className='w-full  bg-base-100 px-2 py-2'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex justify-end '>
                                                <p
                                                    className='tooltip tooltip-right font-bold before:text-xs'
                                                    data-tip={`Remaining: ${
                                                        creditLimit -
                                                        creditUsed.toFixed(2)
                                                    }`}
                                                >
                                                    Credit Limit:{' '}
                                                    {creditUsed.toFixed(2)}/{' '}
                                                    {creditLimit
                                                        ? creditLimit.toFixed(2)
                                                        : 0}
                                                </p>
                                            </div>

                                            <div className='flex  justify-end'>
                                                <p className='font-bold'>
                                                    {`TOTAL SALES (VAT inclusive): ${totalSalesVat.toFixed(
                                                        2
                                                    )}`}
                                                </p>
                                            </div>
                                            <div className='flex  justify-between'>
                                                <p className='font-bold '>
                                                    VATable Sales:
                                                    {` ${totalAmount.toFixed(
                                                        2
                                                    )}`}
                                                </p>
                                                <p className='font-bold'>
                                                    Less: VAT: {vat.toFixed(2)}{' '}
                                                </p>
                                            </div>
                                            <div className='flex  justify-end'>
                                                <p className='font-bold'>
                                                    Amount: NET of VAT{' '}
                                                    {totalAmount.toFixed(2)}{' '}
                                                </p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p className='font-bold'>
                                                    VAT 12%: {vat.toFixed(2)}{' '}
                                                </p>
                                                <p className='font-bold '>
                                                    Total Amount Due:{' '}
                                                    {totalSalesVat.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-2 flex justify-end px-2'>
                                    <div className='flex flex-col'>
                                        <select
                                            disabled={
                                                totalSalesVat > creditLimit
                                                    ? true
                                                    : false
                                            }
                                            name='status'
                                            value={status}
                                            onChange={(event) => {
                                                const value = event.target.value
                                                setStatus(value)
                                            }}
                                            className='select-primary select select-sm rounded-sm'
                                        >
                                            <option disabled value=''>
                                                Invoice Status...
                                            </option>

                                            <option>Pending</option>
                                            <option>Pending Override</option>
                                            <option>To follow</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p
                                className={`w-full text-center text-sm text-red-500 ${
                                    totalSalesVat < 1500 &&
                                    selectedItems.length > 0
                                        ? ''
                                        : 'invisible'
                                }`}
                            >
                                {totalSalesVat < 1500 &&
                                selectedItems.length > 0
                                    ? 'Total amount must be 1500 or greater'
                                    : ' '}
                            </p>
                            <p
                                className={`w-full text-center text-sm text-red-500 ${
                                    resError ? '' : 'invisible'
                                }`}
                            >
                                {resError ? resError : ' '}
                            </p>

                            <button
                                className={`  ${
                                    isClientSelected && selectedItems.length > 0
                                        ? 'cursor-pointer opacity-100'
                                        : 'cursor-not-allowed opacity-50'
                                } btn2 relative overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider`}
                                type='submit'
                            >
                                <span className='absolute inset-0 bg-neutral '></span>
                                <span className='absolute inset-0 flex items-center  justify-center text-primary'>
                                    Save
                                </span>
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className='sat'>yo</div>
            </div>
        </>
    )
}

export default Invoice

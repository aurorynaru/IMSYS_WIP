import React, { useEffect } from 'react'
import { setInvoice } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
const Home = () => {
    const dispatch = useDispatch()
    const invoice = useSelector((state) => state.invoice)
    const getModels = async () => {}

    return (
        <main className='min-h-screen'>
            <Navbar />
            <div className='flex h-full'></div>
        </main>
    )
}
export default Home

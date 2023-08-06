import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Login from './Login'
import Registration from './Registration'
import Toggle from '../components/Toggle'

const Auth = () => {
    const [authToggle, setAuthToggle] = useState('login')

    const width = 'max-w-10/12 min-w-8/12'
    return (
        <div className='min-h-screen w-full bg-base-100'>
            <Navbar />
            {authToggle === 'login' ? (
                <div
                    className={`${width}  flex-col flex w-3/6 mx-auto justify-center gap-2 bg-base-100`}
                >
                    <Login />
                    <div className='flex items-end justify-start py-5 text-start'>
                        <Toggle
                            label={'Register'}
                            func={setAuthToggle}
                            toggleTo={'register'}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={`${width} flex  flex-col w-3/6 mx-auto justify-center bg-base-100`}
                >
                    <Registration />
                    <div className='flex items-end justify-start  text-start'>
                        <Toggle
                            label={'Login'}
                            func={setAuthToggle}
                            toggleTo={'login'}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Auth

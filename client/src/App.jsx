import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    useNavigate
} from 'react-router-dom'
import Home from './pages/Home'
import Registration from './pages/Registration'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Invoice from './pages/Invoice'
import ProductRegister from './pages/ProductRegister'
import ClientRegister from './pages/ClientRegister'

function App() {
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className='min-h-screen bg-base-100 transition duration-500 ease-in-out'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/register/product'
                        element={<ProductRegister />}
                    />
                    <Route path='/create/invoice' element={<Invoice />} />
                    <Route path='/register/user' element={<Registration />} />
                    <Route
                        path='/register/Client'
                        element={<ClientRegister />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

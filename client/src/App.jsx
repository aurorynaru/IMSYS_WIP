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
import CreateProduct from './pages/CreateProduct'

function App() {
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className=' bg-neutral-100-100 min-h-screen text-neutral-900 transition duration-500 ease-in-out dark:bg-body dark:text-neutral-100'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/register/product'
                        element={<CreateProduct />}
                    />
                    <Route path='/register/user' element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

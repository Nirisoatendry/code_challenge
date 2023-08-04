import {createBrowserRouter} from 'react-router-dom';
import Articles from '../Components/Articles';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Articles/>
    }
])
export default router;
import Home from '../pages/home/index.ts'
import Register from '../pages/register/index.ts'
import Logined from '../pages/logined/index.ts'

const routes = {
    '/' : Home,
    '/p/:id' : Logined,
    '/register' : Register
}
export default routes

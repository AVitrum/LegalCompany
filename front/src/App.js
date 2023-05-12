import './App.css';
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import HomePage from './pages/homePage';
import LoginPage from './pages/authentication-pages/loginPage';
import RegisterPage from './pages/authentication-pages/registerPage';
import {UserContextProvider} from "./components/UserContext";
import CreateRequest from "./pages/request-pages/createRequest";
import RequestPage from "./pages/request-pages/requestPage";
import EditRequest from "./pages/request-pages/editRequest";
import AllRequestsPage from "./pages/request-pages/allRequestsPage";

function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<HomePage/>}/>
                  <Route path={'/login'} element={<LoginPage/>}/>
                  <Route path={'/register'} element={<RegisterPage/>}/>
                  <Route path={'/show'} element={<AllRequestsPage/>} />
                  <Route path={'/create'} element={<CreateRequest/>}/>
                  <Route path={'/application/:id'} element={<RequestPage/>}/>
                  <Route path={'/edit/:id'} element={<EditRequest/>}/>
              </Route>
          </Routes>
      </UserContextProvider>
  );
}

export default App;

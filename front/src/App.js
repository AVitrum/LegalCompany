import './App.css';
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/AuthenticationPages/LoginPage';
import RegisterPage from './pages/AuthenticationPages/RegisterPage';
import {UserContextProvider} from "./components/UserContext";
import CreateRequest from "./pages/RequestPages/CreateRequest";
import RequestPage from "./pages/RequestPages/RequestPage";
import EditRequest from "./pages/RequestPages/EditRequest";

function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<IndexPage/>}/>
                  <Route path={'/login'} element={<LoginPage/>}/>
                  <Route path={'/register'} element={<RegisterPage/>}/>
                  <Route path={'/create'} element={<CreateRequest/>}/>
                  <Route path={'/application/:id'} element={<RequestPage/>}/>
                  <Route path={'/edit/:id'} element={<EditRequest/>}/>
              </Route>
          </Routes>
      </UserContextProvider>
  );
}

export default App;

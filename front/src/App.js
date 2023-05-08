import './App.css';
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {UserContextProvider} from "./components/UserContext";
import CreateRequest from "./pages/CreateRequest";

function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<IndexPage/>} />
                  <Route path={'/login'} element={<LoginPage/>} />
                  <Route path={'/register'} element={<RegisterPage/>} />
                  <Route path={'/create'} element={<CreateRequest/>}/>
              </Route>
          </Routes>
      </UserContextProvider>
  );
}

export default App;

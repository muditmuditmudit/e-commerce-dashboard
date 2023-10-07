import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import PrivateComponent from './components/PrivateComponent';
import ProductList from './components/ProductList';
import UpdateProducts from './components/UpdateProducts';
import Profile from './components/Profile';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path="/" element = {<ProductList/>} />
            <Route path="/add" element = {<AddProduct/>} />
            <Route path="/update/:id" element = {<UpdateProducts/>}/>
            <Route path="/update" element = {<ProductList/>}/>
            <Route path="/profile" element = {<h1><Profile/></h1>} />
            <Route path="*" element = {<h1>Product home page</h1>} />
          </Route>

          <Route path="/signup" element = {<Signup/>} />
          <Route path="/login" element = {<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

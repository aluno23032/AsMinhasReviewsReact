import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./Pages/home.js"
import JogosIndex from "./Pages/Jogos/index.js"
import Register from "./Pages/Account/register.js"
import Login from "./Pages/Account/login.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Jogos" element={<JogosIndex/>}></Route>
          <Route path="/Account/Register" element={<Register/>}></Route>
          <Route path="/Account/Login" element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
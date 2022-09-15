import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./Pages/home.js"
import JogosIndex from "./Pages/Jogos/index.js"
import JogosCreate from "./Pages/Jogos/create.js"
import JogosRemove from "./Pages/Jogos/remove.js"
import JogosEdit from "./Pages/Jogos/edit.js"
import Register from "./Pages/Account/register.js"
import Login from "./Pages/Account/login.js"
import Details from "./Pages/Account/details.js"
import ChangeEmail from "./Pages/Account/changeEmail.js"
import ChangePassword from "./Pages/Account/changePassword.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Jogos/Index/:ordem" element={<JogosIndex/>}></Route>
          <Route path="/Jogos/Remove/:idJogo" element={<JogosRemove/>}></Route>
          <Route path="/Jogos/Edit/:idJogo" element={<JogosEdit/>}></Route>
          <Route path="/Jogos/Create" element={<JogosCreate/>}></Route>
          <Route path="/Account/Register" element={<Register/>}></Route>
          <Route path="/Account/Login" element={<Login/>}></Route>
          <Route path="/Account/Details" element={<Details/>}></Route>
          <Route path="/Account/Details/Email" element={<ChangeEmail/>}></Route>
          <Route path="/Account/Details/Password" element={<ChangePassword/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
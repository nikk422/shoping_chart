import './App.css';
import {Routes , Route} from "react-router-dom";
import SignIn from "./pagess/Login";
import Dashboard from "./pagess/Dashboard";
import {Forgot} from "./pagess/Forgot"
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
    </Routes>
    </div>
  );
}

export default App;

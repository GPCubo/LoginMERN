import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import React, { useState} from 'react';

const userInfo = { access: false,name: null,rank: null,picture: null}

function App() {
  const [toggleLogDash, setToggleLogDash] = useState(userInfo);
  const toggle = (data) =>{
    toggleLogDash.access === false ? setToggleLogDash({...toggleLogDash,...data}) : setToggleLogDash(userInfo)
  }
  return (
    <>
       {toggleLogDash.access === false ? <LogIn toggle={toggle} /> : <Dashboard toggle={toggle} userInfo={toggleLogDash}/>}
    </>
  );
}

export default App;

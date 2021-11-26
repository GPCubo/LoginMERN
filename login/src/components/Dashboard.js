import React from 'react';
import logo from '../assets/logo.svg'
import './Dashboard.css'
import SettingsUser from './SettingsUser';

function Dashboard({toggle,userInfo}) {
    let {picture} =userInfo
    console.log(picture)
    return ( 
        <>
        <div className="dashboard-div">
            <header className="dashboard-header">
                <nav className="dashboard-nav">
                    <img src={logo} alt="logo" className="dashboard-img-logo"/>
                    <ul className="dashboard-ul-1">
                        <li className="dashboard-li-1"><i className="fas fa-home"></i></li>
                        <li className="dashboard-li-1"><i className="fas fa-cog"></i></li>
                        <li className="dashboard-li-1"><i className="fas fa-tachometer-alt"></i></li>
                    </ul>
                    <div className="dashboard-div-1">
                        <img className="dashboard-img-people" alt="pf-img" src={picture === null ? logo : "/upload/"+picture}/>
                        <i className="fas fa-sign-out-alt dashboard-i-logout" onClick={toggle}></i>
                    </div>
                </nav>
            </header>
            <SettingsUser userInfo={userInfo}/>
        </div>


        </>
     );
}

export default Dashboard;
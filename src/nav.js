import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { GiContract } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { CiLogin } from 'react-icons/ci'
import { CiLogout } from 'react-icons/ci'
import {DiLinux} from 'react-icons/di'
import{SiSpeedtest} from 'react-icons/si'
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css'
const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
  return(
    <>
    <div className='navbar navbar-light navbar-expand bg-dark navigation-clean free'>

    <div className="container"><a className="navbar-brand" href="#"> 
    <div className='icon'><DiLinux/></div>
    <strong>HYSU</strong></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"></button>
            <div className="collapse navbar-collapse" id="navcol-1">
            <div className='auth ms-auto'>
          {
            isAuthenticated ?
          
          <a className="btn btn-primary ms-auto" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} role="button" href="#">Sign Out</a>
          
          :
           <a className="btn btn-primary ms-auto" onClick={()=> loginWithRedirect()} role="button" href="#">Sign In</a>



          }
          
          
        </div>
        
              </div>
        </div>
      

    </div>
    <div className='main_header'>
      <div className='container'>
         <div className='logo'>
          <img src='./img/logo.jpeg' width='100px' alt='hearth_solutions'></img>

         </div>
         <div>
           <h1><DiLinux/>HYSU</h1>
         </div>
         <div className='icon'>
          {
            isAuthenticated && 
            (
              <div className='account'>
              <div className='user_icon'>
                <AiOutlineUser/>
              </div>
              <p>Hello, {user.name}</p>
            </div>
            )
          }
         
          <div className='second_icon'>
            <Link to='/' className='link'>
          <GiContract/>
            </Link>
            <Link to='/cart'>
          <AiOutlineShoppingCart/>
            </Link>
          </div>

         </div>
      </div>
    </div>
    {
            isAuthenticated && 
            (
              <div className='account'>
              <div className='user_icon'>
                <AiOutlineUser/>
              </div>
              <div className='header'>
      <div className='container'>
        <div className='col-lg-6 text-center text-lg-start my-auto h-100 nav'>
        <ul className='list-inline mb-2'>
          <li className='list-inline-item'>
            <Link to='/'className='link'>Home</Link>
          </li>
          <li>
          <Link to='/live_usage' className='link'>Live Usage <br/> <SiSpeedtest/> </Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/linked_devices'className='link'>Linked Devices</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/net_interfaces'className='link'>Network Interfaces</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/speed_test'className='link'>Speed Test</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/net_statistics'className='link'>NetStat</Link>
          </li>
        </ul>
        
        
        </div>
        
      </div>
    </div>
            </div>
            )
          }
          <div className="col-lg-6 text-center text-lg-start my-auto h-100">
          <ul className='list-inline mb-2'>
          <li className="list-inline-item">
            <Link to='/'className='link'>Home</Link>
          </li>
          <li className="list-inline-item">
            <Link to='/product' className='link'>Product</Link>
          </li>
          <li className='list-inline-item'>
            <Link to='/about'className='link'>About</Link>
          </li>
          <li className="list-inline-item">
            <Link to='/contact'className='link'>Contact</Link>
          </li>
        </ul>
      
        </div>
              
    </>
  )
}
export default Nav
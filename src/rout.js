import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './home'
import SpeedTest from './speed'
import Usage from './usage'
import LinkedDevices from './linked_devices'
import NetworkInterfaces from './net_int'
const Rout = () => {
    return (
        <>
        <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/speed_test' element ={<SpeedTest/>}/>
        <Route path='/live_usage' element ={<Usage/>}/>
        <Route path='/linked_devices' element ={<LinkedDevices/>}/>
        <Route path='/net_interfaces' element ={<NetworkInterfaces/>}/>

        </Routes>
       
        </>
    )
}
export default Rout
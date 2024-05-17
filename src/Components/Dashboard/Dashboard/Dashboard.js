import React from 'react'
import { useSelector } from 'react-redux';
import '../Dashboard.css';
import './DashboardMain.css';
import Image from 'react-bootstrap/Image';
import Wrapper from '../Wrapper/Wrapper';
import { Link } from 'react-router-dom';
import StaffDashboard from './StaffDashboard';
import GuestDashboard from './GuestDashboard';

const Dashboard = () => {
    const {user} = useSelector(state => state.userAuth);
    const roleId =user?.roleId?user.roleId:user.user?.roleId
    const credit =user?.userCredits != undefined ?user.userCredits:user.user?.userCredits
    console.log(credit);

    return (

     
        <Wrapper>
             {roleId == 1 &&
            <StaffDashboard credit = {credit}/>
            }
            {roleId == 2 && 
            <GuestDashboard/>
            }
        </Wrapper>
    )
}

export default Dashboard
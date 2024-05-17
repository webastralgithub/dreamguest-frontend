import React from 'react'
import { useSelector } from 'react-redux';
import '../Dashboard.css';
import './DashboardMain.css';
import Image from 'react-bootstrap/Image';
import Wrapper from '../Wrapper/Wrapper';
import { Link } from 'react-router-dom';

const StaffDashboard = ({credit}) => {
 
  return (

    <div className='dashboard-choice-wrapper'>
        <div className='credit-balance'>
            <p><span>{credit}</span> Credit Balance</p>
        </div>

        <div className='dash-choose-op-wrp'>
            <h2>What would you like to do today?</h2>
            <p>Choose menu you want to do today</p>

            <div className='dash-option-wrp'>
                <Link to="/">
                    <Image src={process.env.PUBLIC_URL + "/op-1.svg"} fluid />
                    Guest Review
                </Link>

                <Link to="/">
                    <Image src={process.env.PUBLIC_URL + "/op-2.svg"} fluid />
                    Rewards Overview
                </Link>

                <Link to="/dashboard/sex-offender">
                    <Image src={process.env.PUBLIC_URL + "/op-3.svg"} fluid />
                    Sex Offender Check
                </Link>

                <Link to="/dashboard/social-media">
                    <Image src={process.env.PUBLIC_URL + "/op-4.svg"} fluid />
                    Social Media Check
                </Link>

                <Link to="/dashboard/purchase-credits">
                    <Image src={process.env.PUBLIC_URL + "/op-5.svg"} fluid />
                    Purchase Credits
                </Link>

            </div>
        </div>
    </div>

  )
}

export default StaffDashboard

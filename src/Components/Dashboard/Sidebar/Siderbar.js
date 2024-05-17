import React from 'react'
import { Button, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../../features/user/userAuth';


function Siderbar({isActive}) {
  const {user} = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId =user?.roleId?user.roleId:user.user?.roleId

  return (
    <>
     <Col md={2}  className={isActive ? 'p-0 toggle-transition sidebarinactive' : 'p-0 toggle-transition sidebaractive'}>
        <div className='side-bar-wrapper'>
            <Image src={ process.env.PUBLIC_URL + "/logo.svg"} fluid/>
            <Navbar expand="lg" className="flex-column">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="flex-column">
                  <Nav.Item>
                    <NavLink end to="/dashboard">
                        <Image src={ process.env.PUBLIC_URL + "/nav-ico1.svg"} fluid/> Dashboard
                    </NavLink>
                  </Nav.Item>

                  {roleId== 1 && <Nav.Item>
                    <NavLink end to="/dashboard/guest-review">
                        <Image src={ process.env.PUBLIC_URL + "/nav-ico2.svg"} fluid/> Guest Review 
                    </NavLink>
                  </Nav.Item>}

                  {roleId == 1 && <Nav.Item>
                    <NavLink end to="/">
                    <Image src={ process.env.PUBLIC_URL + "/nav-ico3.svg"} fluid/> Rewards Overview
                    </NavLink>
                  </Nav.Item>}

                  {roleId == 1 && <Nav.Item>
                    <NavLink end to="/dashboard/sex-offender" >
                    <Image src={ process.env.PUBLIC_URL + "/nav-ico4.svg"} fluid/> Sex Offender Check 
                    </NavLink>
                  </Nav.Item>}

                  {roleId == 1 && <Nav.Item>
                    <NavLink end to="/dashboard/social-media">
                    <Image src={ process.env.PUBLIC_URL + "/nav-ico5.svg"} fluid/> Social Media Check
                    </NavLink>
                  </Nav.Item>}

                  {roleId == 2 && <Nav.Item>
                    <NavLink end to="/dashboard/my-point" >
                        <Image src={ process.env.PUBLIC_URL + "/nav-ico6.svg"} fluid/> My Points
                    </NavLink>
                  </Nav.Item>}
                  {roleId== 2 && <Nav.Item>
                    <NavLink end to="/dashboard/my-reward" >
                        <Image src={ process.env.PUBLIC_URL + "/nav-ico6.svg"} fluid/> My Rewards
                    </NavLink>
                  </Nav.Item>}

                  <Button onClick={()=>{dispatch(clearAuth()); navigate('/')}} >
                     Logout
                  </Button>          

                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </div>
      </Col>
      </>
  )
}

export default Siderbar
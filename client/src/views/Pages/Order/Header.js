import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

const Header = ({fixed}) => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = useSelector(state => state.auth);

    const renderContent = () => {
        switch (auth) {
            case null:
            case false:
                return (
                    <>
                        <NavItem>
                            <NavLink tag={Link} to="/login" variant="primary">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/register" variant="info">Register</NavLink>
                        </NavItem>
                    </>
                );
            default:
                return (
                    <>
                        <NavItem>
                            <NavLink tag={Link} to="/account" variant="info">Account</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/account" variant="success">Placed Orders</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/" variant="success">Order Now</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/api/logout" variant="danger">Logout</NavLink>
                        </NavItem>
                    </>
                );
        }
    }
    const renderAdmin = () => {
        if (auth == null) {
            return;
        }
        if (auth.accountType === "admin") {
            return <>
                <NavItem>
                    <NavLink tag={Link} to="/dashboard" variant="dark">Admin Dashboard</NavLink>
                </NavItem>
            </>
        }
    }
    return (
            <Navbar  style={{backgroundColor:"white",borderBottom: "1px solid #CCC"}} light expand="md" fixed={fixed} >
                <NavbarBrand tag={Link} to="/">CateredPRO <Badge style={{fontSize:"0.6rem", verticalAlign:"text-top" }} className="mr-1" color="danger" pill>By Saboree Catering</Badge></NavbarBrand>
                <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar />
                    <Nav navbar>{renderAdmin()}
                        {renderContent()}</Nav>
                </Collapse>
            </Navbar>
    );
}

export default Header;
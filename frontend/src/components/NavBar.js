import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../context/ContractProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const { currentAccount, correctNetwork } = useContext(ContractContext);

  useEffect(() => {}, [currentAccount]);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="light"
      className="px-2 bg-light"
      style={{ minHeight: "8vh" }}
    >
      <Navbar.Brand
        role="button"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top "
          style={{ backgroundColor: "white", borderRadius: "0.5rem" }}
        />{" "}
        Tokenz777-V01{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          {currentAccount && correctNetwork && (
            <>
              <Nav.Link
                onClick={() => {
                  navigate("/customers");
                }}
              >
                Customers
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/create");
                }}
              >
                Create
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

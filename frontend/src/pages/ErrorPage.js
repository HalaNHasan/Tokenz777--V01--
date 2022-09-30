import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="errorComponent centeredDiv text-light"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center text-align-center">
        <h1>404</h1>
        <h3>Sorry, the page cannot be found!</h3>
        <Button
          variant="btn btn-primary btn-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Container>
    </div>
  );
};

export default ErrorPage;

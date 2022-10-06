import React, { useContext, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//for light animation when loading the page:
import Aos from "aos";
import "aos/dist/aos.css";
//to import ContractContext:
import { ContractContext } from "../context/ContractProvider";

const Welcome = () => {
  const navigate = useNavigate();
  const {
    currentAccount,
    connectAccount,
    showModalNotification,
    ModalNotification,
    connectSmartCahinTestnet,
    correctNetwork,
  } = useContext(ContractContext);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [correctNetwork]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center bgWelcome">
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.75)",
          padding: "2rem",
          borderRadius: "1rem",
          width: "75%",
          textAlign: "center",
          padding: "1rem",
        }}
        data-aos="zoom-in"
      >
        <Card.Title className="fs-1">Tokenz777-V01</Card.Title>
        <Card.Text className="fs-2">
          An application where you can launch your ICO!
        </Card.Text>
        <Card.Text className="fs-4">Create & Send Tokens!</Card.Text>
        {currentAccount && correctNetwork && (
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/customers")}
          >
            Start!
          </Button>
        )}
        {!correctNetwork && !currentAccount && (
          <Button
            variant="success"
            size="lg"
            onClick={() => connectSmartCahinTestnet()}
          >
            Connect To Smart Chain-Testnet
          </Button>
        )}
        {correctNetwork && !currentAccount && (
          <Button variant="success" size="lg" onClick={() => connectAccount()}>
            Connect Wallet
          </Button>
        )}

        {!correctNetwork && currentAccount && (
          <Button
            variant="success"
            size="lg"
            onClick={() => connectSmartCahinTestnet()}
          >
            Connect To Smart Chain-Testnet
          </Button>
        )}
      </div>
      {showModalNotification ? ModalNotification() : null}
    </div>
  );
};

export default Welcome;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

//for light animation when loading the page:
import Aos from "aos";
import "aos/dist/aos.css";
//to import ContractContext:
import { ContractContext } from "../context/ContractProvider";

const CreateToken = () => {
  const navigate = useNavigate();
  const {
    createToken,
    handleCreateFormChange,
    showModalNotification,
    ModalNotification,
    isChanged,
    ModalLoading,
    showModalLoading,
    correctNetwork,
  } = useContext(ContractContext);

  useEffect(() => {
    Aos.init({ duration: 1500 });
    if (showModalNotification && isChanged) {
      navigate("/customers");
    }
  }, [isChanged]);
  return (
    <div className="centeredDiv bgWelcome">
      {correctNetwork && (
        <Container
          style={{
            width: "80%",
            borderRadius: "1rem",
            border: "none",
          }}
        >
          <Card className="addBox" data-aos="zoom-in">
            <Card.Body className="">
              <Card.Title className="fs-2">Create Your Token!</Card.Title>
              <Card.Text>
                Build your ERC777 based token on Smart Chain - Testnet! the
                process will cost you 0.15BNB++!
              </Card.Text>
              {/*form start */}
              <Form className="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Token Name..."
                    name="tokenName"
                    required
                    onChange={(e) => handleCreateFormChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Token Symbol..."
                    name="tokenSymbol"
                    required
                    onChange={(e) => handleCreateFormChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="number"
                    min="1"
                    max="100000000000"
                    placeholder="Total Supply...Max is 100000000000 "
                    name="tokenSupply"
                    required
                    onChange={(e) => handleCreateFormChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    name="tokenDecimal"
                    placeholder="18 for ERC777 Tokens!"
                    disabled
                    onChange={(e) => handleCreateFormChange(e)}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    createToken();
                  }}
                >
                  Create Token
                </Button>
              </Form>
              {/*  form end */}
            </Card.Body>
          </Card>
        </Container>
      )}
      {showModalNotification && ModalNotification()}
      {showModalLoading && ModalLoading()}
    </div>
  );
};

export default CreateToken;

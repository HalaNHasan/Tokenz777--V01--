import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const Send = () => {
  const navigate = useNavigate();
  //to get id & owner of the swapped property:
  const { id } = useParams();
  const {
    showModalNotification,
    ModalNotification,
    isChanged,
    loadTokenContract,
    fetchedTokenData,
    sendToken,
    ModalLoading,
    showModalLoading,
    correctNetwork,
  } = useContext(ContractContext);

  //to set sent/minted token amount & wallet address:
  const [tokenAmount, setTokenAmount] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    Aos.init({ duration: 1500 });
    loadTokenContract(id);
  }, [isChanged]);
  return (
    <div className="centeredDiv bgWelcome">
      {correctNetwork && (
        <Container
          style={{
            width: "100%",
            borderRadius: "1rem",
            border: "none",
          }}
        >
          {fetchedTokenData.fetchedTokenUserBalance == 0 && (
            <h3 className="text-center mb-2 text-light" data-aos="zoom-out">
              Your {fetchedTokenData.fetchedTokenSymbol} Tokens Balance Is
              Insufficient!
            </h3>
          )}
          <Card className="addBox" data-aos="zoom-in">
            <Card.Body>
              <Card.Title className="fs-2 text-center">Send Tokens!</Card.Title>
              <Card.Text>
                <p>
                  <b>Token: </b>
                  {fetchedTokenData.fetchedTokenName
                    ? fetchedTokenData.fetchedTokenName
                    : ""}
                </p>

                <p>
                  <b>Balance: </b>{" "}
                  <span className="text-danger">
                    {fetchedTokenData.fetchedTokenUserBalance
                      ? fetchedTokenData.fetchedTokenUserBalance + "  "
                      : "0"}{" "}
                  </span>
                  {fetchedTokenData.fetchedTokenSupply
                    ? fetchedTokenData.fetchedTokenSupply + " "
                    : ""}
                  {fetchedTokenData.fetchedTokenSymbol
                    ? fetchedTokenData.fetchedTokenSymbol
                    : ""}
                </p>

                <p style={{ wordBreak: "break-all" }}>
                  <b>Token Address: </b> {id}
                </p>
              </Card.Text>
              {/*form-start */}
              <Form className="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Wallet Address..."
                    name="walletAddress"
                    required
                    onChange={(e) => setWalletAddress(e.target.value)}
                    disabled={
                      fetchedTokenData.fetchedTokenUserBalance == 0
                        ? true
                        : false
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    min="1"
                    max={fetchedTokenData.fetchedTokenUserBalance}
                    placeholder="Token Amount..."
                    name="tokenAmount"
                    required
                    onChange={(e) => setTokenAmount(e.target.value)}
                    disabled={
                      fetchedTokenData.fetchedTokenUserBalance == 0
                        ? true
                        : false
                    }
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    sendToken(id, walletAddress, tokenAmount);
                  }}
                  disabled={
                    fetchedTokenData.fetchedTokenUserBalance == 0 ? true : false
                  }
                >
                  Send Tokens!{" "}
                </Button>
              </Form>
              {/*  form-end */}
            </Card.Body>
          </Card>
        </Container>
      )}
      {showModalNotification && ModalNotification()}
      {showModalLoading && ModalLoading()}
    </div>
  );
};

export default Send;

//!---------------------------------

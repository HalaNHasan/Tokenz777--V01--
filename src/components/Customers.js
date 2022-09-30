import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

//for light animation when loading the page:
import Aos from "aos";
import "aos/dist/aos.css";
//to import ContractContext:
import { ContractContext } from "../context/ContractProvider";
const Customers = () => {
  const navigate = useNavigate();
  const {
    currentAccount,
    customers,
    showModalNotification,
    ModalNotification,
    getAllCustomers,
    isChanged,
    ModalLoading,
    showModalLoading,
    correctNetwork,
  } = useContext(ContractContext);

  //!-----------handleTransferOrBuy-end--------------
  const renderTooltip = (content) => (
    <Tooltip id="button-tooltip">{content}</Tooltip>
  );
  const mainContent = () => {
    return (
      <div className="bgWelcome centeredDiv">
        {correctNetwork && (
          <Container
            className="d-flex flex-column justify-content-center align-items-center py-3 text-center"
            data-aos="zoom-out"
          >
            {/* table start */}

            <h3 className="text-light">Tokens Creatd By this Contract</h3>
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{ wordBreak: "break-word" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Decimal</th>
                  <th>Network</th>
                  <th>Owner Address</th>
                  <th>Token Address</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map((token, ind) => {
                    return (
                      <>
                        <tr>
                          <td>{token.tokenName}</td>
                          <td>{token.tokenSymbol}</td>
                          <td>{token.tokenDecimal}</td>
                          <td>{token.tokenNetwrok}</td>
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip(token.tokenCreator)}
                          >
                            <td>
                              {token.tokenCreator.slice(0, 6) +
                                "..." +
                                token.tokenCreator.slice(
                                  token.tokenCreator.length - 7,
                                  token.tokenCreator.length - 1
                                )}
                            </td>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip(token.tokenCreator)}
                          >
                            <td>
                              {token.tokenAddress.slice(0, 6) +
                                "..." +
                                token.tokenAddress.slice(
                                  token.tokenAddress.length - 7,
                                  token.tokenAddress.length - 1
                                )}
                            </td>
                          </OverlayTrigger>
                          <td>
                            <Link
                              to={`/send/${token.tokenAddress}`}
                              className="mx-2"
                            >
                              Send
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>

            {/* table end */}
          </Container>
        )}
      </div>
    );
  };
  useEffect(() => {
    Aos.init({ duration: 1500 });
    getAllCustomers();
  }, [isChanged]);
  return (
    <>
      {mainContent()}
      {showModalNotification && ModalNotification()}
      {showModalLoading && ModalLoading()}
    </>
  );
};

export default Customers;

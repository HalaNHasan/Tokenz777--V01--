//all web3 calls are going to be done here and provided to the project components
import React, { useEffect, useState, createContext } from "react";
import TokenzSDK from "tokenzsdk-v0";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const tokenzSDK = new TokenzSDK();
  //state variables:
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [customers, setCustomers] = useState([]);
  //to get form data from Create component:
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenSupply: "",
    tokenDecimal: "18",
    tokenNetwork: "BNB",
  });

  //to save fetched token data:
  const [fetchedTokenData, setFetchedTokenData] = useState({
    fetchedTokenName: "",
    fetchedTokenSymbol: "",
    fetchedTokenSupply: "",
    fetchedTokenUserBalance: "",
  });

  //!-----------ModalNotification-start--------------
  const [showModalNotification, setShowModalNotification] = useState(false);
  const [modalNotificationMessage, setModalNotificationMessage] = useState("");
  const ModalNotification = () => {
    return (
      <Modal
        centered
        show={showModalNotification}
        onHide={() => {
          setShowModalNotification(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Message!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalNotificationMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowModalNotification(false);
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [showModalLoading, setShowModalLoading] = useState(false);
  const ModalLoading = () => {
    return (
      <Modal centered show={showModalLoading} size="sm">
        <Modal.Body className="d-flex flex-column align-items-center">
          <p>
            <b>Please Wait...</b>
          </p>
          <Spinner animation="border" role="status"></Spinner>
        </Modal.Body>
      </Modal>
    );
  };
  //!-----------ModalNotification-end--------------
  //! to load main contract
  let provider = window.ethereum;
  const loadMainContract = async () => {
    let message = await tokenzSDK.loadMainContract();
    if (message.status) {
      return message.message;
    } else {
      setCorrectNetwork(false);
      setModalNotificationMessage(message.message);
      setShowModalNotification(true);
    }
  };
  //! to load current user account
  const connectAccount = async () => {
    let message = await tokenzSDK.connectAccount();
    if (message.status) {
      setCurrentAccount(message.message);
    } else {
      setModalNotificationMessage(message.message);
      setShowModalNotification(true);
      setIsChanged(!isChanged);
    }
  };
  //! to load token contract:
  const loadTokenContract = async (tokenContractId) => {
    let message = await tokenzSDK.loadTokenContract(tokenContractId);
    setFetchedTokenData({
      ...fetchedTokenData,
      fetchedTokenName: message.fetchedTokenName,
      fetchedTokenSymbol: message.fetchedTokenSymbol,
      fetchedTokenSupply: message.fetchedTokenSupply,
      fetchedTokenUserBalance: message.fetchedTokenUserBalance,
    });
  };
  //to connect to Smart Chain-Testnet automaticaly
  const connectSmartCahinTestnet = async () => {
    let message = await tokenzSDK.connectSmartCahinTestnet();
    if (message.status) {
      setCorrectNetwork(true);
      setModalNotificationMessage(message.message);
      setShowModalNotification(true);
    } else {
      setCorrectNetwork(false);
      setModalNotificationMessage(message.message);
      setShowModalNotification(true);
    }
  };
  //! to get customers/tokens created by the contract:
  const getAllCustomers = async () => {
    let message = await tokenzSDK.getAllCustomers();
    if (message.status) {
      setCustomers(message.message);
    }
  };

  //! to send tokens to a wallet address:
  const sendToken = async (tokenContractId, walletAddress, tokenAmount) => {
    setShowModalLoading(true);
    try {
      let message = await tokenzSDK.sendToken(
        tokenContractId,
        walletAddress,
        tokenAmount
      );
      if (message.status) {
        setShowModalLoading(false);
        setModalNotificationMessage(message.message);
        setShowModalNotification(true);
        setIsChanged(!isChanged);
      } else {
        setModalNotificationMessage(message.message);
        setShowModalLoading(false);
        setShowModalNotification(true);
      }
    } catch (error) {
      setShowModalLoading(false);
    }
  };

  //! a function to enable Create component to modify formData//to update the formDATA
  const handleCreateFormChange = (e) => {
    let newVal = e.target.value;
    let targetField = e.target.name;
    setFormData((prevState) => ({ ...prevState, [targetField]: newVal }));
  };

  //! to create a new token
  const createToken = async () => {
    const { tokenName, tokenSymbol, tokenSupply, tokenNetwork } = formData;
    try {
      if (tokenName && tokenSymbol && tokenSupply) {
        setShowModalLoading(true);
        let message = await tokenzSDK.createToken(
          tokenName,
          tokenSymbol,
          tokenSupply,
          tokenNetwork
        );
        if (message.status) {
          setShowModalLoading(false);
          setModalNotificationMessage(message.message);
          setShowModalNotification(true);
          setIsChanged(!isChanged);
        } else {
          setShowModalLoading(false);
          setModalNotificationMessage(message.message);
          setShowModalNotification(true);
        }
      }
    } catch (error) {
      setShowModalLoading(false);
    }
  };

  if (provider != undefined) {
    //to detect metamak wallet change:
    provider.on("accountsChanged", function (accounts) {
      setCurrentAccount(accounts[0]);
      setIsChanged(!isChanged);
    });
    //to detect network change:
    provider.on("chainChanged", () => {
      connectSmartCahinTestnet();
    });
  }

  useEffect(() => {
    if (!correctNetwork) {
      connectSmartCahinTestnet();
    }
    getAllCustomers();
    connectAccount();
  }, [isChanged]);

  return (
    <ContractContext.Provider
      value={{
        connectAccount,
        currentAccount,
        customers,
        getAllCustomers,
        loadTokenContract,
        fetchedTokenData,
        handleCreateFormChange,
        createToken,
        sendToken,
        formData,
        //to show notifications:
        showModalNotification,
        ModalNotification,
        isChanged,
        ModalLoading,
        showModalLoading,
        correctNetwork,
        connectSmartCahinTestnet,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

import "./App.css";
import Web3 from "web3";
import { useEffect, useState } from "react";
import banner from "./img/Banner.png";

function App() {
  const [account, setAccount] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [amountToMint, setAmountToMint] = useState(1);
  const [chainId, setChainId] = useState();
  const [minted, setMinted] = useState(false);

  const web3 = new Web3(window.ethereum);

  const preferredNetwork = 80001;

  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amountToMint",
          type: "uint256",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseExtension",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "mintRate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const ADDRESS = "0x58251A15551A6215a7Df8232E489CFe43F4083e8";

  const contract = new web3.eth.Contract(ABI, ADDRESS);

  useEffect(() => {
    (async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await web3.eth.getAccounts();

        if (typeof accounts[0] !== "undefined") {
          setAccount(accounts[0]);
          const chainId = await web3.eth.getChainId();

          setChainId(chainId);
        }
      } else {
        window.alert("Please install MetaMask");
      }
    })();
  }, []);

  const connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if (typeof window.ethereum !== "undefined") {
      const accounts = await web3.eth.requestAccounts();

      const chainId = await web3.eth.getChainId();

      if (typeof accounts[0] !== "undefined") {
        setAccount(accounts[0]);
        setChainId(chainId);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  const mint = async () => {
    const ethToSend = 10000000000000000 * amountToMint;
    contract.methods
      .safeMint(account, amountToMint)
      .send({ from: account, value: ethToSend.toString() });

    setMinted(true);
  };

  if (chainId != preferredNetwork && account) {
    return (
      <div className="App">
        <h1>Please connect to rinkeby, then hit the connect button...</h1>
        <button onClick={connectWallet} className="mintButton">
          Connect
        </button>
        <br />
        <br />
        <h1>About this project</h1>
        <br />
        <div className="about">
          <p>
            This project was created by Joseph Bickford (me) to show my
            knowledge in programming web3 apps and furthermore, explore the
            space. If you would like you may mint an axolotl to show some
            support since I'm broke but I imagine you didnt come here for that.
            There are 250 of these.
          </p>
        </div>
      </div>
    );
  }

  if (account) {
    return (
      <div className="App">
        <h1>Hello</h1>
        <p> {account} </p>
        <h1 className="title">Axolotls</h1>
        <img className="banner" src={banner} alt="the nfts" />
        {!minted && (
          <>
            <div className="amount">
              <button
                className="lessButton"
                onClick={() => {
                  if (amountToMint > 1) {
                    setAmountToMint(amountToMint - 1);
                  }
                }}
              >
                Less
              </button>
              <h3>{amountToMint}</h3>
              <button
                className="moreButton"
                onClick={() => {
                  if (amountToMint < 10) {
                    setAmountToMint(amountToMint + 1);
                  }
                }}
              >
                More
              </button>
            </div>
            <br />
            <p>Cost of minting is 5 MATIC per axolotl</p>
            <button className="mintButton" onClick={mint}>
              {amountToMint == 1
                ? "Mint 1 Axolotl"
                : `Mint ${amountToMint} Axolotls`}
            </button>
            <p>Total before gas fees: {5 * amountToMint} MATIC</p>
          </>
        )}
        {minted && <h1>Thank you for supporting!!!</h1>}
        <br />
        <br />
        <br />
        <h1>About this project</h1>
        <br />
        <div className="about">
          <p>
            This project was created by Joseph Bickford (me) to show my
            knowledge in programming web3 apps and furthermore, explore the
            space. If you would like you may mint an axolotl to show some
            support since I'm broke but I imagine you didnt come here for that.
            There are 250 of these.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Please connect your wallet...</h1>
      <button className="mintButton" onClick={connectWallet}>
        Connect
      </button>
      <br />
      <br />
      <h1>About this project</h1>
      <br />
      <div className="about">
        <p>
          This project was created by Joseph Bickford (me) to show my knowledge
          in programming web3 apps and furthermore, explore the space. If you
          would like you may mint an axolotl to show some support since I'm
          broke but I imagine you didnt come here for that. There are 250 of
          these.
        </p>
      </div>
    </div>
  );
}

export default App;

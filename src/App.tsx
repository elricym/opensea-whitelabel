import { iframeResizer } from "iframe-resizer";
import React from "react";
import { ASSET_URL, CHOSEN_THEME } from "./constants";
import {
  connectWallet,
  initAccounts,
  initialize,
  onClickConnect,
} from "./index";
import logo from "./static/images/logo.png";
import "./static/styles/App.css";
import { CrowdsaleUtils } from "./utils/CrowdSaleUtils";

const embeddedUrl = `${ASSET_URL}?embed=${CHOSEN_THEME}`;

class App extends React.Component {
  state = {
    account: "",
    logo: logo,
    accountBlance: Number,
  };

  accounts: Array<any> = [];

  componentDidMount() {
    initialize();

    connectWallet();

    this.loadBlockchainData();
    iframeResizer({ log: false, scrolling: "auto" }, "#opensea-iframe");
  }

  async loadBlockchainData() {
    const seaport = CrowdsaleUtils.createPort();
    const asset = await seaport.api.getAsset({
      tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
      tokenId: "1", // Token ID
    });
    let accountBalance = await CrowdsaleUtils.fetchAsset(asset);

    this.accounts = await initAccounts();
    this.setState({ logo: asset.imageUrl, accountBalance: accountBalance });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.logo} className="App-logo" alt="logo" />
          <p>My account: {this.accounts[0]}</p>
          {/* <i className="material-icons right">menu</i> */}
          <button id="connectButton" onClick={onClickConnect}>
            Connect Metamask
          </button>
        </header>
        <main className="App-main">
          <div className="App-iframe">
            <iframe
              id="opensea-iframe"
              title="Embedded OpenSea Marketplace"
              src={embeddedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

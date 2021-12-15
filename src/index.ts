import MetaMaskOnboarding from "@metamask/onboarding";

declare let window: any;

export const connectWallet = () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  }
};

export const onClickConnect = async () => {
  try {
    const newAccounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // handleNewAccounts(newAccounts);
  } catch (error) {
    console.error(error);
  }
};

export function initialize() {
  const onboardButton =
    document.getElementById("connectButton") ?? document.body;

  const onboarding = new MetaMaskOnboarding();

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      onboardButton.innerText = "Click here to install MetaMask!";
      onboardButton.onclick = onClickInstall;
    } else {
      onboardButton.innerText = "Connect";
      onboardButton.onclick = onClickConnect;
    }
  };

  const onClickInstall = () => {
    try {
      //   onboardButton.innerText = "Onboarding in progress";
      //   (onboardButton as HTMLButtonElement).disabled = true;
      onboarding.startOnboarding();
    } catch (error) {
      console.error(error);
      onboarding.stopOnboarding();
    }
  };

  MetaMaskClientCheck();
}

export async function initAccounts() {
  const onboardButton =
    document.getElementById("connectButton") ?? document.body;

  onboardButton.innerText = "Connected";
  (onboardButton as HTMLButtonElement).disabled = true;

  try {
    const newAccounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return newAccounts;
  } catch (err) {
    console.error("Error on init when getting accounts", err);
    return [];
  }
}

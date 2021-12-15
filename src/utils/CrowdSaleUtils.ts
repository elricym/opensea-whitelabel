import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { Asset } from "opensea-js/lib/types";
import { accountAddress } from "../constants";

declare let window: any;

export class CrowdsaleUtils {
  static openSeaPort: OpenSeaPort;

  static createPort(): OpenSeaPort {
    const providers = new Web3.providers.HttpProvider(
      "https://mainnet.infura.io"
    );

    const seaport = new OpenSeaPort(providers, {
      networkName: Network.Main,
    });

    this.openSeaPort = seaport;
    return seaport;
  }

  static async fetchAsset(asset: Asset) {
    const res = await this.openSeaPort.getAssetBalance({
      accountAddress: accountAddress,
      asset: asset,
    });

    return res;
  }
}

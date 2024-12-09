import { Provider, Wallet } from 'fuels';

const networkUrl = process.env.NETWORK_URL;
const privateKey = process.env.PRIVATE_KEY;

export const fuelProvider = async () => await Provider.create(networkUrl!);
export const myWallet = async () => Wallet.fromPrivateKey(privateKey!, await fuelProvider());
import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';
import { formatEther } from 'viem';
import { fuelProvider, myWallet } from '../fuels/createFuelClient.js';
import { BN } from 'fuels';

interface GetBalanceArgs {
    wallet: Address;
}

export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance',
            description: 'Get the balance of a wallet',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address to get the balance of',
                    }
                },
                required: ['wallet']
            }
        }
    },
    handler: async ({ wallet }) => {
        return await getBalance(wallet);
    }
};

async function getBalance(wallet: Address) {
    const balance: BN = await (await myWallet()).getBalance((await fuelProvider()).getBaseAssetId());
    return balance.toString();
}
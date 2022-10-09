import React from 'react';
import { UserService } from '../UserService';

export const Page3 = () => {

    const getEthBalance = async () => {

        console.log(window.ethereum.isMetamask);
        console.log(window.ethereum.selectedAddress);
        console.log(window.ethereum.selectedAddress);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts)





        // Refund balance
    }

    const sendEth = async () => {

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }).catch(e => {
            console.log("cancelled!");
        });
    }
    const changeChain = async (event) => {
        try {
            console.log(event)
            console.log(event.target.value)
            let chainId = event.target.value
            if (chainId == 'none') {
                return;
            }
            console.log(chainId)
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            console.log(switchError)
            // if (switchError.code === 4902) {
            //   try {
            //     await ethereum.request({
            //       method: 'wallet_addEthereumChain',
            //       params: [
            //         {
            //           chainId: '0xf00',
            //           chainName: '...',
            //           rpcUrls: ['https://...'] /* ... */,
            //         },
            //       ],
            //     });
            //   } catch (addError) {
            //     // handle "add" error
            //   }
            // }
            // handle other "switch" errors
        }
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-white text-center mt-5">Connect to metamask here!</h1>
                </div>
                <div className="col-12 text-center">
                    {
                        typeof window.ethereum !== 'undefined' ?
                            <div>
                                <button className="btn btn-success btn-lg" onClick={getEthBalance}>Connect To Metamask!</button>
                                <button className="btn btn-success btn-lg" onClick={sendEth}>Send eth</button>

                                <div>

                                    <select className="form-select" onChange={changeChain}>
                                        <option value="none" selected>Please select one</option>
                                        <option value="0x1">eth mainnet</option>
                                        <option value="0x3">eth testnet(ropsten)</option>
                                        <option value="0x5">eth testnet(guerli)</option>
                                        <option value='0x61'>bnb testnet</option>
                                    </select>
                                </div>
                            </div>

                            :
                            <h1 className="text-white text-center mt-5">Install/enable Metamsk extention</h1>


                    }
                    {/* <button className="btn btn-success btn-lg" onClick={getEthBalance}>Get Eth balance</button> */}
                </div>
            </div>
        </div>
    );
}
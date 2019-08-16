import { ethers } from 'ethers'
import PublicEntryABI from './abi/PublicEntry.json'
import AuctionsDB_ABI from './abi/AuctionsDB.json'
import EthConverter from '../../utils/converter'

export default class BlockchainClient {

    constructor(){
        window.ethereum.enable()
        this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        this.signer = this.provider.getSigner()
        this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, this.signer)
        this.auctionsDB = new ethers.Contract('0xB7E5f9158bE253618171C9F99A619a8e6Fb74F3F', AuctionsDB_ABI, this.signer)

        this.currentAddress = window.web3.eth.accounts[0].toLowerCase()
        this.ethConverter = new EthConverter()
    }

    async deposit(swopRefNo, amount){
        let txHash = await this.entryContract.deposit(
                                ethers.utils.formatBytes32String(swopRefNo), 
                                { value : this.ethConverter.usdToEthInWei(amount) })
        console.log(txHash.hash)
        return txHash.hash
    }

    async closeAuction(swopRefNo, highestBidAmount, nonce, signature){
        let gasLimit = ethers.utils.bigNumberify(3000000)

        let hexSwopRefNo = ethers.utils.formatBytes32String(swopRefNo);
        let bytesNonce = ethers.utils.formatBytes32String(`${nonce-1}:nonce`);
        let amountInWei = ethers.utils.parseEther('' + this.ethConverter.usdToEth(highestBidAmount))

        let tx = await this.entryContract.close(
                    hexSwopRefNo,
                    amountInWei,
                    bytesNonce,
                    signature.r,
                    signature.s,
                    signature.v,
                    { gasLimit : gasLimit}
        )

        console.log(tx.hash)
        return tx.hash
    }


    async postTicket(swopRefNo, amount, lowestAskAmount){
        let gasLimit = ethers.utils.bigNumberify(3000000)

        let txHash = await this.entryContract.postTicket(
                                    ethers.utils.formatBytes32String(swopRefNo), 
                                    this.ethConverter.usdToEthInWei(amount), 
                                    this.ethConverter.usdToEthInWei(lowestAskAmount),
                                    false, { gasLimit : gasLimit})
        console.log(txHash.hash)
        return txHash.hash
    }

    async buyTicket(swopRefNo, amount){
        let txHash = await this.entryContract.buyTicket(
                                    ethers.utils.formatBytes32String(swopRefNo), 
                                    { value : this.ethConverter.usdToEthInWei(amount) })
        console.log(txHash.hash)
        return txHash.hash
    }

    async isBidder(swopRefNo){
        return await this.auctionsDB.isBidder(ethers.utils.formatBytes32String(swopRefNo), this.currentAddress)
    }

    async getDepositedAmount(swopRefNo){
        return await this.auctionsDB.getDepositedAmount(ethers.utils.formatBytes32String(swopRefNo), this.currentAddress)
    }

    async getTopBidder(swopRefNo){
        return await this.auctionsDB.getTopBidder(ethers.utils.formatBytes32String(swopRefNo))
    }

}
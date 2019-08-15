import { ethers } from 'ethers'
import PublicEntryABI from './abi/PublicEntry.json'
import AuctionsDB_ABI from './abi/AuctionsDB.json'


export default class BlockchainClient {

    constructor(){
        window.ethereum.enable()
        this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        this.signer = this.provider.getSigner()
        this.entryContract = new ethers.Contract("0xCfEB869F69431e42cdB54A4F4f105C19C080A601", PublicEntryABI, this.signer)
        this.auctionsDB = new ethers.Contract('0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7', AuctionsDB_ABI, this.signer)

        this.currentAddress = window.web3.eth.accounts[0].toLowerCase()
    }

    async deposit(swopRefNo, amount){
        let txHash = await this.entryContract.deposit(
                                ethers.utils.formatBytes32String(swopRefNo), 
                                { value : 1231231 })
        console.log(txHash.hash)
        return txHash.hash
    }

    async closeAuction(swopRefNo, topBidAmount, nonce, signature){
        let gasLimit = ethers.utils.bigNumberify(3000000)
        let topBidAmountWei = 123456 // TODO convert to USD to wei

        let tx = await this.entryContract.close(
                    ethers.utils.formatBytes32String(swopRefNo),
                    topBidAmountWei,
                    ethers.utils.formatBytes32String(`${nonce}:nonce`),
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
                                    amount, 
                                    lowestAskAmount,
                                    false, { gasLimit : gasLimit})
        console.log(txHash.hash)
        return txHash.hash
    }

    async buyTicket(swopRefNo, amount){
        let wei = 0.00000001
        let txHash = await this.entryContract.buyTicket(ethers.utils.formatBytes32String(swopRefNo), {value : wei})
        console.log(txHash.hash)
        return txHash.hash
    }

    async isBidder(swopRefNo){
        return await this.auctionsDB.isBidder(ethers.utils.formatBytes32String(swopRefNo), this.currentAddress)
    }

}
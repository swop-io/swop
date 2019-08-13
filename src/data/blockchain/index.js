import { ethers } from 'ethers'
import PublicEntryABI from './abi/PublicEntry.json'


export default class BlockchainClient {

    constructor(){
        window.ethereum.enable()
        this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
        this.signer = this.provider.getSigner()
        this.entryContract = new ethers.Contract("0x4bf3A7dFB3b76b5B3E169ACE65f888A4b4FCa5Ee", PublicEntryABI, this.signer)
    }

    async deposit(swopRefNo, amount){
        let txHash = await this.entryContract.deposit(ethers.utils.formatBytes32String(swopRefNo), 
                        { value : 1231231 })
        console.log(txHash.hash)
        return txHash.hash
    }

    async postTicket(swopRefNo, amount){
        let txHash = await this.entryContract.postTicket(ethers.utils.formatBytes32String(swopRefNo), amount)
        console.log(txHash.hash)
        return txHash.hash
    }

    async buyTicket(swopRefNo, amount){
        let wei = 0.00000001
        let txHash = await this.entryContract.buyTicket(ethers.utils.formatBytes32String(swopRefNo), {value : wei})
        console.log(txHash.hash)
        return txHash.hash
    }


}
import { ethers } from 'ethers'

export default class EthConverter {

    constructor(){
        this.ethPrice = 8000
    }

    usdToEthInWei(amount){
        return ethers.utils.parseEther('' + (amount / this.ethPrice))
    }

    usdToEth(amount){
        return amount / this.ethPrice
    }
}
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

    weiToUSD(wei){
        let eth = wei / 1000000000000000000 
        return eth * this.ethPrice
    }
}
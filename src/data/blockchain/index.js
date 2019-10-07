import { ethers } from 'ethers'
import PublicEntryABI from './abi/PublicEntry.json'
import AuctionsDB_ABI from './abi/AuctionsDB.json'
import EthConverter from '../../utils/converter'
import web3Obj from './helper'

export default class BlockchainClient {

    constructor(){
      this.provider = null
      this.signer = null
      this.entryContract = null
      this.auctionsDB = null

      this.currentAddress = null
      this.ethConverter = new EthConverter()

    }

    initContracts = () => {
  
        this.provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
        this.signer = this.provider.getSigner()
        this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, this.signer)
        this.auctionsDB = new ethers.Contract('0xB7E5f9158bE253618171C9F99A619a8e6Fb74F3F', AuctionsDB_ABI, this.signer)


        this.ethConverter = new EthConverter()
    }

      async deposit(swopRefNo, amount){
        let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
        let signer = provider.getSigner()
        let gasLimit = ethers.utils.bigNumberify(9000000000000)
        this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, signer)

        let txHash = await this.entryContract.deposit(
                                ethers.utils.formatBytes32String(swopRefNo), 
                                { value : this.ethConverter.usdToEthInWei(amount) })
        console.log(txHash.hash)
        return txHash.hash
    }

    async closeAuction(swopRefNo, highestBidAmount, nonce, signature){
      await web3Obj.initialize()
      let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      let signer = provider.getSigner()
      let gasLimit = ethers.utils.bigNumberify(9000000000000)
      
      this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, signer)

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
      let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      let signer = provider.getSigner()
      let gasLimit = ethers.utils.bigNumberify(30000000)
      
      this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, signer)

        let txHash = await this.entryContract.postTicket(
                                    ethers.utils.formatBytes32String(swopRefNo), 
                                    this.ethConverter.usdToEthInWei(amount), 
                                    this.ethConverter.usdToEthInWei(lowestAskAmount),
                                    false, { gasLimit : gasLimit})
        console.log(txHash.hash)
        return txHash.hash
    }

    async buyTicket(swopRefNo, amount){
      let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      let signer = provider.getSigner()
      let gasLimit = ethers.utils.bigNumberify(9000000000000)
      
      this.entryContract = new ethers.Contract("0xADae430656F2f58D3b99dd35A6f10E7c5345B45e", PublicEntryABI, signer)
      let txHash = await this.entryContract.buyTicket(
                                    ethers.utils.formatBytes32String(swopRefNo), 
                                    { value : this.ethConverter.usdToEthInWei(amount),
                                      gasLimit : gasLimit })
        console.log(txHash.hash)
        return txHash.hash
    }

    async isBidder(swopRefNo){
      // let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      // let signer = provider.getSigner()

      // this.auctionsDB = new ethers.Contract('0xB7E5f9158bE253618171C9F99A619a8e6Fb74F3F', AuctionsDB_ABI, signer)

      //   return await this.auctionsDB.isBidder(ethers.utils.formatBytes32String(swopRefNo), sessionStorage.getItem('selectedAddress'))
    }

    async getDepositedAmount(swopRefNo){
      let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      let signer = provider.getSigner()

      this.auctionsDB = new ethers.Contract('0xB7E5f9158bE253618171C9F99A619a8e6Fb74F3F', AuctionsDB_ABI, signer)
      return await this.auctionsDB.getDepositedAmount(ethers.utils.formatBytes32String(swopRefNo), sessionStorage.getItem('selectedAddress'))
    }

    async getTopBidder(swopRefNo){
      let provider = new ethers.providers.Web3Provider(web3Obj.web3.currentProvider)
      let signer = provider.getSigner()

      this.auctionsDB = new ethers.Contract('0xB7E5f9158bE253618171C9F99A619a8e6Fb74F3F', AuctionsDB_ABI, signer)
        return await this.auctionsDB.getTopBidder(ethers.utils.formatBytes32String(swopRefNo))
    }
}
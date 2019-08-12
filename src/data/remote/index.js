import DevConfig from '../../config/dev.json'
import ProdConfig from '../../config/prod.json'
import config from '../../config/config.json'

const ENDPOINT_VERIFY_TICKET        = 'verifyTicket'
const ENDPOINT_SEARCH               = 'search'
const ENDPOINT_PLACE_BID            = 'placeBid'
const ENDPOINT_GET_TICKET_DETAILS   = "getTicketDetails"

// Etherscan API
const GET_ETHER_PRICE_PARAM         = "?module=stats&action=ethprice&apikey="

export default class APIService {

    constructor(){
        this.config = (config.flavor === 'dev') ? DevConfig : ProdConfig
        this.baseUrl = `${this.config.url}:${this.config.port}`
    }

    search(param){
        return this.fetchData(ENDPOINT_SEARCH, param)
    }

    verifyTicket(param){
        return this.postData(ENDPOINT_VERIFY_TICKET, param)
    }

    getTicketDetails(param){
        return this.fetchData(ENDPOINT_GET_TICKET_DETAILS, param)
    }

    placeBid(param){
        return this.postData(ENDPOINT_PLACE_BID, param)
    }

    getEtherPrice(){
        return fetch(`${this.config.etherscan_url}${GET_ETHER_PRICE_PARAM}${this.config.etherscan_key}`)
    }

    postData(endpoint, param){
        return fetch(`${this.baseUrl}/${endpoint}`, {
            method : "post",
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(param)
        })
    }

    fetchData(endpoint, urlParam){
        return fetch(`${this.baseUrl}/${endpoint}${urlParam}`)
    }
}
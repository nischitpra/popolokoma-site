import {string,id} from './Values/Constants'

class Prefs{
    static init(){
        this.setPortfolioCoinTab(string.btc)
        this.setCurrentExchange(string.binance)
        this.setCandleStickToolbar(
            {
                areaChart:false,
                volumeBar:false,
                sma:false,
                ema:false,
                macd:false,
                rsi:false,
                atr:false,
                stochasticOscillator:false,
                elderRay:false,
                parabolicSAR:false,
                horizontalLine:false,
                bollingerBand:false,
                historyType:{},
            }
        )
        this.setNavbarTab({currentTab:string.navbar.home})
        this.addCoinListToFavourites([])
        this.setFavouritesDetailList([])

        /**
         * set candle stick chart sub toolbar options
         */
        this.setSMAToolbar(13,22,40)
        this.setEMAToolbar(13,22,40)
        this.setARTToolbar(14)
        this.setElderRayToolbar(14)
        this.setMACDToolbar(12,26,9)
        this.setRSIToolbar(14)
        this.setSTOToolbar(14,3,4)
        this.setSubToolbarOpen(true)
        this.saveLine({})
        this.setEmail('')
    }

    static getFavouritesDetailList(){
        return JSON.parse(localStorage.getItem(id.storage.favouritesDetail))
    }
    static setFavouritesDetailList(coinDetailList){
        localStorage.setItem(id.storage.favouritesDetail,JSON.stringify(coinDetailList))
    }
    static getFavouritesList(){
        return JSON.parse(localStorage.getItem(id.storage.favourites))
    }
    static addCoinListToFavourites(coinList){
        localStorage.setItem(id.storage.favourites,JSON.stringify(coinList))
    }
    static setCandleStickToolbar(toolbar){
        localStorage.setItem(id.storage.toolbar,JSON.stringify(toolbar))
    }
    static getCandleStickToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.toolbar))
    }
    static setPortfolioCoinTab(tab){
        localStorage.setItem(id.storage.portfolioCoinTab,JSON.stringify(tab))
    }
    static getPortfolioCoinTab(){
        return JSON.parse(localStorage.getItem(id.storage.portfolioCoinTab))
    }
    static setCurrentExchange(exchange){
        localStorage.setItem(id.storage.currentExchange,JSON.stringify(exchange))
    }
    static getCurrentExchange(){
        return JSON.parse(localStorage.getItem(id.storage.currentExchange))
    }
    static setNavbarTab(tab){
        localStorage.setItem(id.storage.navbarTab,JSON.stringify(tab))
    }
    static getNavbarTab(){
        return JSON.parse(localStorage.getItem(id.storage.navbarTab))
    }


    /**
     * This is for sub tool bar in candle stick charts
     */
    static setSMAToolbar(fast,medium,slow){
        localStorage.setItem(id.storage.sma,JSON.stringify({fast:fast,medium:medium,slow:slow}))
    }
    static getSMAToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.sma))
    }
    static setEMAToolbar(fast,medium,slow){
        localStorage.setItem(id.storage.ema,JSON.stringify({fast:fast,medium:medium,slow:slow}))
    }
    static getEMAToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.ema))
    }
    static setARTToolbar(atr){
        localStorage.setItem(id.storage.atr,JSON.stringify(atr))
    }
    static getATRToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.atr))
    }
    static setElderRayToolbar(elderRay){
        localStorage.setItem(id.storage.elderRay,JSON.stringify(elderRay))
    }
    static getElderRayToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.elderRay))
    }
    static setMACDToolbar(fast,slow,signal){
        localStorage.setItem(id.storage.macd,JSON.stringify({fast:fast,slow:slow,signal:signal}))
    }
    static getMACDToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.macd))
    }
    static setRSIToolbar(rsi){
        localStorage.setItem(id.storage.rsi,JSON.stringify(rsi))
    }
    static getRSIToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.rsi))
    }
    static setSTOToolbar(windowSize,kWindowSize,dWindowSize){
        localStorage.setItem(id.storage.stochasticOscillator,JSON.stringify({windowSize:windowSize,kWindowSize:kWindowSize,dWindowSize:dWindowSize}))
    }
    static getSTOToolbar(){
        return JSON.parse(localStorage.getItem(id.storage.stochasticOscillator))
    }
    static setSubToolbarOpen(value){
        localStorage.setItem(id.storage.subToolbarOpen,JSON.stringify(value))
    }
    static getSubToolbarOpen(){
        return JSON.parse(localStorage.getItem(id.storage.subToolbarOpen))
    }
    static saveLine(list){
        localStorage.setItem(id.storage.lines,JSON.stringify(list))
    }
    static getLine(){
        return JSON.parse(localStorage.getItem(id.storage.lines))
    }

    static setEmail(email){
        localStorage.setItem(id.storage.email,JSON.stringify(email))
    }

    static getEmail(){
        return JSON.parse(localStorage.getItem(id.storage.email))
    }
}
export default Prefs
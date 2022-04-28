import axios from "axios"
import { utils } from "./utils.service"
export const bitcoinService = {
    getRate,
    getMarketPrice,
    getAvgBlockSize,
    getXTimeValues,
    getPointColorsFromValues,
    getFormattedPeriod,
    getFormattedCurrency

}


async function getRate(coins) {
    const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    return data
}

async function getMarketPrice(timespan) {
    // const marketPrice = utils.loadFromStorage('marketPrice')
    // if (marketPrice) return marketPrice
    const { data } = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=${timespan}&format=json&cors=true`)
    utils.storeToStorage('marketPrice', data)
    return data
}

async function getAvgBlockSize(timespan) {
    // const marketPrice = utils.loadFromStorage('avgBlockSize')
    // if (marketPrice) return marketPrice
    const { data } = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=${timespan}&format=json&cors=true`)
    utils.storeToStorage('avgBlockSize', data)
    return data

}

function getXTimeValues(values) {
    return values.map(value => {
        const day = new Date(value.x * 1000).toLocaleDateString(['he-IL'], {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })
        return day
    })

}

function getPointColorsFromValues(values) {
    return values.map((value, idx) => {
        const prev = (idx === 0) ? 0 : idx - 1
        const color = (value.y < values[prev].y) ? '#f00' : '#0f0'
        return color
    })
}

function getFormattedPeriod(values) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }
    return new Date(values[0].x * 1000).toLocaleDateString('he-IL', options) + '-' +
        new Date(values[values.length - 1].x * 1000).toLocaleDateString('he-IL', options)
}

function getFormattedCurrency(coins) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'XBT' }).format(coins).replace('XBT', 'Ƀ')

}

import { util } from './services/util.service.js'

export const locService = {
    getLocs
}


const locs = [
    {id: util.makeId, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: '', createdAt: Date.now, updatedAt: Date.now }, 
    {id: util.makeId, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: '', createdAt: Date.now, updatedAt: Date.now  }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}



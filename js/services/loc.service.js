import { util } from './services/util.service.js'

export const locService = {
    getLocs
}


const locs = [
    {id: util.makeId, name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    {id: util.makeId, name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}



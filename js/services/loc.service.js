// import { util } from './services/util.service.js'

export const locService = {
    getLocs
}


const locs = [
    {id: _makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: '', createdAt: Date.now(), updatedAt: Date.now() }, 
    {id: _makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: '', createdAt: Date.now(), updatedAt: Date.now() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function createLoc(name, lat, lan) {
    return {
        id: _makeId(),
        name,
        lat,
        lan,
        weather: '',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}



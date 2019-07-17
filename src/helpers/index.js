export function getRandomNumber(from = 0, to = 1e9){
    return from+Math.floor(Math.random()*(to-from+1));
} 
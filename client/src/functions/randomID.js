export const generateCustomID = (brand) => {
    const name = brand.replace(/[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/, ' ')
    let prefix = name.substring(0, 3) + '-'

    if (
        brand === 'None' ||
        brand === 'none' ||
        brand === ' ' ||
        brand.length < 2
    ) {
        prefix = 'PID-'
    }

    const randomNumbers = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0')
    const finalText = prefix + randomNumbers
    return finalText.replace(/\s/g, '').toUpperCase()
}

const convertToShortNumber = (value: number) => {
    if (value >= 9999999) {
        return "9.99M"
    } else if (value >= 1000000) {
        return value / 1000000 + "M"
    } else if (value >= 1000) {
        return value / 1000 + "K"
    } else {
        return value
    }
}

export { convertToShortNumber }
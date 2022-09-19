function getButtonNumber(watchlistId)
{
    let idNumber
    let watchlistIdArray = watchlistId.split("")
    idNumber = watchlistIdArray.slice(14).join("")

    return idNumber
}

export {getButtonNumber}
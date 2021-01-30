let getResponse = (description, data) => {
    return {
        'result': {
            'description': description,
            'data': data
        }
    }
}

module.exports = {
    getResponse
}
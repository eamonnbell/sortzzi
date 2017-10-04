var staticMap = {
    'tchaikovsky':'tchaiko*sky OR чайковский OR tchaïkovski'
}

export function embiggen(queryString) {
    return staticMap[queryString.toLowerCase()];
}
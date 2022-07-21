export enum LogRecordType {
    INFO = 'INFO',
    ERROR = 'ERROR'
}

export function newResponse(_success: boolean, _data: any) {
    if (_success)
        return {
            success: _success,
            data: _data
        }
    return {
        success: _success,
        message: _data
    }
}
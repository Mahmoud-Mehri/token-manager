import mongoose from 'mongoose';
import { newResponse } from '../../model/general';
import { ILogRecord, LogRecordModel } from '../../model/logrecord';

export class LogController {

    async addNewLog(logInfo: ILogRecord) {
        return new Promise(async (resolve, reject) => {
            try {
                const logRecord = new LogRecordModel(logInfo);
                await logRecord.save();
                resolve(newResponse(true, logRecord));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async GetLogById(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const log = await LogRecordModel.findById(id);
                if (!log)
                    reject(newResponse(false, "Log Not Found"))
                else
                    resolve(newResponse(true, log));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async GetLogs(from: Date, to: Date) {
        return new Promise(async (resolve, reject) => {
            try {
                let logs = null;
                await LogRecordModel.find({ timestamp: { $gte: from, $lte: to } })
                    .sort({ timestamp: 1 })
                    .then(result => logs = result)
                resolve(newResponse(true, logs));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }
}

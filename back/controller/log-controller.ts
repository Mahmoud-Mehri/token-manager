import mongoose from "mongoose";
import { successResponse, errorResponse, ErrorCode } from "../model/general";
import { ILogRecord, LogRecordModel } from "../model/logrecord";

export class LogController {
  async addNewLog(logInfo: ILogRecord) {
    try {
      const logRecord = new LogRecordModel(logInfo);
      await logRecord.save();
      return successResponse(logRecord);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async GetLogById(id: string) {
    try {
      const log = await LogRecordModel.findById(id);
      if (!log) return errorResponse(ErrorCode.NotFound, "Log Not Found");
      return successResponse(log);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async GetLogs(from: Date, to: Date) {
    try {
      const logs = await LogRecordModel.find({
        timestamp: { $gte: from, $lte: to },
      }).sort({ timestamp: 1 });

      return successResponse(logs);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}

import mongoose from "mongoose";

export enum LogRecordType {
  Exception = "EXCEPTION",
  NotFound = "NOTFOUND",
}

export interface ILogRecord {
  logType: LogRecordType;
  message: string;
  timestamp: Date;
}

const LogRecordSchema = new mongoose.Schema<ILogRecord>({
  logType: {
    type: String,
    enum: LogRecordType,
    uppercase: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const LogRecordModel = mongoose.model("LogRecord", LogRecordSchema);

export { LogRecordModel };

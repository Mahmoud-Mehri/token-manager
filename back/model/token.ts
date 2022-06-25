import mongoose from 'mongoose';

export interface IToken {
    tokenType: string;
    title: string;
    status: string;
    address: string;
    createdDate: Date;
    deployDate: Date;
    activeDate: Date;
    creatorAddress: string;
    ownerAddress: string;
    accounts: [string];
    user: mongoose.Types.ObjectId;
}

const TokenSchema = new mongoose.Schema<IToken>(
    {
        tokenType: {
            type: String,
            enum: ['erc21', 'erc721'],
            set: (val: string) => val.toLowerCase(),
            // get: (val: string) => val.toUpperCase(),
            default: 'pending',
            required: true
        },
        title: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'deployed', 'active', 'inactive'],
            set: (val: string) => val.toLowerCase(),
            // get: (val: string) => val.toUpperCase(),
            default: 'pending',
            required: true
        },
        address: { type: String },
        createdDate: { type: Date, default: new Date(), required: true },
        deployDate: { type: Date },
        activeDate: { type: Date },
        creatorAddress: { type: String, required: true },
        ownerAddress: { type: String, required: true },
        accounts: { type: [String] },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        versionKey: false,
        // toJSON: {
        //     virtuals: true,
        //     getters: true
        // }
    }
)

const Token = mongoose.model<IToken>('Token', TokenSchema);

export { Token }
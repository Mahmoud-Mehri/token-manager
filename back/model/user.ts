import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    accountAddr: string;
}

const emailRegExPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmailValue = (value: string) => {
    const emailRegex = new RegExp(emailRegExPattern);
    return value.match(emailRegex);
}

const checkDuplicateEmail = function async(value: string) {
    return new Promise(async function (resolve, reject) {
        User.findOne({ email: value })
            .then(function (user) {
                if (!user)
                    resolve(true)
                else if (user._id.toString() == this._id.toString())
                    resolve(true)
                else
                    resolve(false);
            })
            .catch((err) => reject(err));
    })
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: [
                {
                    validator: validateEmailValue,
                    message: (props) => `${props.value} is not a valid Email address`
                },
                {
                    validator: checkDuplicateEmail,
                    message: (props) => `${props.value} is already used by another user`
                }
            ]
        },
        password: { type: String, required: true },
        phone: { type: String, trim: true },
        accountAddr: { type: String, required: true }
    },
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            getters: true,
            transform: (doc, converted) => {
                delete converted._id;
                delete converted.password;
            }
        }
    }
)

UserSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }

})

UserSchema.methods.checkPassword = (pass: string, hashedPass: string) => {
    return bcrypt.compareSync(pass, hashedPass);
}

UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    });

const User = mongoose.model<IUser>('User', UserSchema);

export { User }




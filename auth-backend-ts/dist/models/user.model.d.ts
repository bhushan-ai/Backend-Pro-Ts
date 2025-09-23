import mongoose from "mongoose";
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "User" | "Admin";
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map
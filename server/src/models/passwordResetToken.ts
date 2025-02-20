import {Model, model, ObjectId, Schema} from "mongoose";

import {hash, compare} from "bcrypt";
// interface (typescript)
interface PasswordResetTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

// expire them after 1 hrs

const passwordVerificationTokenSchema = new Schema<PasswordResetTokenDocument, {}, Methods>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 60 min * 60 sec = 3600s
    default: Date.now(),
  },
});

passwordVerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

passwordVerificationTokenSchema.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};
export default model("PasswordResetToken", passwordVerificationTokenSchema) as Model<
  PasswordResetTokenDocument,
  {},
  Methods
>;

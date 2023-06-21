import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  gender: string;
  location?: string;
  education?: string;
  study?: string;
  roles: {
    User: number;
    Admin: number;
  };
  password?: string;
  email: string;
  created_at?: Date;
  is_active?: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  study: {
    type: String,
    required: false,
  },
  roles: {
    User: {
      type: Number,
      default: 1,
    },
    Admin: {
      type: Number,
      default: 0,
    },
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  emailVerified: { 
    type: Boolean, 
    default: false 
  },
  phoneVerified: { 
    type: Boolean, 
    default: false 
  },
  phone: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  profilePicture: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const User = mongoose.model("User", userSchema);

export default User;

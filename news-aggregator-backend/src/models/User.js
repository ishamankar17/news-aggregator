import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries by default
    },
    preferences: {
      categories: {
        type: [String],
        enum: ['general', 'technology', 'business', 'health', 'sports', 'entertainment', 'science'],
        default: ['general'],
      },
      darkMode: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.password
        delete ret.__v
        return ret
      },
    },
  }
)

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method: compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Instance method: update last login
userSchema.methods.recordLogin = function () {
  this.lastLogin = new Date()
  return this.save({ validateBeforeSave: false })
}

const User = mongoose.model('User', userSchema)
export default User

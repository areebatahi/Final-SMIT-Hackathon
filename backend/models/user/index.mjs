import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
	{
		name: {
			// type: String,
			type: mongoose.Schema.Types.String,
			required: true,
		},
		email: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		password: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		isCustomer: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);
// userSchema.index({ email:1 },{ unique:true })
const User = mongoose.model('User', userSchema);
export default User;

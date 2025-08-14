import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: String, required: true }, // from OIDC token (subject)
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }], // References to files in this folder
    },
    { timestamps: true }
);

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;

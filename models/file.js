import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // File name
        language: { type: String, required: true }, // Programming language
        code: { type: String, required: true }, // Code content
        folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true }, // Reference to the Folder
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

export default File;

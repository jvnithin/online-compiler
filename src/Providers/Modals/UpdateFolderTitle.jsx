import { useContext } from 'react';
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider.jsx";
import './UpdateFolderTitle.scss';

export const UpdateFolderTitle = () => {
    const { closeModal } = useContext(ModalContext);
    const { editFolderTitle } = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName=e.target.folderName.value
        editFolderTitle(folderName)
    };

    return (
        <div className="modal-container">
            <form className="modal-body" onSubmit={onSubmitModal}>
                <span className="material-icons close-button" onClick={closeModal}>close</span>
                <h1>Update Folder Name</h1>
                <div className="form-group">
                    <input
                        name="folderName"
                        placeholder="Enter new name"
                        required
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};


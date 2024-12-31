import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import "./CreatePlaygroundModal.scss";
import { PlaygroundContext } from "../PlaygroundProvider";
export const UpdateFolderTitleModal = () => {
  const { closeModal , modalPayload } = useContext(ModalContext);
  const {editFolderTitle} = useContext(PlaygroundContext);
  const onSubmitModal = (e) =>{
    e.preventDefault();
    const folderName = e.target.folderName.value;
    editFolderTitle(folderName , modalPayload);
    closeModal();
  }
  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <button className="close-button" aria-label="Close">
          <span onClick={closeModal} className="material-icons">close</span>
        </button>
        <h1>Update Folder Title</h1>
        <div>
            <input name="folderName" placeholder="Enter folder name" />
            <button type="submit">Update Folder</button>
        </div>
      </form>
    </div>
  );
};

import { useContext } from "react";
import "./CreatePlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
export const UpdateFileTitleModal = () =>{
    const {closeModal,modalPayload} = useContext(ModalContext);
    const {editFileTitle} = useContext(PlaygroundContext)
    const onSubmitModal = (e) =>{
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
        closeModal();
    }
    return (
      <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
          <button className="close-button" aria-label="Close">
            <span onClick={closeModal} className="material-icons">
              close
            </span>
          </button>
          <h1>Update Card Title</h1>
          <div>
            <input name="fileName" placeholder="Enter card name" />
            <button type="submit">Update Card Title</button>
          </div>
        </form>
      </div>
    );
}
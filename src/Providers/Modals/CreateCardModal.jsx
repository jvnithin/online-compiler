import { v4 } from "uuid"
import { useContext } from "react"
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext, defaultCodes } from "../PlaygroundProvider";
import "./CreatePlaygroundModal.scss"
export const CreateCardModal = () =>{
    const { closeModal , modalPayload} = useContext(ModalContext);
    const {createPlayground} = useContext(PlaygroundContext);
    const onSubmitModal = (e) =>{
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        const file = {
            id : v4(),
            title : fileName,
            language,
            code:defaultCodes[language]
        }
        createPlayground(modalPayload , file);
        closeModal();
    }
    return (
      <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
          <span onClick={closeModal} className="material-icons">
            close
          </span>
          <h2>Create New Playground</h2>
          <div className="item">
            <p>Enter card name</p>
            <input name="fileName" required />
          </div>
          <div className="item">
            <select name="language" required>
              <option value="cpp">CPP</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
            </select>
            <button type="submit">Create Playground</button>
          </div>
        </form>
      </div>
    );
}
import { useParams } from "react-router-dom";
import { EditorContainer} from "./EditorContainer";
import "./index.scss"
export const PlaygroundScreen=()=>{
    const params = useParams();
    const {fileId , folderId} = params ;
    return (
      <div className="playground-container">
        <div className="header-container">
          <img
            src="/logo.avif"
            alt="Card Thumbnail"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <h2 style={{ color: "white" }} className="icon-container">Coding Playground</h2>
        </div>
        <div className="content-container">
          <div className="editor-container">
            <EditorContainer />
          </div>
          <div className="input-output-container">
            <div className="input-output-header">
              <b>Input:</b>
              <label htmlFor="input" className="icon-container">
                <span className="material-icons">cloud_upload</span>
                <span className="">Import Input</span>
              </label>
              <input type="file" id="input" style={{ display: "none" }} />
            </div>
            <textarea></textarea>
          </div>
          <div className="input-output-container">
            <div className="input-output-header">
              <b>Output:</b>
              <button className="icon-container">
                <span className="material-icons">cloud_download</span>
                <span>Export Output</span>
              </button>
            </div>
            <textarea readOnly></textarea>
          </div>
        </div>
      </div>
    );
}
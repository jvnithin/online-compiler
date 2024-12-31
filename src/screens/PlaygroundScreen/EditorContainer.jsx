import "./EditorContainer.scss";
export const EditorContainer = () =>{
    return (
      <div className="root-editor-container">
        <div className="editor-header">
            <div className="editor-left-container">
                <b>{"title of the card"}</b>
                <span className="material-icons">edit</span>
                <button>Save Code</button>
            </div>
            <div className="editor-right-container">
                <select>
                    <option value="cpp">cpp</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="python">python</option>
                </select>
                <select>
                    <option value="vs-dark">vs-dark</option>
                    <option value="vs-light">vs-light</option>
                </select>
            </div>
        </div>
        <div className="editor-body">Body</div>
        <div className="editor-footer">Footer</div>
      </div>
    );
}
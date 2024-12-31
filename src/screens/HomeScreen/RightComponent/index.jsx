import './index.scss';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { PlaygroundContext } from '../../../Providers/PlaygroundProvider';
import {ModalContext,modalConstants} from '../../../Providers/ModalProvider.jsx'
const Folder = ({ folderTitle, cards ,folderId}) => {
    const navigate = useNavigate();
    const {deleteFolder , deleteFile}=useContext(PlaygroundContext)
    const {openModal , setModalPayload}=useContext(ModalContext)
    const onDeleteFolder=()=>{
        deleteFolder(folderId)
    }
    const onEditFolderTitle=()=>{
        setModalPayload(folderId);
        openModal(modalConstants.UPDATE_FOLDER_TITLE)
    }
    const openCreateCardModal = () =>{
      setModalPayload(folderId);
      openModal(modalConstants.CREATE_CARD)
    }
    return (
      <div className="folder-container">
        <div className="folder-header">
          <div className="folder-header-item">
            <span className="material-icons">folder</span>
            <span>{folderTitle}</span>
          </div>
          <div className="actions">
            <span className="material-icons" onClick={onDeleteFolder}>
              delete
            </span>
            <span className="material-icons" onClick={onEditFolderTitle}>
              edit
            </span>
            <button className="add-playground" onClick={openCreateCardModal}>
              <span className="material-icons">add</span>
              <span>New Playground</span>
            </button>
          </div>
        </div>
        <div className="cards-container">
          {cards?.map((file) => {
            const onEditFile = () => {
              setModalPayload({ fileId: file.id, folderId: folderId });
              openModal(modalConstants.UPDATE_FILE_TITLE);
            };
            const onDeleteFile = () => {
              deleteFile(folderId, file.id);
            };
            const navigateToPlaygroundScreen = () => {
              // console.log({ fileId: file.id }, { folderId });
              navigate(`/playground/${file.id}/${folderId}`)
            };
            return (
              <div
                className="card"
                key={file.id}
                onClick={navigateToPlaygroundScreen}
              >
                <img src="logo.avif" alt="Card Thumbnail" />
                <div className="content">
                  <span className="title">{file.title}</span>
                  <span className="language">Language: {file.language}</span>
                </div>
                <div className="actions">
                  <span className="material-icons" onClick={onDeleteFile}>
                    delete
                  </span>
                  <span className="material-icons" onClick={onEditFile}>
                    edit
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export const RightComponent = () => {
    const { folders } = useContext(PlaygroundContext);

    // Guard clause for undefined or null folders
    if (!folders || folders.length === 0) {
        return <div className="right-container">No folders available.</div>;
    }
    const modalFeatures=useContext(ModalContext)
    const openCreateNewFolder=()=>{
        modalFeatures.openModal(modalConstants.CREATE_FOLDER)
    }
    return (
        <div className="right-container">
            <div className="header">
                <h1>My Playground</h1>
                <button className="add-folder" onClick={openCreateNewFolder}>
                    <span className="material-icons">add</span>
                    <span>New Folder</span>
                </button>
            </div>
            {folders.map((folder) => (
                <Folder folderTitle={folder.title} cards={folder.files} key={folder.id} folderId={folder.id}/>
            ))}
        </div>
    );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create the PlaygroundContext
export const PlaygroundContext = createContext();

// Initial data
const initialData = [
    {
        id: uuidv4(),
        title: 'Spring Boot',
        files: [
            {
                id: uuidv4(),
                title: "spring",
                language: 'java',
                code: `cout<<"Hello World"`
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Frontend',
        files: [
            {
                id: uuidv4(),
                title: "test",
                language: 'javascript',
                code: `console.log("hello world")`
            }
        ]
    }
];

export const defaultCodes = {
    cpp: `
#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`,
    javascript: `console.log("Hello, JavaScript!")`,
    python: `print("Hello, Python!")`,
    java: `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`
};

// Provider component
export const PlaygroundProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => {
        const storedData = localStorage.getItem('data');
        return storedData ? JSON.parse(storedData) : initialData;
    });
    
    const createNewPlayground = (newPlayground) => {
        const { folderName, fileName, language } = newPlayground;
        const newFolders = [...folders];
        newFolders.push({
            id: uuidv4(),
            title: folderName,
            files: [
                {
                    id: uuidv4(),
                    title: fileName,
                    code: defaultCodes[language],
                    language: language
                }
            ],
        });
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    };
    const createNewFolder=(folderName)=>{
        const newFolder={
            id:uuidv4(),
            title:folderName,
            files:[]
        }
        const allFolders=[...folders,newFolder]
        localStorage.setItem('data',JSON.stringify(allFolders));
        setFolders(allFolders);
        // const modifiedFolders=[...folders,...[newFolder]]
    }

    const deleteFolder = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this folder?");
        if (confirmed) {
            const updatedFoldersList = folders.filter((folderItem) => folderItem.id !== id);
            localStorage.setItem('data', JSON.stringify(updatedFoldersList));
            setFolders(updatedFoldersList);
        }
    };
    
    const editFolderTitle = (newFolderName , id) =>{
        const updatedFoldersList = folders.map((folderItem) => {
            if(folderItem.id === id){
                folderItem.title = newFolderName
            }
            return folderItem;
        })
        localStorage.setItem('data',JSON.stringify(updatedFoldersList));
        setFolders(updatedFoldersList);
    }

    const editFileTitle = (newFileName , folderId , fileId) =>{
        const copiedFolders = [...folders];
        for(let i=0;i<copiedFolders.length;i++){
            if(folderId === copiedFolders[i].id){
                const files = copiedFolders[i].files;
                for(let j=0;j<files.length;j++){
                    if(files[i].id === fileId){
                        files[i].title = newFileName ;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }

    const deleteFile = (folderId , fileId) => {
        const copiedFolders = [...folders]
        for(let i = 0 ; i<copiedFolders.length;i++){
            if(copiedFolders[i].id === folderId){
                const files = [...copiedFolders[i].files];
                copiedFolders[i].files = files.filter((file) =>{
                    return file.id !== fileId;
                })
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }

    const createPlayground = (folderId,file) => {
        const copiedFolders = [...folders]
        for(let i=0;i<copiedFolders.length;i++){
            if(copiedFolders[i].id === folderId){
                copiedFolders[i].files.push(file);
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(folders);
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(folders));
    }, [folders]); // Update localStorage whenever `folders` changes

    const playgroundFeatures = {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createPlayground
    };

    return (
        <PlaygroundContext.Provider value={playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
    );
};

// Hook to use the PlaygroundContext
export const usePlayground = () => {
    const context = useContext(PlaygroundContext);
    if (!context) {
        throw new Error('usePlayground must be used within a PlaygroundProvider');
    }
    return context;
};

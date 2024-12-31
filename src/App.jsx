import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen/index.jsx'
import { PlaygroundScreen } from './screens/PlaygroundScreen/index.jsx'
import {PlaygroundProvider} from './Providers/PlaygroundProvider.jsx'
import {ModalProvider} from './Providers/ModalProvider.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PlaygroundProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path='' element={<HomeScreen />} />
              <Route path='/playground/:fileId/:folderId' element={<PlaygroundScreen />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </>
  )
}

export default App

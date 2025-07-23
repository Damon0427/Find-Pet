import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SideBar from './Components/sideBar.jsx'
import './index.css'
import App from './App.jsx'
import NotFound from './Routes/notFound.jsx'
import DetailPage from './Routes/detailPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SideBar />}>
          <Route index element={<App />} />
          <Route path='detailPage/:id' element= {<DetailPage />}/>

        </Route>
          <Route path = '*' element= {<NotFound />}/> 

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

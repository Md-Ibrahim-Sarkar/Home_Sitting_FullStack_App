import { createContext, useState } from "react";

export const IndexContext = createContext()


const ThemeProvider = ({ children }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isEditId, setIsEditId] = useState(null)

  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isViewId, setIsViewId] = useState(null)

  const [isBookingPageOpen, setIsBookingPageOpen] = useState(false)
  const [isBookingId, setIsBookingId] = useState(null)


  const [searchValue, setSearchValue] = useState('')

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = {
    isEditOpen,
    setIsEditOpen,
    isEditId,
    setIsEditId,
    isViewOpen,
    setIsViewOpen,
    isViewId,
    setIsViewId,
    isBookingPageOpen,
    setIsBookingPageOpen,
    isBookingId,
    setIsBookingId,
    searchValue,
    setSearchValue,
    isSidebarOpen,
    setIsSidebarOpen,
  }
  return (

    <IndexContext.Provider value={value}>
      {children}
    </IndexContext.Provider>

  )
}


export default ThemeProvider
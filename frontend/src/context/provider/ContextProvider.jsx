import ThemeProvider from "../index"



const ContextProvider = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </>
  )
}

export default ContextProvider
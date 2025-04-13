import { useContext } from "react"
import { IndexContext } from "../context"


export const UseSearchValue = () => {

  const { searchValue } = useContext(IndexContext)


  return searchValue
}


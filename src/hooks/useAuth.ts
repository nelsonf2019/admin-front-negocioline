import { AuthContext } from "components/entiti/ui/globarl/AuthProvider"
import { useContext } from "react"

const useAuth =()=>{
    const context = useContext(AuthContext)
    return context
}

export default useAuth
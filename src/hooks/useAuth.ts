import { AuthContext, IAuthContext } from "components/entiti/ui/globarl/AuthProvider"
import { useContext } from "react"

const useAuth =()=>{
    const context = useContext(AuthContext)
    return context as IAuthContext 
}

export default useAuth
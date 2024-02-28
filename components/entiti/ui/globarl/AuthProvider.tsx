import { ReactNode, Dispatch, SetStateAction, createContext, useState } from "react"
import { TokenPayload } from "schema/AuthSchema"

interface AuthContextValue{
    user: TokenPayload
    setUser: Dispatch<SetStateAction<TokenPayload>>
}


export const AuthContext = createContext<AuthContextValue | null>(null)

const AuthProvider =({children}:{children:ReactNode})=>{
   const [user, setUser] = useState<TokenPayload >(null)
    return(
         <AuthContext.Provider value={{user, setUser}}>
            {children}
         </AuthContext.Provider>
    )
}

export default AuthProvider;
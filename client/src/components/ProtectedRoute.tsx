import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


interface ProtectedRouteProps {
    allowedRole:"user"|"admin"
}
const ProtectedRoute = ({allowedRole}:ProtectedRouteProps) => {
    const{loading,user}=useAuth()
    
    if(loading){
        return(
        <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
        )
    }
    // Unauthorized

    if(!user){
        return <Navigate to='/login' replace/>
    }
    // Role not allowed
    if(allowedRole && user.role!==allowedRole){
           return <Navigate to="/" replace />;;
    }
// Allow access
  return <Outlet/>
}

export default ProtectedRoute
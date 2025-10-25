import { useEffect } from "react"
import Routes from "./routes/routes"
import useAuthStore from "./stores/useAuthStore"
import { Bounce, ToastContainer } from "react-toastify" 
import { usePostStore } from "./stores/usePostStore"


function App() {

  const { fetchAuth, isGettingAuth, isAuthenticated, fetchUser } = useAuthStore()
  const { fetchPost } = usePostStore()

  useEffect(() => {
    fetchAuth()
    fetchPost()

    if(isAuthenticated){
      fetchUser()
    }
  }, [fetchAuth, isAuthenticated, fetchUser, fetchPost])

  if(isGettingAuth){
    return "LOADING..."
  }

  return (
    <>
      <Routes />


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
    </>
  )
}

export default App

import React,{ useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  // useEffect(()=>(
  //   authService.getCurrentUser()
  //   .then((userData)=>{
  //        if (userData) {
  //         dispatch(login({userData}))
  //        }else{
  //         dispatch(logout())
  //        }
  //   }).catch((error)=>{
  //       console.log(error)
  // })
  //   .finally(()=> setLoading(false))
  // ),[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData(); // Call the async function immediately
  
  }, []);
  
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between  bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:  <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App

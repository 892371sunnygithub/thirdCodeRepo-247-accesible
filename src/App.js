import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Routes from 'routes';
import 'styles/global.scss'
import { ToastContainer } from 'react-toastify';
import { clearItem, getItem } from 'constants/localstorage';
function App() {
  const handleClick = (event) => {
    if(event.keyCode === 13){
      
    }else{
      if (!event.target.id) {
        clearItem('add', '')
        clearItem('id')
      } else if (event.target.id !== getItem('id')) {
        clearItem('id')
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClick)
    document.addEventListener('keyup', handleClick)
    if (window.performance.navigation.type == 1) {
      clearItem('id')
      clearItem('add')
    }
  }, [])

  return (
    <>
      <RouterProvider router={Routes} />
      <ToastContainer
        aria-describedby="message"
        aria-live="assertive"
        aria-atomic="true"
        aria-label="Toast Notifications"
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
        className={'toastify-position'}
        role="alert"
      />
    </>
  );
}

export default App;


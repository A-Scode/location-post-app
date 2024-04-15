import React, { PropsWithChildren } from 'react'
import { ToastProvider } from 'react-native-toast-notifications'

const ToastContextProvider = ({children}:PropsWithChildren) => {
  return (
    <ToastProvider 
    placement='top'
    duration={5000}
    animationType='slide-in'
    animationDuration={500}
    successColor="green"
    dangerColor="red"
    warningColor="orange"
    offset={50}
    swipeEnabled={true}
    >
        {children}
    </ToastProvider>
  )
}

export default ToastContextProvider

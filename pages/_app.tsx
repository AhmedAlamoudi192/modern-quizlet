import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
import { store } from '@redux-state/app/store'
import NavBar from '@components/NavBar'


function MyApp({ Component, pageProps }:AppProps) {
  
  return (
    <Provider store={store}>
      <NavBar/>
  <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

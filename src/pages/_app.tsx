import store from '@/redux/store'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import '@/styles/logout.css'
import 'aos/dist/aos.css';

const metadata = {
  title: 'Blog List',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head >
        <title>{metadata.title}</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

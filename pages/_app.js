import Layout from '../components/layout'
import '../styles/general.scss'

const ZeeApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default ZeeApp

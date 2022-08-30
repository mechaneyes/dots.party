import Layout from '../components/layout'
import '../styles.scss'
import '../styles/footer.scss'

const ZeeApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default ZeeApp

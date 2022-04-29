import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PrivacyPolicySection from '../Components/PrivacyPolicySection'
import axios from 'axios'
// our-domain.com/Home
export default function PrivacyPolicy({test}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          {/* <Banner heading="Real Estate" /> */}
          <PrivacyPolicySection />
      </main>
    
    </div>
  )
}

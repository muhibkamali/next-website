import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../Components/Banner'
import Recreation from '../Components/OurWork/Recreation'
import Testimonials from '../Components/Testimonial'
import axios from 'axios'
// our-domain.com/Home
export default function RecreationMain({test}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recreation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <Banner heading="Recreation" />
          <Recreation/>
          <Testimonials data={test}  />
      </main>
    
    </div>
  )
}

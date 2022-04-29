import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../Components/Banner'
import Cultural from '../Components/OurWork/Cultural'
import Testimonials from '../Components/Testimonial'
import axios from 'axios'
// our-domain.com/Home
export default function CulturalMain({test}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cultural</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <Banner heading="Cultural" />
          <Cultural/>
          <Testimonials data={test}  />
      </main>
    
    </div>
  )
}
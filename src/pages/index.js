import Head from 'next/head'
import styles from './Home.module.css'
import Busca from '../components/Busca/busca'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Busca />
    </div>
  )
}

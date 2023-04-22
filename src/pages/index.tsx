import Header from '@/components/Header'
import Layout from '@/components/Layout'
import Search from '@/components/Search'

export default function Home() {
  return (
    <>
      <Header />
      <Layout>
        <Search/>
      </Layout>
    </>
  )
}

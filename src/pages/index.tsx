import Header from '@/components/Header'
import Layout from '@/components/Layout'
import SearchGithub from '@/components/SearchGithub'

export default function Home() {
  return (
    <>
      <Header />
      <Layout>
        <SearchGithub/>
      </Layout>
    </>
  )
}

import HeroImg from '@components/HeroImg'
import SiteBody from '@components/SiteBody'
import Head from 'next/head'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Modern Quizlet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 lg:px-20 text-center bg-hero-pattern bg-130 bg-no-repeat">
        <HeroImg/>
        <SiteBody/>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-footer ">
        <a
          className="flex items-center justify-center text-white"
        >
          Cloned by Ahmed Alamoudi
        </a>
      </footer>
    </div>
  )
}

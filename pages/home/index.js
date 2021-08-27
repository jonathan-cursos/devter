import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import Link from 'next/link'
import { colors } from 'styles/theme'

export default function HomePage() {
  const [timeLine, setTimeLine] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeLine)
  }, [user])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {console.log(timeLine)}
          {timeLine.map(
            ({ id, userName, avatar, content, userId, createdAt }) => {
              return (
                <Devit
                  key={id}
                  userName={userName}
                  avatar={avatar}
                  content={content}
                  id={id}
                  userId={userId}
                  createdAt={createdAt}
                />
              )
            }
          )}
        </section>
        <nav>
          <Link href='/'>
            <a>
              <Home stroke='#09f' width={32} height={32} />
            </a>
          </Link>
          <Link href='/compose/tweet'>
            <a>
              <Search stroke='#09f' width={32} height={32} />
            </a>
          </Link>
          <Link href='/compose/tweet'>
            <a>
              <Create stroke='#09f' width={32} height={32} />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #eee;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        section {
          flex: 1;
        }
        h2 {
          font-weight: 800;
          font-size: 21px;
          padding-left: 15px;
        }
        nav {
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          background: #fff;
          display: flex;
        }

        nav a {
          display: flex;
          align-items: center;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}

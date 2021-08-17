import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

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
        <nav></nav>
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
        }
      `}</style>
    </>
  )
}

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [timeLine, setTimeLine] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch('/api/statuses/home_timeline')
        .then((res) => res.json())
        .then(setTimeLine)
  }, [user])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeLine.map(({ id, username, avatar, message }) => {
            return (
              <Devit
                key={id}
                username={username}
                avatar={avatar}
                message={message}
                id={id}
              />
            )
          })}
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

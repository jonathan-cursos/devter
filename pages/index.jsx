import Head from 'next/head'
import { useEffect, useState } from 'react'
import AppLayout from 'components/AppLayout'
import Button from 'components/AppLayout/Button'
import GitHub from 'components/Icons/GitHub'
import { colors } from 'styles/theme'

import { loginWithGitHub, onAuthStateChanged } from 'firebase/client'
import Avatar from 'components/Avatar'

export default function Home() {
  const [user, setUser] = useState(null)
  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' type='image/ico' />
      </Head>

      <AppLayout>
        <section>
          <img src='/devter-logo.png' alt='Logo' />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers
          </h2>
          <div>
            {console.log(user)}
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill={'#fff'} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          font-weight: 600;
          margin-bottom: 16px;
          color: ${colors.secondary};
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}

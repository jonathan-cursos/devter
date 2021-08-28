import Head from 'next/head'
import { useEffect } from 'react'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import { colors } from 'styles/theme'
import { useRouter } from 'next/router'

import { loginWithGitHub } from 'firebase/client'
import Logo from 'components/Icons/Logo'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function Home() {
  const user = useUser()
  const router = useRouter()
  const handleClick = () => {
    loginWithGitHub().catch((err) => console.log(err))
  }

  useEffect(() => {
    user && router.replace('/home')
  }, [user])
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' type='image/ico' />
      </Head>
      <section>
        <Logo width='100' />
        <h1>Devter</h1>
        <h2>
          Talk about development
          <br />
          with developers
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub width={24} height={24} fill={'#fff'} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src='/spinner.gif' />}
        </div>
      </section>
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
          font-size: 32px;
          color: ${colors.primary};
        }

        h2 {
          color: ${colors.secondary};
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

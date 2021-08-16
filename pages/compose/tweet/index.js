import { useState } from 'react'
import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'

import { addDevit } from 'firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTweet() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username
    })
      .then(() => {
        router.push('/home')
      })
      .catch((error) => {
        console.log(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length && status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder='¿Qué está pasando?'
            onChange={handleChange}
          ></textarea>
          <Button disabled={isButtonDisabled}>Devittear</Button>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          width: 100%;
          border: 0;
          font-size: 21px;
          padding: 15px;
          resize: none;
          outline: 0;
          min-height: 200px;
        }
      `}</style>
    </>
  )
}

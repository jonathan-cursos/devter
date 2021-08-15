import { useState } from 'react'
import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
// import useUser from 'hooks/useUser'

export default function ComposeTweet() {
  // const user = useUser()
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder='¿Qué está pasando?'
            onChange={handleChange}
          ></textarea>
          <Button disabled={message.length === 0}>Devittear</Button>
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

import { useEffect, useState } from 'react'
import Button from 'components/Button'
import useUser from 'hooks/useUser'

import { addDevit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Avatar from 'components/Avatar'
import Head from 'next/head'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1, // Al momento de arrastrar
  UPLOADING: 2,
  COMPLETE: 4
}

export default function ComposeTweet() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageURL, setImageURL] = useState(null)

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
      userName: user.username,
      img: imageURL
    })
      .then(() => {
        router.push('/home')
      })
      .catch((error) => {
        console.log(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    console.log(e)
    console.log(e.dataTransfer.files[0])
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('Complete')
        task.snapshot.ref.getDownloadURL().then(setImageURL)
      }

      task.on(
        'state_changed', // Evento de firebase
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  return (
    <>
      <Head>
        <title>Crear un nuevo devit / Devter</title>
      </Head>
      <section className='form-container'>
        {user && (
          <section className='avatar-container'>
            <Avatar src={user.avatar} />
          </section>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder='¿Qué está pasando?'
            onChange={handleChange}
            onDragEnter={handleDragEnter} // Cuando entramos
            onDragLeave={handleDragLeave} // Cuando entramos y quitamos
            onDrop={handleDrop} // Cuan entramos y soltamos la imagen
          ></textarea>
          {imageURL && (
            <section className='remove-image'>
              <button
                onClick={() => {
                  setImageURL(null)
                }}
              >
                x
              </button>
              <img src={imageURL} />
            </section>
          )}
          <Button disabled={isButtonDisabled}>Devittear</Button>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          border: 0;
          border-radius: 999px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }

        .remove-image {
          position: relative;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        form {
          padding: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          width: 100%;
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

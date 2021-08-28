import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'

export default function Devit({
  avatar,
  userName,
  content,
  id,
  createdAt,
  img
}) {
  const timeAgo = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <time>{timeAgo}</time>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
          border-bottom: 2px solid #eee;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}

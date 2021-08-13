import styles from './styles.module.css'

const Avatar = ({ src, alt, text, withText }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {text && <strong>{text || alt}</strong>}
    </div>
  )
}

export default Avatar

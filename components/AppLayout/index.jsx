import styles, { global } from './styles'

const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {global}
      </style>
      ;
    </>
  )
}

export default AppLayout

import Devit from 'components/Devit'

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

DevitPage.getInitialProps = (ctx) => {
  const { query, res } = ctx
  const { id } = query

  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiRes) => {
    if (apiRes.ok) return apiRes.json()
    if (res) {
      res.writeHead(301, { Location: '/home' }).end()
    }
  })
}

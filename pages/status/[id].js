import Devit from 'components/Devit'

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { params, res } = ctx
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}

// DevitPage.getInitialProps = (ctx) => {
//   const { query, res } = ctx
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiRes) => {
//     if (apiRes.ok) return apiRes.json()
//     if (res) {
//       res.writeHead(301, { Location: '/home' }).end()
//     }
//   })
// }

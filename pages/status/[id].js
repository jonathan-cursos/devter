import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'mvV4uBgMhkuVFUp6IpEd' } }],
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  const { params } = ctx
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createAdd } = data

      const props = {
        ...data,
        id,
        createdAt: +createAdd.toDate()
      }

      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(ctx) {
//   const { params, res } = ctx
//   const { id } = params

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }
//   if (res) {
//     res.writeHead(301, { Location: '/home' }).end()
//   }
// }

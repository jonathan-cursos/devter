import { firestore } from 'firebase/admin'

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createAdd } = data

      res.json({
        ...data,
        id,
        createdAt: +createAdd.toDate()
      })
    })
    .catch(() => {
      res.status(400).end()
    })
}

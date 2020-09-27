/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  const id = event.id
  console.log(`Function 'update-some'`, data)
  debugger
  return client
    .query(
      q.Map(
        data,
        q.Lambda(
          'player',
          q.Update(q.Ref(q.Collection('players'), q.Select(['ref'], q.Var('player'))), { data: q.Var('player') })
        )
      )
    )
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

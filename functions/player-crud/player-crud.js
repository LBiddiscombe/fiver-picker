exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter((e) => e)

  switch (event.httpMethod) {
    case 'GET':
      // e.g. GET /.netlify/functions/player-crud
      if (segments.length === 0) {
        return require('./read-all').handler(event, context)
      }
      // e.g. GET /.netlify/functions/player-crud/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./read').handler(event, context)
      } else {
        return {
          statusCode: 500,
          body:
            'too many segments in GET request, must be either /.netlify/functions/player-crud or /.netlify/functions/player-crud/123456',
        }
      }
    case 'POST':
      // e.g. POST /.netlify/functions/player-crud with a body of key value pair objects, NOT strings
      return require('./create').handler(event, context)
    case 'PUT':
      if (segments.length === 0) {
        return require('./update-some').handler(event, context)
      }
      // e.g. PUT /.netlify/functions/player-crud/123456 with a body of key value pair objects, NOT strings
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./update').handler(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in POST request, must be /.netlify/functions/player-crud/123456',
        }
      }
    case 'DELETE':
      // e.g. DELETE /.netlify/functions/player-crud/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./delete').handler(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in DELETE request, must be /.netlify/functions/player-crud/123456',
        }
      }
  }
  return {
    statusCode: 500,
    body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
  }
}

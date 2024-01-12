export default {
  response (params = {}) {
    const { statusCode, body, headers } = params

    return {
      statusCode,
      headers,
      body: JSON.stringify(body),
    }
  },

  ok (body, headers) {
    return this.response({ statusCode: 200, body, headers })
  },

  created (body, headers) {
    return this.response({ statusCode: 201, body, headers })
  },

  noContent (headers) {
    return this.response({ statusCode: 204, headers })
  },

  notFound (body, headers) {
    return this.response({ statusCode: 404, body, headers })
  },

  badRequest (body, headers) {
    return this.response({ statusCode: 400, body, headers })
  },

  unprocessableEntity (body, headers) {
    return this.response({ statusCode: 422, body, headers })
  },
}

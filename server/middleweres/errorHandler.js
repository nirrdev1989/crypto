function urlError(request, response, next) {
   const error = new Error('URL ERROR')
   error.status = 404
   error.url = request.url
   next(error)
}

function handleApiError(error, request, response, next) {
   response.status(error.status || 500)
   response.send({
      message: error.message || 'AN UNKNOW ERROR',
      url: error.url,
      status: error.status
   })
}

module.exports = {
   handleApiError,
   urlError
}
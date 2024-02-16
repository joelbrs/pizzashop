export function setDataResponse<T>(data: T) {
  return { error: null, data }
}

export function setErrorResponse(error: Error) {
  return { error, data: null }
}

export class IvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'IvalidParamError'
  }
}

import { HttpException } from '@nestjs/common'

export interface Errors {
  success: boolean
  message: string
}

export const HttpError = (statusCode: number, message: string): HttpException => {
  return new HttpException(
    {
      status: statusCode,
      error: message,
    },
    statusCode
  )
}

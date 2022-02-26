import { Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { HttpError } from 'src/utils/error'
import { imageFileFilter } from 'src/utils/image-filter'
import { DetectionService } from './detection.service'

@Controller('detection')
export class DetectionController {
  constructor(private readonly detectionService: DetectionService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    })
  )
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File
  ): Promise<(Uint8Array | Float32Array | Int32Array)[]> {
    if (file === undefined) {
      throw HttpError(HttpStatus.PRECONDITION_FAILED, 'File parameter is missing')
      return null
    }

    return this.detectionService.detectImage(file)
  }
}

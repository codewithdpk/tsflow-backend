import { Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Rank, Tensor } from '@tensorflow/tfjs-node'
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
  ): Promise<Tensor<Rank> | Tensor<Rank>[]> {
    if (file === undefined) {
      throw HttpError(HttpStatus.PRECONDITION_FAILED, 'File parameter is missing')
    }

    return this.detectionService.detectImage(file)
  }
}

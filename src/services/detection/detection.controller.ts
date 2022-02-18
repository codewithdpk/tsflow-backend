import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { DetectionService } from './detection.service'

@Controller('detection')
export class DetectionController {
  constructor(private readonly detectionService: DetectionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: Express.Multer.File): any {
    return this.detectionService.detectImage(file)
  }
}

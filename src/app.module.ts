import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DetectionModule } from './services/detection/detection.module'
import { imageFileFilter } from './utils/image-filter'

@Module({
  imports: [
    DetectionModule,
    MulterModule.register({
      storage: diskStorage({ destination: '../uploads' }),
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

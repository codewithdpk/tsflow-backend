import { Injectable, Logger } from '@nestjs/common'
import tf from '@tensorflow/tfjs-node'
import { TFSavedModel } from '@tensorflow/tfjs-node/dist/saved_model'

@Injectable()
export class DetectionService {
  private readonly logger = new Logger(DetectionService.name)
  async detectImage(file: any): Promise<any> {
    const loadedModel: TFSavedModel = await tf.node.loadSavedModel(
      'https://hopnstay.com/web_model/model.json'
    )
    this.logger.log(loadedModel)
    const output: any = await loadedModel.predict(file)
    return output
  }
}

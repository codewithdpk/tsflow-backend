import { Injectable, Logger } from '@nestjs/common'
import * as tf from '@tensorflow/tfjs-node'
import { loadGraphModel } from '@tensorflow/tfjs-converter'

@Injectable()
export class DetectionService {
  private readonly logger = new Logger(DetectionService.name)
  async detectImage(file: any): Promise<any> {
    this.logger.log('Entered in detectImage', file)
    const loadedModel = await loadGraphModel('https://hopnstay.com/web_model/model.json')
    let predictionsData = null
    tf.engine().startScope()
    predictionsData = await loadedModel.executeAsync(file).then((prediction) => {
      tf.engine().endScope()
      predictionsData = prediction
    })
    return predictionsData
  }
}

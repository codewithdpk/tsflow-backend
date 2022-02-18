import { Injectable } from '@nestjs/common'
import tf from '@tensorflow/tfjs-node'
import { TFSavedModel } from '@tensorflow/tfjs-node/dist/saved_model'

@Injectable()
export class DetectionService {
  async detectImage(file): Promise<any> {
    const loadedModel: TFSavedModel = await tf.node.loadSavedModel('')
    const output: any = loadedModel.predict(file)
    return output
  }
}

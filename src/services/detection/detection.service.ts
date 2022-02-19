import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import * as tf from '@tensorflow/tfjs-node'
import { loadGraphModel } from '@tensorflow/tfjs-converter'
import { HttpError } from '../../utils/error'
import { Tensor } from '@tensorflow/tfjs-node'

@Injectable()
export class DetectionService {
  private readonly logger = new Logger(DetectionService.name)
  async detectImage(
    file: Express.Multer.File
  ): Promise<(Uint8Array | Float32Array | Int32Array)[]> {
    const imgTensor = tf.node.decodeJpeg(file.buffer)
    const t4d = imgTensor.expandDims(0)
    const loadedModel = await loadGraphModel('file://model/model.json')
    let predictionsData: Tensor<tf.Rank> | Tensor<tf.Rank>[] = []
    try {
      await loadedModel.executeAsync(t4d).then((prediction) => {
        predictionsData = prediction
      })
    } catch (e) {
      this.logger.log(e)
      throw HttpError(HttpStatus.PRECONDITION_FAILED, e)
    }
    const data = predictionsData.map((val) => {
      return val.dataSync()
    })
    return data
  }
}

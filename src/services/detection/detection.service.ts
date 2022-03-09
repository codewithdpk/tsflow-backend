import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import * as tf from '@tensorflow/tfjs-node'
import { loadGraphModel } from '@tensorflow/tfjs-converter'
import { HttpError } from '../../utils/error'
import { Rank, Tensor } from '@tensorflow/tfjs-node'

@Injectable()
export class DetectionService {
  private readonly logger = new Logger(DetectionService.name)
  async detectImage(file: Express.Multer.File): Promise<Tensor<Rank> | Tensor<Rank>[]> {
    const imgTensor = tf.node.decodeJpeg(file.buffer)
    const t4d = imgTensor.expandDims(0)

    const model = await loadGraphModel('file://model/model.json')
    let predictionsData: Tensor<tf.Rank> | Tensor<tf.Rank>[] = []
    try {
      predictionsData = await model.executeAsync(t4d)
    } catch (e) {
      this.logger.log(e)
      throw HttpError(HttpStatus.PRECONDITION_FAILED, e)
    }
    return predictionsData
  }
}

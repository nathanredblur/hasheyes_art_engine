import ffmpeg from 'fluent-ffmpeg'
import { print, printProgress } from './printMsg.js'

const audioRegex = /\.(mp3|ogg|wav)$/

export const generateVideo = (metaData, basePath) =>
  new Promise((resolve, reject) => {
    const buildDir = `${basePath}/build`
    const outputVideoPath = `${buildDir}/${metaData.edition}.webm`

    if (metaData.attributes.length < 2) {
      print('No video to generate')
      resolve()
      return
    }

    let ff = ffmpeg()
    const filterChain = []

    let outputs = ''
    for (let i = 0; i < metaData.attributes.length; i++) {
      console.log(metaData.attributes[i])
      const filePath = metaData.attributes[i].path
      ff = ff.input(`${basePath}/${filePath}`)

      // if audio format
      if (audioRegex.test(filePath)) {
        continue
      }

      if (!outputs) {
        outputs = `[${i}]`
        continue
      }

      filterChain.push({
        inputs: [outputs, `[${i}]`],
        filter: 'overlay',
        options: { x: 0, y: 0 },
        outputs: `output${i}`,
      })
      outputs = `output${i}`
    }

    if (filterChain.length) {
      ff = ff.complexFilter(filterChain, outputs)
    }

    ff = ff
      .on('start', () => {
        print(`Started processing video ${metaData.edition}`)
      })
      .on('error', (err) => {
        print('An error occurred: ' + err.message)
        reject(err)
      })
      .on('progress', (progress) => {
        printProgress('Processing: ' + (progress.frames || 0) + ' frames')
      })
      .on('end', () => {
        print('Merging finished !')
        resolve(outputVideoPath)
      })

    // TODO: fix audio
    // .map(`0:a:0`) https://linuxpip.org/ffmpeg-combine-audio-video/
    ff.output(outputVideoPath).run()
  })

export const generateMedia = async (metaData, basePath) => {
  try {
    await generateVideo(metaData[0], basePath)
  } catch (err) {
    console.log(err)
  }
}

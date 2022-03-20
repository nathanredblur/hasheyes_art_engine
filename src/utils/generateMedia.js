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

    let videoOut = ''
    let audioInput = ''
    for (let i = 0; i < metaData.attributes.length; i++) {
      console.log(metaData.attributes[i])
      const filePath = metaData.attributes[i].path
      ff = ff.input(`${basePath}/${filePath}`)

      // if audio format
      if (audioRegex.test(filePath)) {
        audioInput = `${i}`

        // if first audio track
        if (!audioInput) {
          audioInput = `[${i}]`
          continue
        }

        // audio mix
        // https://superuser.com/questions/1029466/how-to-mix-two-audio-files-with-ffmpeg-amerge-filter
        filterChain.push({
          inputs: [audioInput],
          filter: 'volume',
          options: 1,
          outputs: `ao${i}`,
        })

        audioInput = `ao${i}`
      } else {
        // If fist video track
        if (!videoOut) {
          videoOut = `[${i}]`
          continue
        }

        filterChain.push({
          inputs: [videoOut, `[${i}]`],
          filter: 'overlay',
          options: { x: 0, y: 0 },
          outputs: `output${i}`,
        })
        videoOut = `output${i}`
      }
    }

    if (filterChain.length) {
      ff = ff.complexFilter(filterChain)
    }

    // map video output
    ff = ff.map(`${videoOut}`)
    ff = ff.map(`${audioInput}`)

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

    ff.output(outputVideoPath).run()
  })

export const generateMedia = async (metaDataList, basePath) => {
  const videoProcess = metaDataList.map((metaData) => generateVideo(metaData, basePath))

  Promise.all(videoProcess)
    .then(() => {
      console.log('Complete')
    })
    .catch((err) => {
      console.log(err)
    })

  // try {
  //   await generateVideo(metaDataList[0], basePath)
  // } catch (err) {
  //   console.log(err)
  // }
}

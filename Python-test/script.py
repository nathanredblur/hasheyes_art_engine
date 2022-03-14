import ffmpeg

background = ffmpeg.input('-original/background.png')
layer1 = ffmpeg.input("-original/layer1.mov")
layer2 = ffmpeg.input("-original/layer2.mov")

(
    background
    .overlay(layer1)
    .overlay(layer2)
    # .filter('scale', width='320', height='240', force_original_aspect_ratio='increase')
    .output('output.webm')
    # .output('output.mov', **{'qscale': 0, 'crf': 0})
    .overwrite_output()
    .run()
)

# resize
# (
#     ffmpeg.input("input/layer1.mov")
#     .filter('scale', width='320', height='240', force_original_aspect_ratio='increase')
#     .output('output.mov')
#     .overwrite_output()
#     .run()
# )

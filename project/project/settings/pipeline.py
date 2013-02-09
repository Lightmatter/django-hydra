STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

# PIPELINE_CSS = {
#     'screen': {
#         'source_filenames': (
#           'css/*.css',
#         ),
#         'output_filename': 'css/screen.css',
#         'extra_context': {
#             'media': 'screen,projection',
#         },
#     },
# }

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.cssmin.CSSMinCompressor'



PIPELINE_JS = {
    'stats': {
        'source_filenames': (
          'js/jquery.js',
          'js/d3.js',
          'js/collections/*.js',
          'js/application.js',
        ),
        'output_filename': 'js/stats.js',
    }
}
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.slimit.SlimItCompressor'

PIPELINE_COMPILERS = (
  'pipeline.compilers.coffee.CoffeeScriptCompiler',
  'pipeline.compilers.sass.SASSCompiler',
)

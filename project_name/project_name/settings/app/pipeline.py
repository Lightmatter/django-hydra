STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

PIPELINE_CSS = {
    'screen': {
        'source_filenames': (
          'css/*.css',
        ),
        'output_filename': 'css/screen.css',
        'variant': 'datauri',
        'extra_context': {
            'media': 'screen,projection',
        },
    },
}

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.cssmin.CSSMinCompressor'



PIPELINE_JS = {
    'app': {
        'source_filenames': (
            'js/jquery-1.9.0.min.js',
            'js/*.js',
            ),
        'output_filename': 'js/app.js',
    }
}
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.slimit.SlimItCompressor'

PIPELINE_COMPILERS = (
  'pipeline.compilers.coffee.CoffeeScriptCompiler',
  'pipeline_compass.compiler.CompassCompiler',
)

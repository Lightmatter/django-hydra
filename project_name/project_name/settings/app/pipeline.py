from staticfiles.storage import CachedStaticFilesStorage

from pipeline.storage import GZIPMixin


class GZIPCachedStorage(GZIPMixin, CachedStaticFilesStorage):
    pass

STATICFILES_STORAGE = '{{project_name}}.settings.app.pipeline.GZIPCachedStorage'

PIPELINE_CSS = {
    'screen': {
        'source_filenames': (
          'sass/main.scss',
        ),
        'output_filename': 'css/screen.css',
        'variant': 'datauri',
        'extra_context': {
            'media': 'screen,projection',

        },

        'manifest': True,
    },
}

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.cssmin.CSSMinCompressor'



PIPELINE_JS = {
    'app': {
        'source_filenames': (
            'js/jquery-1.9.0.min.js',
            'js/*.js',
            'js/*.coffee',
            ),
        'output_filename': 'js/app.js',
        'manifest': True,
    }

}
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.slimit.SlimItCompressor'

PIPELINE_COMPILERS = (
  'pipeline.compilers.coffee.CoffeeScriptCompiler',
  'pipeline_compass.compiler.CompassCompiler',
)

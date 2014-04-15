STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'
#STATICFILES_STORAGE = 'util.gzipstorage.GZIPCachedStorage'

PIPELINE_CSS = {
    'screen': {
        'source_filenames': (
            'sass/style.scss',
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
            'js/*.js',
            'js/*.coffee',
            ),
        'output_filename': 'js/app.js',
        'manifest': True,
    },

    'vendor': {
        'source_filenames': (
            'js/vendor/jquery-1.11.0.min.js',
            'js/vendor/jquery-1.11.0.min.map',
            'js/vendor/bootstrap.min.js',
            'js/vendor/select2.min.js',
            ),
        'output_filename': 'js/vendor.js',
        'manifest': True,
    }

}

PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.jsmin.JSMinCompressor'

PIPELINE_COMPILERS = (
    'pipeline.compilers.coffee.CoffeeScriptCompiler',
    'pipeline_compass.compiler.CompassCompiler',
)

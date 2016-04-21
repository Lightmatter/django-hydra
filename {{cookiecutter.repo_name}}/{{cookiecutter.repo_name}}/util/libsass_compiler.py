import os
import sass

from pipeline.compilers import SubProcessCompiler


class LibSassCompiler(SubProcessCompiler):
    output_extension = 'css'

    def match_file(self, filename):
        return filename.endswith('.scss') or filename.endswith('.sass')

    def is_outdated(self, infile, outfile):
        path = self.storage.path(".")
        try:
            output_file_modified = self.storage.modified_time(outfile)
        except (OSError, NotImplementedError):
            return True
        output_file_modified = self.storage.modified_time(outfile)
        for root, dirs, files in os.walk(path):
            for file_path in files:
                if not self.match_file(file_path):
                    continue
                input_file_modified = self.storage.modified_time(os.path.join(root, file_path))
                if input_file_modified > output_file_modified:
                    return True
        return False

    def compile_file(self, content, path, outdated, force):
        if True or outdated or force:
            with open(path, 'wb') as fsock:

                css, map = sass.compile(filename=content,
                                        source_map_filename=path+'.map')
                fsock.write(css.encode('utf8'))
                with open(path + '.map', 'wb') as mapsock:
                    mapsock.write(map.encode('utf8'))

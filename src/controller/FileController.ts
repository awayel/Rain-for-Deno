import { Controller, PostMapping, Param } from '../../rain/index.ts';

@Controller("/file")
class FileController {

    @PostMapping("/upload", "multipart/form-data")
    public login(@Param('file', 'file') file: File) {
        console.log(file);
        return file;
    }
}

export default FileController;
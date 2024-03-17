// file-upload.controller.ts
import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class FileUploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Specify the destination folder
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            // Validate file type
            if (!file.originalname.match(/\.(geojson)$/)) {
                return cb(new HttpException('Only GeoJSON files are allowed', HttpStatus.BAD_REQUEST), false);
            }
            cb(null, true);
        }
    }))
    async uploadFile(@UploadedFile() file) {
        if (!file) {
            throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
        }

        try {
            // You can access the file path using `file.path`
            console.log('File saved at:', file.path);
            // You can also perform additional operations here, such as database insertion or further processing
        } catch (error) {
            // Handle errors
            console.error('Error saving file:', error);
            throw new HttpException('Error saving file', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'File uploaded successfully' };
    }
}

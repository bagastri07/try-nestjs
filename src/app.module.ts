import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file_upload/file_upload.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [FileUploadModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }

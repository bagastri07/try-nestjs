import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file_upload/file_upload.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [FileUploadModule, ValidationModule.forRoot(true)],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }

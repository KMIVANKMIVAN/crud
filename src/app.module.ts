import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [UserModule, LibrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

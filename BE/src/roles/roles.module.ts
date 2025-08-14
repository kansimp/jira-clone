import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RolesService],
  exports: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}

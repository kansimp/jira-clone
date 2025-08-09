import { OmitType } from '@nestjs/swagger';
import { ProjectEntity } from '../entities/project.entity';

export class CreateProjectDto extends OmitType(ProjectEntity, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}

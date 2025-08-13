import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Project } from '@prisma/client';

export class ProjectEntity implements Project {
  @ApiProperty({
    example: 'Project Name',
  })
  name: string;

  id: string;

  @ApiProperty({
    example: 'project-slug',
  })
  slug: string;

  @ApiProperty({
    example: 'Project description',
  })
  description: string | null;

  @ApiProperty({
    example: 'PLANNING',
  })
  status: $Enums.ProjectStatus;

  @ApiProperty({
    example: '2023-01-01',
    type: String,
    format: 'date',
  })
  startDate: Date | null;

  @ApiProperty({
    example: '2023-12-31',
    type: String,
    format: 'date',
  })
  endDate: Date | null;

  @ApiProperty({
    example: false,
  })
  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

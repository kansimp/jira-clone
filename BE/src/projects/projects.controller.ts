import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectEntity } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    const newProject: ProjectEntity = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        slug: createProjectDto.slug,
        description: createProjectDto.description,
        isArchived: createProjectDto.isArchived ?? false,
        startDate: createProjectDto.startDate
          ? new Date(createProjectDto.startDate)
          : null,
        endDate: createProjectDto.endDate
          ? new Date(createProjectDto.endDate)
          : null,
        status: createProjectDto.status ?? 'PLANNING',
      },
    });

    return {
      project: newProject,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.prisma.project.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}

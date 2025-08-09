import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Task } from '@prisma/client';

export class TaskEntity implements Task {
  id: string;

  @ApiProperty({
    description: 'The title of the task',
    example: 'Implement feature X',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Implement feature X',
  })
  description: string | null;

  @ApiProperty({
    description: 'The status of the task',
    example: $Enums.TaskStatus.IN_PROGRESS,
  })
  status: $Enums.TaskStatus;

  @ApiProperty({
    description: 'The priority of the task',
    example: $Enums.TaskPriority.HIGH,
  })
  priority: $Enums.TaskPriority;

  @ApiProperty({
    description: 'The estimated hours for the task',
    example: 5,
  })
  estimatedHours: number | null;

  @ApiProperty({
    description: 'The actual hours spent on the task',
    example: 3,
  })
  actualHours: number | null;

  @ApiProperty({
    description: 'The due date for the task',
    example: '2023-12-31T23:59:59.999Z',
  })
  dueDate: Date | null;

  @ApiProperty({
    description: 'The completion date for the task',
    example: '2023-12-31T23:59:59.999Z',
  })
  completedAt: Date | null;

  @ApiProperty({
    description: 'The creation date for the task',
    example: '2023-12-31T23:59:59.999Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last updated date for the task',
    example: '2023-12-31T23:59:59.999Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The project ID associated with the task',
    example: 'project-123',
  })
  projectId: string;

  @ApiProperty({
    description: 'The author ID associated with the task',
    example: 'user-123',
  })
  authorId: string;

  @ApiProperty({
    description: 'The assignee ID associated with the task',
    example: 'user-456',
  })
  assigneeId: string | null;
}

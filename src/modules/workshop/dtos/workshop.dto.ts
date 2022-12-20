import { ApiResponseProperty } from '@nestjs/swagger';
import WorkshopEntity from 'src/model/workshop.entity';

class WorkshopDTO {
  constructor(w: WorkshopEntity) {
    this.id = w.id;
    this.title = w.title;
    this.description = w.description;
    this.start_at = w.start_at;
    this.end_at = w.end_at;
  }

  public static fromEntity(w: WorkshopEntity) {
    return new WorkshopDTO(w);
  }

  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  start_at: Date;

  @ApiResponseProperty()
  end_at: Date;
}

export default WorkshopDTO;

import { Column, Entity } from 'typeorm';
import { BaseTimeEntity } from './base.entity';

@Entity({ name: 'workshops' })
class WorkshopEntity extends BaseTimeEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300, default: null })
  description: string;

  @Column({ type: 'int' })
  event_id: number;
}

export default WorkshopEntity;

// item.entity.ts
import { Column, Entity } from 'typeorm';
import { BaseTimeEntity } from './base.entity';

@Entity({ name: 'events' })
class EventEntity extends BaseTimeEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;
}

export default EventEntity;

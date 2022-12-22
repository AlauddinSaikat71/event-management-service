import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'reservations' })
class ReservationEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, default: null })
  name: string;

  @Column({ type: 'varchar', length: 300, default: null })
  email: string;

  @Column({ type: 'int' })
  @Index()
  workshop_id: number;
}
export default ReservationEntity;

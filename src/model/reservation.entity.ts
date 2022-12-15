import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'reservations' })
class ReservationEntity extends BaseEntity {
  @Column({ type: 'int' })
  reservation_id: number;
}
export default ReservationEntity;

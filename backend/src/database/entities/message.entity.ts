import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { PyachokEntity } from './pyachok.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGES)
export class MessageEntity extends CreateUpdateModel {
  @Column('text')
  text: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  sender_id: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'sender_id' })
  sender?: UserEntity;

  @Column()
  recipient_id: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'recipient_id' })
  recipient?: UserEntity;

  @Column({ nullable: true })
  pyachok_id?: string;
  @ManyToOne(() => PyachokEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'pyachok_id' })
  pyachok?: PyachokEntity;
}

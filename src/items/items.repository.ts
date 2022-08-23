import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {}

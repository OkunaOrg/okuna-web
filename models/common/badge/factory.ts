import { DataModel } from 'models/abstract/DataModel';
import { IModelFactory } from 'interfaces/IModelFactory';
import { BadgeData } from 'types/models/common/BadgeData';
import { Badge } from '~/models/common/badge/Badge';
import { IBadge } from '~/models/common/badge/IBadge';

class BadgeFactory implements IModelFactory<IBadge> {
    make(data: BadgeData): IBadge {
        return new Badge(data);
    }
}

const badgeFactory = new BadgeFactory();

export default badgeFactory;

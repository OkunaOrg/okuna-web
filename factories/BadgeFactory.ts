import { IModelFactory } from '~/interfaces/IModelFactory';
import { Badge, IBadgeData } from '~/models/common/Badge';

class BadgeFactory implements IModelFactory<Badge, IBadgeData> {
    make(data: IBadgeData): Badge {
        return new Badge(data);
    }
}

const badgeFactory = new BadgeFactory();

export default badgeFactory;
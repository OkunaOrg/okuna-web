import { IModelFactory } from 'interfaces/IModelFactory';
import { CircleData } from 'types/models/connections/CircleData';
import { Circle } from '~/models/connections/circle/Circle';
import { ICircle } from '~/models/connections/circle/ICircle';

class CircleFactory implements IModelFactory<ICircle> {
    make(data: CircleData): ICircle {
        return new Circle(data);
    }
}

const circleFactory = new CircleFactory();

export default circleFactory;
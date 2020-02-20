import { IModelFactory } from '~/interfaces/IModelFactory';
import { CircleData } from '~/types/models-data/circles/CircleData';
import { Circle } from '~/models/circles/circle/Circle';
import { ICircle } from '~/models/circles/circle/ICircle';

class CircleFactory extends IModelFactory<ICircle> {
    make(data: CircleData): ICircle {
        return new Circle(data);
    }
}

const circleFactory = new CircleFactory();

export default circleFactory;
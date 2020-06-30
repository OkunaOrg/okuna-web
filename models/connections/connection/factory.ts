import { IModelFactory } from '~/interfaces/IModelFactory';
import { ConnectionData } from '~/types/models-data/connections/ConnectionData';
import { IConnection } from '~/models/connections/connection/IConnection';
import { Connection } from '~/models/connections/connection/Connection';

class ConnectionFactory extends IModelFactory<IConnection> {
    make(data: ConnectionData): IConnection {
        return new Connection(data);
    }
}

const connectionFactory = new ConnectionFactory();

export default connectionFactory;
import mongoose, { Connection } from 'mongoose';

let connection: Connection;

export const connectDB = async (): Promise<Connection> => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mmoreto:mm007007@mmoretocluster.8gz8p7m.mongodb.net/orgnzr?retryWrites=true&w=majority';

        const conn = await mongoose.connect(mongoURI);
        connection = conn.connection;

        console.log(`🔗 MongoDB conectado com sucesso: ${conn.connection.host}`);
        return connection;
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export const getConnection = (): Connection | undefined => {
    return connection;
};

export const disconnectDB = async (): Promise<void> => {
    if (connection) {
        await mongoose.disconnect();
        console.log('🔌 Desconectado do MongoDB');
    }
};

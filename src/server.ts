import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import localRoutes from './routes/localRoutes';
import loginRoutes from './routes/loginRoutes';
import organizacaoLocalRoutes from './routes/organizacaoLocalRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import { swaggerDocument } from './swagger';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = process.env.API_VERSION || 'v1';

// ============================================
// 📦 MIDDLEWARES
// ============================================

// Segurança
app.use(helmet());

// CORS
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// 🔗 ROTAS
// ============================================

// Health Check
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Servidor está operacional',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
    });
});

// API Routes
app.use(`/api/${API_VERSION}/login`, loginRoutes);
app.use(`/api/${API_VERSION}/usuario`, usuarioRoutes);
app.use(`/api/${API_VERSION}/local`, localRoutes);
app.use(`/api/${API_VERSION}/organizacao-local`, organizacaoLocalRoutes);

// Swagger UI
app.use(`/api/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.path,
    });
});

// ============================================
// ⚠️ ERROR HANDLER
// ============================================
app.use(errorHandler);

// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================

const startServer = async (): Promise<void> => {
    try {
        // Conectar ao MongoDB
        await connectDB();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════╗
║  🚀 TEXHO Service                          ║
║  ✅ Servidor em: http://localhost:${PORT}.    ║
║  📦 Ambiente: ${NODE_ENV}                  ║
║  🔌 API: /api/${API_VERSION}.                          ║
╚════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
};

// Tratar sinais de término graciosamente
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido. Encerrando graciosamente...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT recebido. Encerrando graciosamente...');
    process.exit(0);
});

startServer();

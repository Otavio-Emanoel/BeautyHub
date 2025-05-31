import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Configuração do Firebase
import './config/firebase';

// Importa as rotas
import clientRoutes from './routes/clientRoutes';
import adminRoutes from './routes/adminRoutes';


const app: Application = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota para clientes
app.use('/api/client', clientRoutes);

// Rota para administradores
app.use('/api/admin', adminRoutes);

// Rota padrão para checar se servidor está rodando
app.get('/', (req: Request, res: Response) => {
  res.send('API do SaaS de agendamento de salões está funcionando!');
});


export default app;

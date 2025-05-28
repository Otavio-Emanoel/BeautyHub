import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Configuração do Firebase
import './config/firebase';

// Importa as rotas
import clientRoutes from './routes/clientRoutes';


const app: Application = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota para clientes
app.use('/api/clients', clientRoutes);

// Rota padrão para checar se servidor está rodando
app.get('/', (req: Request, res: Response) => {
  res.send('API do SaaS de agendamento de salões está funcionando!');
});


export default app;

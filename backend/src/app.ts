import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';


const app: Application = express();

// Middlewares globais
app.use(cors());                 // Permitir requisições CORS (ajuste conforme front)
app.use(express.json());         // Parse JSON no corpo das requisições


// Rota padrão para checar se servidor está rodando
app.get('/', (req: Request, res: Response) => {
  res.send('API do SaaS de agendamento de salões está funcionando!');
});


export default app;

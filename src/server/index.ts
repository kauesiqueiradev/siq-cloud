import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api-router';
import emailRouter from './routes/email-routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import helmet from "helmet"
import compression from "compression"
import path from "path"

const port = 3002;
const url = 'localhost';
// const port = process.env.PORT || 3000;
// const url = process.env.URL || 'http://siq.grupotecnotextil.com';

// const allowedOrigins  = [
//     'http://localhost:4200',
//     'http://siq.grupotecnotextil.com/',
//     '172.16.50.13:80',
//     'localhost:4200',
// ]

const app = express();
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Página Home da minha API!')
// })

// app.use(cors({
//   allowedHeaders: allowedOrigins
// }));

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}))

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "localhost:3002"],
//         'script-src-attr': ["'unsafe-inline'"],
//       },
//     },
//   })
// )

app.use(compression())

app.use(express.static(path.join(__dirname, '../app_procedimentos/')));

// app.get('/*', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '../app_procedimentos/src', 'index.html')
//   );
// });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - SIQ',
            version: '1.0.1',
            description: 'Documentação da API',
        },
        servers: [
            {
                url: `${url}:${port}`,
                description: 'Servidor local',
            },
        ],
    },
    apis: ['.routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/app', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', apiRouter );

app.use('/email', emailRouter);

app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

app.listen(process.env["PORT"] || 3002, () => {
    console.log(`Servidor subiu e está rodando através do endereço: ${url}:${port}`)
});
import express from 'express';
import fs from 'fs';
import path from 'path';

const apiRouter = express.Router()

// const rootFolderPath = '/mnt/win/';
// const rootFolderPath = '172.16.50.2/server 2018\\Sistema de Gestao da Qualidade\\';
// const rootFolderPath = 'X:\\Sistema de Gestao da Qualidade\\';
const rootFolderPath = '\\\\172.16.50.2\\SGQ\\';

if (!rootFolderPath) {
    console.error('Variável de ambiente URL_FOLDER não está definida.');
    process.exit(1);
  }

apiRouter.use('files', express.static(path.join(rootFolderPath, '1. Ativos', '1. Procedimentos')));

apiRouter.get('/get-folders', (req, res) => {
    fs.readdir(rootFolderPath, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler a pasta' });
        } else {
            const folders = files
                .filter(file => fs.statSync(path.join(rootFolderPath, file)).isDirectory())
            res.json({ folders });
        }
    });
})

apiRouter.get('/get-files', (req, res) => {
    let folderName = req.query['folder'] as string;

    if (!folderName) {
        return res.status(400).json({ error: 'Nome da pasta não fornecido' });
    }

    const subFolderPath = path.join(rootFolderPath, folderName, '1. Ativos', '1. Procedimentos');

    fs.readdir(subFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler a página' });
        } else {
            if (!files || files.length === 0) {
                return res.status(404).json({ error: 'Nenhum arquivo encontrado' });
            }

            const fileUrls = files.map(file => {
                return {
                    fileName: file,
                    fileUrl: `/api/open-file?folder=${encodeURIComponent(folderName)}&file=${encodeURIComponent(file)}`
                };
            });
            return res.json({ files: fileUrls });
        }
    });

    return;
});


apiRouter.get('/get-file', (req,res) => {
    let folder = req.query['folder'] as string;
    let file = req.query['file'] as string;
    const filePath = path.join(rootFolderPath, folder, '1. Ativos', '1. Procedimentos', file);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Arquivo não encontrado' });
    }
})

export default apiRouter
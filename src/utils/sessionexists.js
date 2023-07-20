import path, { resolve } from 'path';
import fs from 'fs/promises';
import { logger } from '../aplication/logging.js';
import pkg from 'whatsapp-web.js'

const __basedir = path.resolve();

// set session file
const filePath = __basedir + "/src/storage/";
const fileName = "whatsapp-session.json";
const SESSION_FILE = `${filePath}/${fileName}`;
const { Client, LocalAuth } = pkg;

// get session file
const getSessionFile = async () => {
    const readFiles = await fs.readFile(SESSION_FILE);
    return JSON.parse(readFiles);
}

const sessionExists = [];
const getSessionExists = async (id) => {

    return new Promise((resolve, reject) => {
            const client = new Client({
                restartOnAuthFail: true,
                puppeteer: {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process', // <- this one doesn't works in Windows
                        '--disable-gpu'
                    ],
                },
                authStrategy: new LocalAuth({
                    clientId: id
                })
    
            });

            client.initialize();

           
    
            client.on('qr', (qr) => {
                console.log('QR :', qr)
                logger.info(id + " QR : ", qr);
                qrcode.generate(qr, { small: true });
            });
    
            client.on('ready', async () => {
                logger.info(id + " Whatsapp is ready")
            });
    
            client.on('authenticated', () => {
                logger.info(id + " AUTHENTICATED", "Whatsapp is authenticated!")
            });
    
            client.on('disconnected', () => {
                client.destroy();
                client.initialize();
                logger.info(id + " Whatsapp is disconnected");
            })
    
             // tambahkan client ke session
             sessionExists.push({
                id: id,
                client: client
            });

        resolve();

    })

}

const initialGenerateQrCode = async () => {
    const savedSessions = await getSessionFile();

    for (let i = 0; i < savedSessions.length; i++) {
        await getSessionExists(savedSessions[i].id);
    }

    return;
}

export {
    getSessionExists,
    initialGenerateQrCode,
    sessionExists
}
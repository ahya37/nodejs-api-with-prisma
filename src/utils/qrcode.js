import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal';
import { logger } from '../aplication/logging.js';
import path from 'path';
import fs from 'fs/promises';

const __basedir = path.resolve();

let sessions = [];
// set session file
const filePath = __basedir + "/src/storage/";
const fileName = "whatsapp-session.json";
const SESSION_FILE = `${filePath}/${fileName}`;

const setSessionFile = async (sessions) => {

    await fs.writeFile(SESSION_FILE, JSON.stringify(sessions), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}

// get session file
const getSessionFile = async () => {
    const readFiles = await fs.readFile(SESSION_FILE);
    return JSON.parse(readFiles);
}

async function getQrCode(id) {
    const { Client, LocalAuth } = pkg;

    return new Promise(async (resolve, reject) => {
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

        client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
            logger.info("QR : " + qr);
            resolve(qr);
        });

        client.on('ready', async () => {
            logger.info(id + " Whatsapp is ready")

            // jika session sudah ready, update session status = true
            const savedSessions = await getSessionFile();
            // console.log('savedSession :', savedSessions);
            const sessionIndex = savedSessions.findIndex(sess => sess.id == id);
            // console.log('sessionIndex :', sessionIndex)
            savedSessions[sessionIndex].ready = true;
            await setSessionFile(savedSessions);
        });

        client.on('authenticated', () => {
            logger.info(id + " AUTHENTICATED", "Whatsapp is authenticated!")
        });

        client.on('disconnected', () => {
            client.destroy();
            client.initialize();
            logger.info(id + " Whatsapp is disconnected")
        })

        client.initialize();

        // tambahkan client ke session
        sessions.push({
            id: id,
            client: client
        });

        // menambahkan session ke file
        const savedSessions = await getSessionFile();
        const sessionIndex = savedSessions.findIndex(sess => sess.id == id);

        if (sessionIndex === -1) {
            savedSessions.push({
                id: id,
                ready: false,

            });
            await setSessionFile(savedSessions);
        }

    });

}

const getNewSession = () => {
    return sessions
}

export {
    getQrCode,
    getNewSession
}
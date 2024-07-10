const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxtVUtMakJJbjNnT01zTUJJdzJMU2xzSHdPNDNmdWZzNkMxV1dhTnNFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0Vaa1RMWjV1OE9lUnRVNm5ERmo0cGk1YU1UWEtOeGRoaGhCN0RQZTdCWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRVhja015TWVBMXU0bFlhZFYweTgxbHcvL3czMGoyV3RqRFJMVnJjaW1NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3ZWtOdXlNZW00dWVxaDdtRDBkWGgxeW9zVjBsNmkyYVowSVhNUDVMeVJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1MaWRldENUNnlqeVRBbzk5cllVeHQzN3ljMXZ1d3NuVTlIRjlkR0drWGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9Nci81TUcvMWFYaVgvdCtSSjJWNUhDNms0clZ2a0JqRWxkV0VjNmc4VzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0FrdURmUTIrMHFYckNiVHVldDQ3NUpFQTlZUytmNUtzem9pZk9MZEdYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREZLcVl1a2F0QlZTS3FWRFJGNWE1b25CQkM5clhtcXRmcWhRRWZpS0xEVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRlc3puNTR0UW9LenN6bnZWQjZZUks1VXdxdEw4dTNaZ01qNXpnU3psajZ1cnFjK3puMmdNUmgyT2JPbnRhSVdTZ2lLUzNOdUoyRkpDZDhuczdFY0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJMN3IzQTQ1U0xTdXkyVjBEMnZvcWJSUWNmM3RlS20rRkNvT0hTN1RoWm1vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwUzJQOHFweVFJcXFBUGtQeTE3LUNnIiwicGhvbmVJZCI6IjUzNDA4MzY3LWQ5YjItNDZhOS04NmFiLTM0ODRmNGU2YjUyYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuZzMwL0t2NUgyMWdjWUhNdk0zSytoRFFoZUk9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJjWFhJNWRDWDB2dlVQVlkwNy90KzZqRUQ5dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lTK3BMOExFTFQzdUxRR0dGOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Inl6SjZJQkxxWkpYV1gzQTFhanYzUUg3VGdjVlFmRzk5QlRJb00rTThaQnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRpUmZBMVZ2ZWlmUlVQaUtIRWxaMUwwL2lwTGV1dnFGb21tcEtMTUVXckNCbUdHYjNEanlxMDk3L1drRWRubldEaTFIWTJhQzFlYmZJQjV3WkxJamlRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnWDdvYlFnTnBFOTFhSXlraS9NR0JuQW0vcW5kTHBELzJtK28wZitOZjZOb2JPVUVkTFZUVk9qajBjSFdsQ2pqNHdaZDBhTFlieE5DQmx2K1RpM3BCdz09In0sIm1lIjp7ImlkIjoiMjM3NjU4NzcxMjkyOjcwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTQwNzY5OTQwMjgyMTo3MEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjU4NzcxMjkyOjcwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNzeWVpQVM2bVNWMWw5d05Xbzc5MEIrMDRIRlVIeHZmUVV5S0RQalBHUWIifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNTk3NDMyLCJsYXN0UHJvcEhhc2giOiIxdjRBNmMifQ==',
     ETAT:process.env.ETAT || '1',
    PREFIXE: process.env.PREFIXE || '@',
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PRIVATE,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

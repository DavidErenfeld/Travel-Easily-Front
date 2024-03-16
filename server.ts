import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";

dotenv.config();

const app = express();
const { SSL_KEY_PATH, SSL_CERT_PATH, HTTPS_PORT } = process.env;

if (!SSL_KEY_PATH || !SSL_CERT_PATH || !HTTPS_PORT) {
  console.error("One or more environment variables are missing.");
  process.exit(1);
}

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH),
};

https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
  console.log(
    `Server running in production on https://localhost:${HTTPS_PORT}`
  );
});

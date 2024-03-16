"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express_1 from "express";
import dotenv_1 from "dotenv";
import fs_1 from "fs";
import https_1 from "https";
import path_1 from "path";
dotenv_1.config();
var app = (0, express_1)();
var _a = process.env,
  SSL_KEY_PATH = _a.SSL_KEY_PATH,
  SSL_CERT_PATH = _a.SSL_CERT_PATH,
  HTTPS_PORT = _a.HTTPS_PORT;
if (!SSL_KEY_PATH || !SSL_CERT_PATH || !HTTPS_PORT) {
  console.error("One or more environment variables are missing.");
  process.exit(1);
}
app.use(express_1.static(path_1.join(__dirname, "dist")));
app.get("*", function (_req, res) {
  res.sendFile(path_1.join(__dirname, "dist", "index.html"));
});
var httpsOptions = {
  key: fs_1.readFileSync(SSL_KEY_PATH),
  cert: fs_1.readFileSync(SSL_CERT_PATH),
};
https_1.createServer(httpsOptions, app).listen(HTTPS_PORT, function () {
  console.log(
    "Server running in production on https://localhost:".concat(HTTPS_PORT)
  );
});

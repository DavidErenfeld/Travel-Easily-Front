"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { SSL_KEY_PATH, SSL_CERT_PATH, HTTPS_PORT } = process.env;
if (!SSL_KEY_PATH || !SSL_CERT_PATH || !HTTPS_PORT) {
    console.error("One or more environment variables are missing.");
    process.exit(1);
}
app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
const httpsOptions = {
    key: fs_1.default.readFileSync(SSL_KEY_PATH),
    cert: fs_1.default.readFileSync(SSL_CERT_PATH),
};
https_1.default.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Server running in production on https://localhost:${HTTPS_PORT}`);
});

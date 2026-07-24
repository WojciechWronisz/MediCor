"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const clinicRoutes_js_1 = __importDefault(require("./routes/clinicRoutes.js"));
const db_js_1 = require("./db.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', clinicRoutes_js_1.default);
app.get('/api/health', async (_req, res) => {
    const dbOk = await (0, db_js_1.checkDb)();
    res.json({
        status: 'MediCor API działa',
        bazaDanych: dbOk ? 'połączona' : 'niedostępna',
    });
});
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

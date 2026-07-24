"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.checkDb = checkDb;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const connectionString = process.env.DATABASE_URL || 'postgresql://medicor:medicor@localhost:5432/medicor';
exports.pool = new Pool({ connectionString });
async function checkDb() {
    try {
        await exports.pool.query('SELECT 1');
        return true;
    }
    catch {
        return false;
    }
}

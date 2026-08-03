"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateCmsDocument = translateCmsDocument;
const translateService_js_1 = require("../services/translateService.js");
function assertSecret(req, res) {
    const expected = process.env.CMS_TRANSLATE_SECRET;
    if (!expected) {
        res.status(500).json({ error: 'Brak CMS_TRANSLATE_SECRET na backendzie' });
        return false;
    }
    const got = req.header('x-cms-secret');
    if (got !== expected) {
        res.status(401).json({ error: 'Nieautoryzowany' });
        return false;
    }
    return true;
}
/**
 * POST /api/cms/translate
 * Body: { document: {...} }
 * Zwraca: { document: {...} } z uzupełnionymi en/ru
 */
async function translateCmsDocument(req, res) {
    if (!assertSecret(req, res))
        return;
    try {
        const document = req.body?.document;
        if (!document || typeof document !== 'object') {
            res.status(400).json({ error: 'Brak document w body' });
            return;
        }
        const translated = await (0, translateService_js_1.translateDocumentFromPl)(document);
        res.json({ document: translated });
    }
    catch (err) {
        console.error('cms translate', err);
        res.status(500).json({
            error: err instanceof Error ? err.message : 'Błąd tłumaczenia',
        });
    }
}

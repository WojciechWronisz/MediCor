"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateDocumentFromPl = translateDocumentFromPl;
async function translateOpenAI(texts, targetLang) {
    const key = process.env.OPENAI_API_KEY;
    if (!key)
        throw new Error('Brak OPENAI_API_KEY');
    const langName = targetLang === 'EN' ? 'English' : 'Russian';
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
            temperature: 0.2,
            messages: [
                {
                    role: 'system',
                    content: `You translate Polish medical clinic website copy into ${langName}. ` +
                        'Keep meaning, tone and medical terms accurate. Return ONLY a JSON array of strings, same length/order as input. No markdown.',
                },
                {
                    role: 'user',
                    content: JSON.stringify(texts),
                },
            ],
        }),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`OpenAI error ${res.status}: ${body}`);
    }
    const data = (await res.json());
    const raw = data.choices?.[0]?.message?.content?.trim() || '[]';
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== texts.length) {
        throw new Error('OpenAI zwróciło nieoczekiwany format');
    }
    return parsed;
}
async function translateDeepL(texts, targetLang) {
    const key = process.env.DEEPL_API_KEY;
    if (!key)
        throw new Error('Brak DEEPL_API_KEY');
    const endpoint = process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate';
    const params = new URLSearchParams();
    texts.forEach((t) => params.append('text', t));
    params.set('source_lang', 'PL');
    params.set('target_lang', targetLang === 'EN' ? 'EN-GB' : 'RU');
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Authorization: `DeepL-Auth-Key ${key}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`DeepL error ${res.status}: ${body}`);
    }
    const data = (await res.json());
    const out = data.translations?.map((t) => t.text) || [];
    if (out.length !== texts.length)
        throw new Error('DeepL: niezgodna liczba tłumaczeń');
    return out;
}
async function translateBatch(texts, targetLang) {
    if (texts.length === 0)
        return [];
    const provider = (process.env.TRANSLATE_PROVIDER || 'openai');
    if (provider === 'deepl')
        return translateDeepL(texts, targetLang);
    return translateOpenAI(texts, targetLang);
}
function collectPlPaths(value, path = [], acc = []) {
    if (value == null)
        return acc;
    if (Array.isArray(value)) {
        value.forEach((item, i) => collectPlPaths(item, [...path, String(i)], acc));
        return acc;
    }
    if (typeof value === 'object') {
        const obj = value;
        if (typeof obj.pl === 'string' && obj.pl.trim()) {
            acc.push({ path, pl: obj.pl });
        }
        for (const [k, v] of Object.entries(obj)) {
            if (k === 'pl' || k === 'en' || k === 'ru')
                continue;
            collectPlPaths(v, [...path, k], acc);
        }
    }
    return acc;
}
function setPath(root, path, key, text) {
    if (path.length === 0)
        return;
    let cursor = root;
    for (const part of path) {
        if (cursor == null || typeof cursor !== 'object')
            return;
        cursor = cursor[part];
    }
    if (cursor && typeof cursor === 'object') {
        ;
        cursor[key] = text;
    }
}
/** Kopiuje dokument i uzupełnia en/ru na podstawie pl. */
async function translateDocumentFromPl(document) {
    const clone = structuredClone(document);
    delete clone._id;
    delete clone._rev;
    delete clone._type;
    delete clone._createdAt;
    delete clone._updatedAt;
    const entries = collectPlPaths(clone);
    const pls = entries.map((e) => e.pl);
    const [enList, ruList] = await Promise.all([translateBatch(pls, 'EN'), translateBatch(pls, 'RU')]);
    entries.forEach((entry, i) => {
        setPath(clone, entry.path, 'en', enList[i]);
        setPath(clone, entry.path, 'ru', ruList[i]);
    });
    clone.translationMeta = {
        ...(clone.translationMeta || {}),
        lastTranslatedAt: new Date().toISOString(),
        needsReview: true,
    };
    return clone;
}

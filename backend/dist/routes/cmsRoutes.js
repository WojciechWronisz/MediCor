"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cmsController_js_1 = require("../controllers/cmsController.js");
const router = (0, express_1.Router)();
router.post('/cms/translate', cmsController_js_1.translateCmsDocument);
exports.default = router;

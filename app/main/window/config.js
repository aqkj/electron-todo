"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPreloadPath = exports.defaultHtmlPath = exports.defaultWindowHeight = exports.defaultWindowWidth = void 0;
const path_1 = __importDefault(require("path"));
exports.defaultWindowWidth = 400;
exports.defaultWindowHeight = 800;
// export const defaultHtmlPath = 'http://localhost:3000/' || path.join(__dirname, '../../public/index.html')
exports.defaultHtmlPath = path_1.default.join(__dirname, '../../../dist/index.html');
exports.defaultPreloadPath = path_1.default.join(__dirname, '../../preload/index.js');

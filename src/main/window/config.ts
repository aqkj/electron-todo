import path from 'path'
import { isDev } from '../env'
export const defaultWindowWidth = 400
export const defaultWindowHeight = 800
export const defaultHtmlPath = isDev ? 'http://localhost:3000/' : path.join(__dirname, '../../public/index.html')

// export const defaultHtmlPath = path.join(__dirname, '../../../dist/index.html')
export const defaultPreloadPath = path.join(__dirname, '../../preload/index.js')
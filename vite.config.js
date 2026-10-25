import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
// Resume button only renders if public/Anish_Kumar_Resume.pdf exists at build time.
export default defineConfig({plugins:[react()],define:{__HAS_RESUME__:fs.existsSync('public/Anish_Kumar_Resume.pdf')},build:{chunkSizeWarningLimit:900}})

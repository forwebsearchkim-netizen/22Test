import { resolve } from "node:path"
import { defineConfig } from "vite"
const root=resolve(import.meta.dirname,"src")
export default defineConfig({root,base:"/",resolve:{alias:{"~bootstrap":resolve(import.meta.dirname,"node_modules/bootstrap"),"~bootstrap-icons":resolve(import.meta.dirname,"node_modules/bootstrap-icons")}},build:{outDir:resolve(import.meta.dirname,"dist"),emptyOutDir:true,rollupOptions:{input:{main:resolve(root,"index.html"),tables:resolve(root,"pages/tables.html"),login:resolve(root,"pages/login.html"),register:resolve(root,"pages/register.html"),forgotPassword:resolve(root,"pages/forgot-password.html"),profile:resolve(root,"pages/profile.html"),settings:resolve(root,"pages/settings.html")}}},server:{port:3000,open:true}})

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOG: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
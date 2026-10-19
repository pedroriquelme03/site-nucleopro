import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // YouTube embeds require a Referer (Error 153 if suppressed)
    server: {
        headers: {
            "Referrer-Policy": "origin",
        },
    },
    preview: {
        headers: {
            "Referrer-Policy": "origin",
        },
    },
});

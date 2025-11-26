import express from "express";
import { createServer } from "http";
import { log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files in production
app.use(express.static("dist"));

// Catch-all handler for SPA
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/dist/index.html");
});

const server = createServer(app);
const port = 5000;

server.listen(port, "0.0.0.0", () => {
  log(`Simple server running on port ${port}`);
});

server.on('error', (err: any) => {
  log(`Server error: ${err.message}`);
  process.exit(1);
});
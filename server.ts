import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { ENGINE_API_URL } from "./src/constants";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", async (req, res) => {
    try {
      const response = await fetch(`${ENGINE_API_URL}/api/health`);
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: "Engine health check failed" });
      }
    } catch (error) {
      // Fallback to mock if engine is unreachable
      res.json({ status: "ok", version: "4.2.0", engine: "X-108", mode: "fallback" });
    }
  });

  app.post("/api/features", async (req, res) => {
    try {
      const response = await fetch(`${ENGINE_API_URL}/api/features`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: "Engine features check failed" });
      }
    } catch (error) {
      // Fallback to mock
      res.json({
        coherence: (0.92 + Math.random() * 0.05).toFixed(3),
        friction: (0.04 + Math.random() * 0.02).toFixed(3),
        volatility: (0.05 + Math.random() * 0.03).toFixed(3),
        regime: Math.random() > 0.9 ? "VOLATILE" : "STABLE",
        active_agents: 51,
        total_agents: 51,
        mode: "fallback"
      });
    }
  });

  app.post("/api/gates", async (req, res) => {
    try {
      const response = await fetch(`${ENGINE_API_URL}/api/gates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: "Engine gates check failed" });
      }
    } catch (error) {
      res.json([
        { id: "G1", status: "OPEN", load: Math.random() },
        { id: "G2", status: "OPEN", load: Math.random() },
        { id: "G3", status: "LOCKED", load: 0 },
        { mode: "fallback" }
      ]);
    }
  });

  app.get("/api/python-engine/health", async (req, res) => {
    try {
      const response = await fetch(`${ENGINE_API_URL}/api/python-engine/health`);
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: "Python engine health check failed" });
      }
    } catch (error) {
      res.json({ status: "ready", bridge: "active", mode: "fallback" });
    }
  });

  app.post("/api/simulation", async (req, res) => {
    try {
      const response = await fetch(`${ENGINE_API_URL}/api/simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: "Simulation failed" });
      }
    } catch (error) {
      const shouldBlock = Math.random() > 0.4;
      res.json({
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        action: "TRADE_PROPOSAL",
        data: {
          asset: "BTC/USD",
          side: "BUY",
          amount: (Math.random() * 5).toFixed(2) + " BTC",
          price: "$" + (60000 + Math.random() * 5000).toLocaleString(),
          risk_score: (0.7 + Math.random() * 0.25).toFixed(2)
        },
        decision: shouldBlock ? "VETO" : "VALIDATED",
        reason: shouldBlock ? "Risk invariant X-108 exceeded" : "Within safety bounds",
        mode: "fallback"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

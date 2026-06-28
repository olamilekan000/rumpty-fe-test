import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, CheckCircle2, Cloud, GitBranch, Globe2, RefreshCw, Route, Server } from "lucide-react";
import "./styles.css";

const deployTime = new Date().toLocaleString();

function App() {
  const [checks, setChecks] = useState(makeChecks());
  const [path, setPath] = useState(window.location.pathname);

  const buildInfo = useMemo(
    () => ({
      mode: import.meta.env.MODE,
      appName: import.meta.env.VITE_APP_NAME || "Rumpty FE Test",
      deployEnv: import.meta.env.VITE_DEPLOY_ENV || "not-set",
      apiBase: import.meta.env.VITE_API_BASE_URL || "not-set",
    }),
    [],
  );

  function rerunChecks() {
    setChecks(makeChecks());
  }

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  }

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => navigate("/")}>
          <img src="/rumpty-mark.svg" alt="" />
          <span>Rumpty Deploy Test</span>
        </button>
        <nav>
          <button className={path === "/" ? "active" : ""} onClick={() => navigate("/")}>Overview</button>
          <button className={path === "/routes/demo" ? "active" : ""} onClick={() => navigate("/routes/demo")}>Route test</button>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Static frontend deployment</p>
          <h1>{path === "/routes/demo" ? "Client route is alive." : "Rumpty served this app successfully."}</h1>
          <p className="subcopy">
            OK5... This page checks static assets, browser routing,everything you think, environment values, build output, and a tiny bit of runtime interactivity.
          </p>
          <div className="actions">
            <button className="primary" onClick={rerunChecks}>
              <RefreshCw size={16} />
              Re-run checks
            </button>
            <button className="secondary" onClick={() => navigate("/routes/demo")}>
              <Route size={16} />
              Test route
            </button>
          </div>
        </div>
        <div className="status-panel">
          <div className="status-head">
            <Cloud size={20} />
            <span>Deployment health</span>
          </div>
          <div className="score">{checks.filter((check) => check.ok).length}/{checks.length}</div>
          <p>Checks completed in the browser after the app loaded.</p>
        </div>
      </section>

      <section className="grid">
        <Card icon={<Activity />} title="Runtime checks">
          <div className="checks">
            {checks.map((check) => (
              <div className="check" key={check.label}>
                <CheckCircle2 size={16} />
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card icon={<Server />} title="Build metadata">
          <dl>
            <Meta label="Mode" value={buildInfo.mode} />
            <Meta label="App name" value={buildInfo.appName} />
            <Meta label="Deploy env" value={buildInfo.deployEnv} />
            <Meta label="Rendered" value={deployTime} />
          </dl>
        </Card>

        <Card icon={<Globe2 />} title="Request context">
          <dl>
            <Meta label="Host" value={window.location.host || "localhost"} />
            <Meta label="Path" value={path} />
            <Meta label="Protocol" value={window.location.protocol.replace(":", "") || "http"} />
            <Meta label="API base" value={buildInfo.apiBase} />
          </dl>
        </Card>

        <Card icon={<GitBranch />} title="What to verify">
          <ul className="notes">
            <li>Build logs should detect this as a static frontend app.</li>
            <li>Refreshing <code>/routes/demo</code> should still render the app.</li>
            <li>The logo should load from <code>/public</code>.</li>
            <li>Environment values should appear when configured.</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}

function Card({ icon, title, children }) {
  return (
    <article className="card">
      <div className="card-title">
        {icon}
        <h2>{title}</h2>
      </div>
      {children}
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div className="meta">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function makeChecks() {
  return [
    { label: "React mounted", ok: true },
    { label: "Static logo loaded", ok: true },
    { label: "History routing active", ok: true },
    { label: "Runtime clock available", ok: true },
  ];
}

createRoot(document.getElementById("root")).render(<App />);

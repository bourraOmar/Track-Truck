import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">
            TrackTruck
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Bienvenue sur votre tableau de bord
          </h1>
          <p className="text-sm text-slate-500">
            Le styling est désormais alimenté par Tailwind CSS.
          </p>
        </header>

        <div className="space-y-4">
          <button
            type="button"
            className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={() => setCount((current) => current + 1)}
          >
            Compteur&nbsp;: {count}
          </button>
          <p className="text-center text-xs text-slate-500">
            Modifiez <code className="rounded bg-slate-100 px-1 py-px">src/App.jsx</code> pour commencer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

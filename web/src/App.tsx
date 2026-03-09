import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function RadarPage() {
  const [industry, setIndustry] = useState(''); const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<any>(null);
  const analyze = useAction(api.ai.analyzeTrends); const save = useMutation(api.functions.saveReport);

  const handleAnalyze = useCallback(async () => {
    if (!industry.trim()) return; setLoading(true);
    try {
      const r = await analyze({ industry: industry.trim(), region: region || undefined }); setResult(r); await save({ industry, region: region || undefined, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [industry, region, analyze, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Scan the <span className="a">Trends</span></h1>
      <p className="sub">Enter any industry to discover emerging trends, opportunities, and threats.</p>
      <div className="row"><input className="inp" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Industry (e.g. AI, FinTech, Health...)" /><input className="inp" value={region} onChange={e => setRegion(e.target.value)} placeholder="Region (optional)" /></div>
      <button className="btn" disabled={!industry.trim() || loading} onClick={handleAnalyze}>{loading ? '⏳ Scanning...' : '📡 Scan Trends'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && <>
        {result.summary && <div className="overview-box">📊 {result.summary}</div>}
        {result.trends?.map((t: any, i: number) => (
          <div key={i} className="trend-card">
            <div className="trend-name">📈 {t.name}</div>
            <div className="trend-desc">{t.description}</div>
            <div className="trend-meta"><span className={`badge ${t.impact}`}>{t.impact} impact</span><span className="badge low">{t.timeline}</span></div>
            <div className="conf-bar"><div className="conf-fill" style={{ width: `${t.confidence * 10}%` }} /></div>
          </div>
        ))}
        {result.opportunities?.length > 0 && <div className="section"><div className="section-title">🎯 Opportunities</div>{result.opportunities.map((o: string, i: number) => <div key={i} className="list-item">✦ {o}</div>)}</div>}
        {result.threats?.length > 0 && <div className="section"><div className="section-title">⚠️ Threats</div>{result.threats.map((t: string, i: number) => <div key={i} className="list-item">⚡ {t}</div>)}</div>}
      </>}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>📡</span><div><h1>TrendRadar</h1></div></a></header>
    <Routes><Route path="/" element={<RadarPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} TrendRadar — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;

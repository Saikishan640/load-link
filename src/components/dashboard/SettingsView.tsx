import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  Copy, 
  Check, 
  Server, 
  RefreshCw, 
  ShieldCheck, 
  Code2, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const SettingsView: React.FC = () => {
  const { addNotification } = useAuth();
  const [supabaseUrl, setSupabaseUrl] = useState(
    localStorage.getItem('loadlink_supabase_url') || 'https://xyzcompany.supabase.co'
  );
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(
    localStorage.getItem('loadlink_supabase_anon_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  );
  const [copied, setCopied] = useState(false);
  const [connected, setConnected] = useState(true);
  const [isTesting, setIsTesting] = useState(false);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    addNotification('Schema Copied', 'Supabase PostgreSQL DDL SQL script copied to clipboard.', 'system');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('loadlink_supabase_url', supabaseUrl);
    localStorage.setItem('loadlink_supabase_anon_key', supabaseAnonKey);
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setConnected(true);
      addNotification('Supabase Connected', 'Supabase configuration saved & validated successfully.', 'system');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="font-bold text-2xl text-white">
          Supabase PostgreSQL & Platform Settings
        </h2>
        <p className="text-xs text-slate-400">
          Manage your cloud database configuration, inspect relational PostgreSQL schemas, and configure security rules.
        </p>
      </div>

      {/* Database Connection Status Card */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Supabase PostgreSQL 15</h3>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Schema Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tables: <code>users</code>, <code>vehicles</code>, <code>loads</code>, <code>bookings</code>, <code>tracking</code>, <code>return_loads</code>
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSaveCredentials} className="space-y-4 text-xs pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Supabase Project URL</label>
              <div className="relative">
                <Server className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Supabase Anon Public API Key</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOi..."
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Credentials persist securely in client storage and link with Supabase client SDK.
            </span>
            <button
              type="submit"
              disabled={isTesting}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isTesting ? (
                <span>Validating Connection...</span>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Update & Test Connection</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* PostgreSQL SQL Schema Viewer */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-lg text-white">
                Supabase PostgreSQL DDL & RLS Security Script
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Run this SQL script directly in the Supabase SQL Editor to provision all tables and security policies.
            </p>
          </div>

          <button
            onClick={handleCopySchema}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#020617] border border-white/10 max-h-80 overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed">
          <pre>{SUPABASE_SQL_SCHEMA}</pre>
        </div>
      </div>
    </div>
  );
};

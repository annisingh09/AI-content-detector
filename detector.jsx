import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, ScanSearch, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { analyzeText, rewriteText } from '../lib/analyzer';
import { cn } from '../lib/utils';
export function Detector() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [rewritten, setRewritten] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isRewriting, setIsRewriting] = useState(false);
    const [mode, setMode] = useState('detect'); // 'detect' or 'rewrite'
    const handleAnalyze = async () => {
        if (!input.trim()) return;
        setIsAnalyzing(true);
        setResult(null);
        setRewritten(null);
        try {
            const data = await analyzeText(input);
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };
    const handleRewrite = async () => {
        if (!input.trim()) return;
        setIsRewriting(true);
        setRewritten(null);
        try {
            const text = await rewriteText(input);
            setRewritten(text);
            setMode('rewrite');
        } catch (error) {
            console.error(error);
        } finally {
            setIsRewriting(false);
        }
    };
    return (
        <div className="w-full max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-100px)]">
            {/* Input Section */}
            <div className="flex flex-col space-y-4">
                <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <h2 className="text-lg font-semibold flex items-center">
                            <ScanSearch className="w-5 h-5 mr-2 text-primary" />
                            Content Input
                        </h2>
                        <span className="text-xs text-muted-foreground">{input.length} chars</span>
                    </div>
                    <textarea
                        className="flex-1 bg-transparent resize-none focus:outline-none text-lg leading-relaxed placeholder:text-white/20 relative z-10"
                        placeholder="Paste your text here to analyze for AI patterns..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex space-x-4 mt-6 relative z-10">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !input}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2",
                                "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            {isAnalyzing ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <ScanSearch className="w-5 h-5" />
                                    <span>Check Content</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleRewrite}
                            disabled={isRewriting || !input}
                            className="px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex items-center space-x-2 disabled:opacity-50"
                        >
                            {isRewriting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                            <span>Rewrite</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Result Section */}
            <div className="flex flex-col h-full">
                <div className="glass-panel p-6 rounded-2xl flex-1 relative overflow-hidden flex flex-col">
                    {!result && !rewritten && !isAnalyzing && !isRewriting && (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4 opacity-50">
                            <ScanSearch className="w-16 h-16" />
                            <p>Ready to analyze</p>
                        </div>
                    )}
                    {(isAnalyzing || isRewriting) && (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="w-8 h-8 text-primary animate-pulse" />
                                </div>
                            </div>
                            <p className="text-lg font-medium animate-pulse">Running AI models...</p>
                        </div>
                    )}
                    {mode === 'detect' && result && !isAnalyzing && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col h-full"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-semibold">Analysis Result</h2>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-sm font-medium border",
                                        result.score > 80 ? "bg-red-500/20 border-red-500/50 text-red-200" :
                                            result.score > 40 ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-200" :
                                                "bg-green-500/20 border-green-500/50 text-green-200"
                                    )}>
                                        {result.classification}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="col-span-1 glass-panel bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center aspect-square relative">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="50%" cy="50%" r="40%"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeOpacity="0.1"
                                                strokeWidth="8"
                                            />
                                            <circle
                                                cx="50%" cy="50%" r="40%"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                strokeDasharray="251.2"
                                                strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                                                className={result.score > 50 ? "text-primary transition-all duration-1000 ease-out" : "text-green-500 transition-all duration-1000 ease-out"}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold">{result.score}%</span>
                                            <span className="text-xs text-muted-foreground uppercase tracking-widest">AI Score</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-4">
                                        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
                                            <div className="w-2 h-full bg-red-500/50 rounded-full"></div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Sentences likely AI-generated</p>
                                                <p className="text-xl font-bold">{result.sentences.filter(s => s.isAi).length} / {result.sentences.length}</p>
                                            </div>
                                        </div>
                                        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
                                            <div className="w-2 h-full bg-green-500/50 rounded-full"></div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Sentences likely Human</p>
                                                <p className="text-xl font-bold">{result.sentences.filter(s => !s.isAi).length} / {result.sentences.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {result.sentences.map((sentence, idx) => (
                                            <span
                                                key={idx}
                                                className={cn(
                                                    "transition-colors duration-300 rounded px-1 box-decoration-clone",
                                                    sentence.isAi ? "bg-red-500/20 text-red-100 border-b-2 border-red-500/30" : "hover:bg-white/5"
                                                )}
                                            >
                                                {sentence.text}{" "}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                    {mode === 'rewrite' && rewritten && !isRewriting && (
                        <AnimatePresence>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold flex items-center">
                                        <Wand2 className="w-5 h-5 mr-2 text-green-400" />
                                        Humanized Output
                                    </h2>
                                    <button onClick={() => setMode('detect')} className="text-xs hover:underline">Back to analysis</button>
                                </div>
                                <div className="flex-1 bg-white/5 rounded-xl p-6 overflow-y-auto">
                                    <p className="text-lg leading-relaxed">{rewritten}</p>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(rewritten) }}
                                        className="text-sm text-muted-foreground hover:text-white flex items-center"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Copy to clipboard
                                    </button>
                                </div>
                            </div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}

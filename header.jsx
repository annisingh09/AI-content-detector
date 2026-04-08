import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        AI <span className="text-primary">Sentry</span>
                    </span>
                </div>
                <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                    <a href="#tool" className="hover:text-foreground transition-colors">Detector</a>
                    <a href="#features" className="hover:text-foreground transition-colors">Why It Matters</a>
                    <a href="#" className="flex items-center text-primary font-semibold hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Premium
                    </a>
                </nav>
            </div>
        </header>
    );
}

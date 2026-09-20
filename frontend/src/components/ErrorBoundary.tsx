import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Conversio Error Boundary caught an exception:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full text-center space-y-6 bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-xl">
            <div className="w-14 h-14 bg-amber-100 border border-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-slate-900">Something went wrong</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                An unexpected component runtime error occurred. Our production crash logger has captured this event.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-xl text-left overflow-x-auto border border-slate-800">
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={this.handleReset}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reload Workspace
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="bg-white border-slate-200 text-slate-700 text-xs h-11 rounded-xl"
              >
                <Home className="w-4 h-4 mr-1" /> Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

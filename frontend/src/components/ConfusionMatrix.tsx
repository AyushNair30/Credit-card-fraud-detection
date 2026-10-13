import { type ConfusionMatrix as CM } from '@/data/metrics';

interface ConfusionMatrixProps {
  matrix: CM;
  modelName: string;
}

function formatNum(n: number): string {
  if (n >= 1000) return n.toLocaleString();
  return String(n);
}

export function ConfusionMatrix({ matrix, modelName }: ConfusionMatrixProps) {
  const total = matrix.tn + matrix.fp + matrix.fn + matrix.tp;

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-white mb-1">Confusion Matrix</h3>
      <p className="text-xs text-navy-400 mb-4">{modelName} — Validation Set</p>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-1">
          <div />
          <div className="text-center text-xs font-medium text-navy-300 pb-2">
            Predicted Legitimate
          </div>
          <div className="text-center text-xs font-medium text-fraud-400 pb-2">
            Predicted Fraud
          </div>

          <div className="flex items-center justify-center text-xs font-medium text-navy-300 pr-2 text-right whitespace-nowrap">
            Actual<br />Legitimate
          </div>
          <div className="bg-navy-900/60 border border-navy-700/40 rounded-lg p-4 text-center min-w-[120px]">
            <p className="text-xs text-navy-400 mb-1">TN</p>
            <p className="text-xl font-bold text-teal-400 font-mono">{formatNum(matrix.tn)}</p>
            <p className="text-[10px] text-navy-500 mt-1">
              {((matrix.tn / total) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-fraud-500/10 border border-fraud-500/30 rounded-lg p-4 text-center min-w-[120px]">
            <p className="text-xs text-navy-400 mb-1">FP</p>
            <p className="text-xl font-bold text-fraud-400 font-mono">{formatNum(matrix.fp)}</p>
            <p className="text-[10px] text-navy-500 mt-1">
              {((matrix.fp / total) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="flex items-center justify-center text-xs font-medium text-fraud-400 pr-2 text-right whitespace-nowrap pt-1">
            Actual<br />Fraud
          </div>
          <div className="bg-fraud-500/10 border border-fraud-500/30 rounded-lg p-4 text-center min-w-[120px] mt-1">
            <p className="text-xs text-navy-400 mb-1">FN</p>
            <p className="text-xl font-bold text-fraud-400 font-mono">{formatNum(matrix.fn)}</p>
            <p className="text-[10px] text-navy-500 mt-1">
              {((matrix.fn / total) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4 text-center min-w-[120px] mt-1">
            <p className="text-xs text-navy-400 mb-1">TP</p>
            <p className="text-xl font-bold text-teal-400 font-mono">{formatNum(matrix.tp)}</p>
            <p className="text-[10px] text-navy-500 mt-1">
              {((matrix.tp / total) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-navy-700/30">
        <span className="text-xs text-navy-400">Total: {formatNum(total)}</span>
        <span className="text-xs text-navy-400">
          Accuracy: {(((matrix.tn + matrix.tp) / total) * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

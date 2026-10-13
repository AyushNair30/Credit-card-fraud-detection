import { models, type ModelData } from '@/data/metrics';

interface BarChartProps {
  dataKey: keyof ModelData['metrics'];
  title: string;
  format?: 'percent' | 'decimal';
}

const chartColors = ['#52689d', '#06c893', '#1de0ad'];

export function BarChart({ dataKey, title, format = 'percent' }: BarChartProps) {
  const values = models.map((m) => m.metrics[dataKey]);
  const maxValue = Math.max(...values) * 1.15;

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {models.map((model, i) => {
          const value = model.metrics[dataKey];
          const widthPct = (value / maxValue) * 100;
          const displayValue =
            format === 'percent' ? `${(value * 100).toFixed(2)}%` : value.toFixed(4);

          return (
            <div key={model.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-navy-200">{model.name}</span>
                <span className="text-sm font-mono font-medium text-white">{displayValue}</span>
              </div>
              <div className="h-7 bg-navy-900/60 rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-2 transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: chartColors[i],
                    minWidth: '2rem',
                  }}
                >
                  <span className="text-[10px] font-mono text-navy-950/70"></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MultiMetricChartProps {
  title: string;
}

const allMetrics: { key: keyof ModelData['metrics']; label: string }[] = [
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1Score', label: 'F1-Score' },
  { key: 'prAuc', label: 'PR-AUC' },
  { key: 'rocAuc', label: 'ROC-AUC' },
];

export function MultiMetricChart({ title }: MultiMetricChartProps) {
  const modelColors = ['#52689d', '#06c893', '#1de0ad'];

  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700/50">
              <th className="text-left py-2 px-3 text-navy-400 font-medium">Metric</th>
              {models.map((m, i) => (
                <th key={m.name} className="text-right py-2 px-3 font-medium" style={{ color: modelColors[i] }}>
                  {m.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allMetrics.map((metric) => {
              const values = models.map((m) => m.metrics[metric.key]);
              const maxVal = Math.max(...values);
              return (
                <tr key={metric.key} className="border-b border-navy-700/30 last:border-0">
                  <td className="py-2.5 px-3 text-navy-200">{metric.label}</td>
                  {values.map((val, i) => {
                    const isMax = val === maxVal;
                    return (
                      <td key={i} className="py-2.5 px-3 text-right">
                        <span
                          className={`font-mono ${isMax ? 'text-teal-400 font-semibold' : 'text-navy-300'}`}
                        >
                          {(val * 100).toFixed(2)}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-navy-700/30">
        {models.map((m, i) => (
          <div key={m.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: modelColors[i] }} />
            <span className="text-xs text-navy-300">{m.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

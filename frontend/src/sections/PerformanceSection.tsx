import { KpiCard } from '@/components/KpiCard';
import { BarChart, MultiMetricChart } from '@/components/Charts';
import { ConfusionMatrix } from '@/components/ConfusionMatrix';
import { models, bestModel, metricExplanations } from '@/data/metrics';
import { Crosshair, Search, Scale, AreaChart, AlertCircle, XCircle } from 'lucide-react';

const iconMap: Record<string, typeof Crosshair> = {
  crosshair: Crosshair,
  search: Search,
  scale: Scale,
  'area-chart': AreaChart,
  'alert-circle': AlertCircle,
  'x-circle': XCircle,
};

export function PerformanceSection() {
  const m = bestModel.metrics;
  const cm = bestModel.confusionMatrix;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title mb-1">Model Performance</h1>
        <p className="text-navy-300 text-sm">
          Detailed validation metrics for the best-performing model ({bestModel.name}) with
          explanations of each metric.
        </p>
      </div>

      <div>
        <h2 className="section-title mb-3">{bestModel.name} — Validation Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard label="Precision" value={m.precision} isBest description="Of flagged transactions, how many were fraud" />
          <KpiCard label="Recall" value={m.recall} description="Of actual fraud, how much was caught" />
          <KpiCard label="F1-Score" value={m.f1Score} description="Harmonic mean of precision and recall" />
          <KpiCard label="PR-AUC" value={m.prAuc} description="Best for imbalanced data like fraud" />
          <KpiCard label="ROC-AUC" value={m.rocAuc} description="Overall separation ability" />
        </div>
      </div>

      <div>
        <h2 className="section-title mb-3">Model Comparison Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BarChart dataKey="precision" title="Precision Comparison — Validation" />
          <BarChart dataKey="recall" title="Recall Comparison — Validation" />
          <BarChart dataKey="f1Score" title="F1-Score Comparison — Validation" />
          <BarChart dataKey="prAuc" title="PR-AUC Comparison — Validation" />
        </div>
      </div>

      <MultiMetricChart title="Full Metric Comparison Table — Validation Set" />

      <div>
        <h2 className="section-title mb-3">Confusion Matrix — Best Model</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ConfusionMatrix matrix={cm} modelName={bestModel.name} />
          <div className="card p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Error Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-fraud-500/5 border border-fraud-500/20 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">False Positives</p>
                <p className="text-2xl font-bold text-fraud-400 font-mono">{cm.fp.toLocaleString()}</p>
                <p className="text-xs text-navy-300 mt-2 leading-relaxed">
                  Legitimate transactions incorrectly flagged as fraud. Each one creates
                  unnecessary customer friction.
                </p>
              </div>
              <div className="bg-fraud-500/5 border border-fraud-500/20 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">False Negatives</p>
                <p className="text-2xl font-bold text-fraud-400 font-mono">{cm.fn.toLocaleString()}</p>
                <p className="text-xs text-navy-300 mt-2 leading-relaxed">
                  Actual fraud cases missed by the model. These represent direct financial loss
                  and are the most costly errors.
                </p>
              </div>
              <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">True Positives</p>
                <p className="text-2xl font-bold text-teal-400 font-mono">{cm.tp.toLocaleString()}</p>
                <p className="text-xs text-navy-300 mt-2 leading-relaxed">
                  Fraud cases correctly identified by the model.
                </p>
              </div>
              <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">True Negatives</p>
                <p className="text-2xl font-bold text-teal-400 font-mono">{cm.tn.toLocaleString()}</p>
                <p className="text-xs text-navy-300 mt-2 leading-relaxed">
                  Legitimate transactions correctly passed through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-title mb-3">Understanding the Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricExplanations.map((item) => {
            const Icon = iconMap[item.icon] ?? Crosshair;
            return (
              <div key={item.metric} className="card card-hover p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.metric}</h3>
                </div>
                <p className="text-xs text-navy-300 leading-relaxed">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-navy-800/40 border border-navy-700/40 rounded-lg">
        <p className="text-xs text-navy-400">
          <span className="font-medium text-yellow-500">Validation results.</span> All metrics shown
          are from the validation set, not the final test set.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <ConfusionMatrix
            key={model.name}
            matrix={model.confusionMatrix}
            modelName={model.name}
          />
        ))}
      </div>
    </div>
  );
}

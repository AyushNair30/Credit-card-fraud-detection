import { KpiCard } from '@/components/KpiCard';
import { BarChart, MultiMetricChart } from '@/components/Charts';
import { ConfusionMatrix } from '@/components/ConfusionMatrix';
import { models, bestModel, projectInfo } from '@/data/metrics';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export function OverviewSection() {
  const m = bestModel.metrics;

  return (
    <div className="space-y-6">
      <div className="card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {projectInfo.title} <span className="text-navy-400 font-normal">— {projectInfo.subtitle}</span>
            </h1>
          </div>
          <p className="text-navy-300 max-w-2xl leading-relaxed">
            {projectInfo.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {projectInfo.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-navy-700/50 text-navy-300 border border-navy-600/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">Best Model Metrics</h2>
          <span className="text-sm font-medium text-teal-400">{bestModel.name}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard label="Precision" value={m.precision} description="Flagged transactions that were actually fraud" isBest />
          <KpiCard label="Recall" value={m.recall} description="Actual fraud cases detected" />
          <KpiCard label="F1-Score" value={m.f1Score} description="Balance of precision and recall" />
          <KpiCard label="PR-AUC" value={m.prAuc} description="Precision-Recall area under curve" />
          <KpiCard label="ROC-AUC" value={m.rocAuc} description="ROC area under curve" />
        </div>
      </div>
      <div>
        <h2 className="section-title mb-3">Model Comparison</h2>
        <MultiMetricChart title="All Metrics — Validation Set" />
      </div>

      <div>
        <h2 className="section-title mb-3">Confusion Matrices</h2>
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
    </div>
  );
}

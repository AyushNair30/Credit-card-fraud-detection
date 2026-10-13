import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: number;
  format?: 'percent' | 'number';
  description?: string;
  isBest?: boolean;
  isWarning?: boolean;
}

export function KpiCard({ label, value, format = 'percent', description, isBest, isWarning }: KpiCardProps) {
  const displayValue =
    format === 'percent' ? `${(value * 100).toFixed(2)}%` : value.toLocaleString();

  return (
    <div
      className={`card card-hover p-5 relative overflow-hidden ${
        isBest ? 'border-teal-500/40' : ''
      } ${isWarning ? 'border-fraud-500/30' : ''}`}
    >
      {isBest && (
        <div className="absolute top-0 right-0 bg-teal-500/10 px-2.5 py-1 rounded-bl-lg">
          <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wide">Best Model</span>
        </div>
      )}
      <p className="text-sm font-medium text-navy-300 mb-1">{label}</p>
      <p
        className={`text-3xl font-bold tracking-tight ${
          isWarning ? 'text-fraud-400' : 'text-white'
        }`}
      >
        {displayValue}
      </p>
      {description && (
        <p className="text-xs text-navy-400 mt-2 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

interface KpiCardWithTrendProps {
  label: string;
  value: number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
}

export function KpiCardWithTrend({
  label,
  value,
  trend = 'neutral',
  trendValue,
  description,
}: KpiCardWithTrendProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const trendColor = trend === 'up' ? 'text-teal-400' : trend === 'down' ? 'text-fraud-400' : 'text-navy-400';

  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-navy-300 mb-1">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-white">
            {(value * 100).toFixed(2)}%
          </p>
        </div>
        {TrendIcon && trendValue && (
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      {description && (
        <p className="text-xs text-navy-400 mt-2 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

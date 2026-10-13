import { projectInfo } from '@/data/metrics';
import { Database, Code2, CheckCircle2, AlertTriangle, Github, ExternalLink } from 'lucide-react';

export function AboutSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title mb-1">About the Project</h1>
        <p className="text-navy-300 text-sm">
          Technical overview, methodology, and limitations.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Dataset</h3>
            <p className="text-sm text-navy-300 leading-relaxed">
              {projectInfo.dataset}. A synthetic dataset of credit card transactions labeled as
              fraudulent or legitimate, designed for fraud detection research and education.
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-start gap-3 mb-4">
          <Code2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <h3 className="text-sm font-semibold text-white">Technology Stack</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {projectInfo.technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1.5 rounded-lg bg-navy-700/50 text-navy-200 border border-navy-600/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Methodology & Key Features</h3>
        <div className="space-y-3">
          {projectInfo.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-navy-300 leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 border-fraud-500/20">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-fraud-400" />
          Limitations & Disclaimers
        </h3>
        <div className="space-y-3">
          {projectInfo.limitations.map((limit) => (
            <div key={limit} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-fraud-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-navy-300 leading-relaxed">{limit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

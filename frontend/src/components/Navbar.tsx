import { ShieldCheck, LayoutDashboard, Search, BarChart3, Info } from 'lucide-react';

export type SectionId = 'overview' | 'predict' | 'performance' | 'about';

interface NavItem {
  id: SectionId;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'predict', label: 'Fraud Prediction', icon: Search },
  { id: 'performance', label: 'Model Performance', icon: BarChart3 },
  { id: 'about', label: 'About Project', icon: Info },
];

interface NavbarProps {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-navy-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-teal-400" />
            <span className="text-lg font-bold text-white tracking-tight">
              Fraud<span className="text-teal-400">Shield</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400'
                      : 'text-navy-300 hover:text-white hover:bg-navy-700/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-400'
                    : 'text-navy-300 hover:text-white hover:bg-navy-700/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

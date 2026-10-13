import { useState } from 'react';
import { Search, AlertCircle, CheckCircle2, Loader2, Info } from 'lucide-react';
import {
  merchantCategories,
  merchantNames,
  daysOfWeek,
} from '@/data/metrics';
import { isApiConfigured, predictTransaction, type PredictionRequest } from '@/lib/api';

interface FormState {
  amount: string;
  merchantCategory: string;
  merchantName: string;
  customerCityPopulation: string;
  customerAge: string;
  transactionHour: string;
  dayOfWeek: string;
}

const initialForm: FormState = {
  amount: '',
  merchantCategory: '',
  merchantName: '',
  customerCityPopulation: '',
  customerAge: '',
  transactionHour: '',
  dayOfWeek: '',
};

type Status = 'idle' | 'loading' | 'success' | 'error' | 'not-configured';

export function PredictionSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<{ prediction: string; probability: number; threshold:number; label:string } | null>(null);

  const isWeekend = form.dayOfWeek === 'Saturday' || form.dayOfWeek === 'Sunday';

  const availableMerchants = form.merchantCategory
    ? merchantNames[form.merchantCategory] ?? []
    : [];

  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.amount || parseFloat(form.amount) < 0) errors.amount = 'Enter a valid amount';
  if (!form.merchantCategory) errors.merchantCategory = 'Select a category';
  if (!form.merchantName) errors.merchantName = 'Select a merchant';
  if (!form.customerCityPopulation || parseInt(form.customerCityPopulation) < 0)
    errors.customerCityPopulation = 'Enter a valid population';
  if (!form.customerAge || parseInt(form.customerAge) < 18 || parseInt(form.customerAge) > 120)
    errors.customerAge = 'Enter age between 18–120';
  if (form.transactionHour === '' || parseInt(form.transactionHour) < 0 || parseInt(form.transactionHour) > 23)
    errors.transactionHour = 'Enter hour 0–23';
  if (!form.dayOfWeek) errors.dayOfWeek = 'Select a day';

  const isValid = Object.keys(errors).length === 0;

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'merchantCategory' ? { merchantName: '' } : {}),
    }));
    setStatus('idle');
    setResult(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    if (!isApiConfigured()) {
      setStatus('not-configured');
      return;
    }

    const payload: PredictionRequest = {
      amount: parseFloat(form.amount),
      merchantCategory: form.merchantCategory,
      merchantName: form.merchantName,
      customerCityPopulation: parseInt(form.customerCityPopulation),
      customerAge: parseInt(form.customerAge),
      transactionHour: parseInt(form.transactionHour),
      dayOfWeek: form.dayOfWeek,
      isWeekend,
    };

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await predictTransaction(payload);
      setResult(res);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Request failed');
      setStatus('error');
    }
  }

  function handleReset() {
    setForm(initialForm);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title mb-1">Fraud Prediction</h1>
        <p className="text-navy-300 text-sm">
          Enter transaction details to analyze for potential fraud. The weekend indicator is
          automatically derived from the selected day.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text">Transaction Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => update('amount', e.target.value)}
              placeholder="0.00"
              className="input-field"
            />
            {errors.amount && <p className="text-xs text-fraud-400 mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="label-text">Customer Age</label>
            <input
              type="number"
              min="18"
              max="120"
              value={form.customerAge}
              onChange={(e) => update('customerAge', e.target.value)}
              placeholder="e.g. 35"
              className="input-field"
            />
            {errors.customerAge && <p className="text-xs text-fraud-400 mt-1">{errors.customerAge}</p>}
          </div>

          <div>
            <label className="label-text">Merchant Category</label>
            <select
              value={form.merchantCategory}
              onChange={(e) => update('merchantCategory', e.target.value)}
              className="input-field"
            >
              <option value="">Select category</option>
              {merchantCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.merchantCategory && <p className="text-xs text-fraud-400 mt-1">{errors.merchantCategory}</p>}
          </div>

          <div>
            <label className="label-text">Merchant Name</label>
            <select
              value={form.merchantName}
              onChange={(e) => update('merchantName', e.target.value)}
              disabled={!form.merchantCategory}
              className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{form.merchantCategory ? 'Select merchant' : 'Select category first'}</option>
              {availableMerchants.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {errors.merchantName && <p className="text-xs text-fraud-400 mt-1">{errors.merchantName}</p>}
          </div>

          <div>
            <label className="label-text">Customer City Population</label>
            <input
              type="number"
              min="0"
              value={form.customerCityPopulation}
              onChange={(e) => update('customerCityPopulation', e.target.value)}
              placeholder="e.g. 250000"
              className="input-field"
            />
            {errors.customerCityPopulation && (
              <p className="text-xs text-fraud-400 mt-1">{errors.customerCityPopulation}</p>
            )}
          </div>

          <div>
            <label className="label-text">Transaction Hour (0–23)</label>
            <input
              type="number"
              min="0"
              max="23"
              value={form.transactionHour}
              onChange={(e) => update('transactionHour', e.target.value)}
              placeholder="e.g. 14"
              className="input-field"
            />
            {errors.transactionHour && <p className="text-xs text-fraud-400 mt-1">{errors.transactionHour}</p>}
          </div>

          <div>
            <label className="label-text">Day of Week</label>
            <select
              value={form.dayOfWeek}
              onChange={(e) => update('dayOfWeek', e.target.value)}
              className="input-field"
            >
              <option value="">Select day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            {errors.dayOfWeek && <p className="text-xs text-fraud-400 mt-1">{errors.dayOfWeek}</p>}
          </div>

          <div>
            <label className="label-text">Weekend Indicator (auto-derived)</label>
            <div className="input-field flex items-center justify-between cursor-default">
              <span className={isWeekend ? 'text-teal-400' : 'text-navy-400'}>
                {form.dayOfWeek ? (isWeekend ? 'Weekend' : 'Weekday') : 'Select a day'}
              </span>
              <div
                className={`w-10 h-5 rounded-full transition-colors ${isWeekend ? 'bg-teal-500' : 'bg-navy-600'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${isWeekend ? 'translate-x-5' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={status === 'loading'} className="btn-primary flex items-center gap-2">
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {status === 'loading' ? 'Analyzing...' : 'Analyze Transaction'}
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset
          </button>
        </div>
      </form>

      {status === 'not-configured' && (
        <div className="card p-5 border-yellow-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-500">Prediction backend not connected</p>
            <p className="text-xs text-navy-300 mt-1 leading-relaxed">
              The form is valid and ready to send. To enable predictions, set the{' '}
              <code className="text-teal-400 bg-navy-900/60 px-1.5 py-0.5 rounded text-xs">VITE_API_BASE_URL</code>{' '}
              environment variable and connect a POST <code className="text-teal-400 bg-navy-900/60 px-1.5 py-0.5 rounded text-xs">/predict</code>{' '}
              endpoint that accepts the transaction data above.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="card p-5 border-fraud-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-fraud-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-fraud-400">Request Failed</p>
            <p className="text-xs text-navy-300 mt-1">{errorMsg}</p>
          </div>
        </div>
      )}

      {status === 'success' && result && (
        <div
          className={`card p-5 flex items-start gap-3 ${
            result.prediction === 'fraud' ? 'border-fraud-500/30' : 'border-teal-500/30'
          }`}
        >
          <CheckCircle2
            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${result.prediction === 'fraud' ? 'text-fraud-400' : 'text-teal-400'}`}
          />
          <div>
            <p className="text-sm font-medium text-white">
              Prediction: {result.prediction === 'fraud' ? 'Fraudulent' : 'Legitimate'}
            </p>
            <p className="text-xs text-navy-300 mt-1">
              Fraud probability: {(result.probability * 100).toFixed(2)}%
            </p>

            <p className="text-xs text-navy-400 mt-1">
              Decision threshold: {(result.threshold * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

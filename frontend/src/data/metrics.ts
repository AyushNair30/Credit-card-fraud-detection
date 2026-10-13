export interface ModelMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  prAuc: number;
  rocAuc: number;
}

export interface ConfusionMatrix {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
}

export interface ModelData {
  name: string;
  shortName: string;
  metrics: ModelMetrics;
  confusionMatrix: ConfusionMatrix;
}

export const models: ModelData[] = [
  {
    name: 'Logistic Regression',
    shortName: 'LogReg',
    metrics: {
      precision: 0.0359,
      recall: 0.7635,
      f1Score: 0.0685,
      prAuc: 0.1742,
      rocAuc: 0.9053,
    },
    confusionMatrix: { tn: 227015, fp: 30819, fn: 355, tp: 1146 },
  },
  {
    name: 'Random Forest',
    shortName: 'RF',
    metrics: {
      precision: 0.1553,
      recall: 0.7781,
      f1Score: 0.2589,
      prAuc: 0.6455,
      rocAuc: 0.9678,
    },
    confusionMatrix: { tn: 251481, fp: 6353, fn: 333, tp: 1168 },
  },
  {
    name: 'Gradient Boosting',
    shortName: 'GB',
    metrics: {
      precision: 0.8475,
      recall: 0.7328,
      f1Score: 0.786,
      prAuc: 0.7324,
      rocAuc: 0.917,
    },
    confusionMatrix: { tn: 257636, fp: 198, fn: 401, tp: 1100 },
  },
];

export const bestModel = models[2];

export const merchantCategories = [
  'Groceries',
  'Restaurants',
  'Gas Station',
  'Online Shopping',
  'Electronics',
  'Clothing',
  'Travel',
  'Health & Fitness',
  'Entertainment',
  'Home Improvement',
] as const;

export const merchantNames: Record<string, string[]> = {
  Groceries: ['FreshMart', 'GreenValley Foods', 'Corner Grocery'],
  Restaurants: ['Bella Cuisine', 'Sushi Palace', 'Burger Joint'],
  'Gas Station': ['QuickFuel', 'MetroGas', 'EnergyPlus'],
  'Online Shopping': ['ShopWave', 'BuyDirect', 'MegaStore'],
  Electronics: ['TechHub', 'GadgetWorld', 'ElectroMart'],
  Clothing: ['FashionLine', 'UrbanWear', 'StyleBox'],
  Travel: ['SkyHigh Travel', 'WanderTrips', 'GlobeTrotter'],
  'Health & Fitness': ['FitLife', 'MedCare Pharmacy', 'WellnessCenter'],
  Entertainment: ['StreamFlix', 'GameZone', 'TicketMaster'],
  'Home Improvement': ['BuildRight', 'ToolShop', 'HomeDepot Express'],
};

export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const metricExplanations = [
  {
    metric: 'Precision',
    explanation:
      'Of all transactions flagged as fraudulent, how many were actually fraud. High precision means fewer false alarms.',
    icon: 'crosshair',
  },
  {
    metric: 'Recall',
    explanation:
      'Of all actual fraud cases, how many the model caught. High recall means fewer fraud cases slip through.',
    icon: 'search',
  },
  {
    metric: 'F1-score',
    explanation:
      'The harmonic mean of precision and recall. It balances the two — useful when fraud is rare and you care about both missing fraud and false alarms.',
    icon: 'scale',
  },
  {
    metric: 'PR-AUC',
    explanation:
      'Area under the Precision-Recall curve. More informative than ROC-AUC for highly imbalanced datasets like fraud detection where fraud is extremely rare.',
    icon: 'area-chart',
  },
  {
    metric: 'False Positives',
    explanation:
      'Legitimate transactions incorrectly flagged as fraud. These cause customer friction and unnecessary reviews.',
    icon: 'alert-circle',
  },
  {
    metric: 'False Negatives',
    explanation:
      'Actual fraud cases the model missed. These represent direct financial loss and are the most costly errors.',
    icon: 'x-circle',
  },
] as const;

export const projectInfo = {
  title: 'FraudShield',
  subtitle: 'Credit Card Fraud Detection',
  description:
    'A machine learning project that compares three classification models — Logistic Regression, Random Forest, and Gradient Boosting — to detect fraudulent credit card transactions from a simulated dataset.',
  dataset: 'Kaggle Simulated Credit Card Transaction Data',
  technologies: [
    'Python',
    'pandas',
    'scikit-learn',
    'Gradient Boosting',
    'Matplotlib',
    'Jupyter Notebook',
  ],
  features: [
    'Class imbalance handling via SMOTE and threshold tuning',
    'Model comparison across Logistic Regression, Random Forest, and Gradient Boosting',
    'Threshold selection optimized for F1-score and business cost',
    'Validation set evaluation with confusion matrix analysis',
  ],
  limitations: [
    'Uses simulated data, not real banking transactions',
    'Not a production banking system — for educational and portfolio purposes only',
    'Real fraud patterns evolve rapidly; models require ongoing retraining',
    'Deployment infrastructure (API, monitoring, alerts) is not included',
  ],
  githubUrl: 'https://github.com/yourusername/fraudshield',
};

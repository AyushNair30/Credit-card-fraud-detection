# Credit Card Fraud Detection Using Machine Learning

A machine learning portfolio project that identifies potentially fraudulent credit card transactions using transaction details and customer-related features. The project includes a trained Gradient Boosting model, a FastAPI backend, and an interactive React website for making predictions.

## Project Overview

Credit card fraud detection is a challenging classification problem because fraudulent transactions represent only a small fraction of all transactions. This project addresses the class imbalance problem by evaluating the model with fraud-focused metrics rather than relying on accuracy alone.

The application allows users to enter transaction information and receive a fraud prediction with an estimated fraud probability.

**Project status:** Model trained and evaluated; API and frontend integrated.

## Key Features

- Exploratory data analysis of transaction data
- Feature engineering and preprocessing
- Gradient Boosting classification model
- Evaluation on a separate test dataset
- Fraud probability estimation and threshold-based classification
- FastAPI backend for model inference
- Interactive React and TypeScript frontend
- Confusion matrix and fraud-focused evaluation metrics

## Dataset

**Source:** [Kaggle Credit Card Fraud Detection Dataset](https://www.kaggle.com/datasets/kartik2112/fraud-detection)

The project uses the training and test CSV files provided by the dataset.

Raw datasets are stored locally and are not included in this repository.

## Features Used

The model uses eight features:

| Feature | Description |
|---|---|
| `amt` | Transaction amount |
| `category` | Merchant category |
| `merchant` | Merchant identifier/name |
| `city_pop` | Customer city population |
| `customer_age` | Engineered customer age |
| `transaction_hour` | Hour of the transaction |
| `day_of_week` | Day of the week |
| `is_weekend` | Whether the transaction occurred on a weekend |

Identifiers and personal information that were not selected for prediction are excluded from the model features.

## Machine Learning Approach

1. Explore the dataset and examine the class imbalance.
2. Engineer transaction time and customer age features.
3. Separate the data for model training, validation, and final testing.
4. Build a preprocessing and classification pipeline.
5. Evaluate predictions using precision, recall, F1-score, PR-AUC, ROC-AUC, and a confusion matrix.
6. Save the trained pipeline and integrate it with a FastAPI application.

The selected model is a **Gradient Boosting classifier** using a preprocessing pipeline for numerical and categorical features.

The current prediction threshold is **0.50**. A transaction is flagged when its estimated fraud probability meets or exceeds this threshold.

## Final Test Results

The following metrics were obtained on the separate test dataset of 555,719 transactions.

| Metric | Test result |
|---|---:|
| Precision | 0.7741 |
| Recall | 0.7175 |
| F1-score | 0.7447 |
| PR-AUC | 0.6646 |
| ROC-AUC | 0.9181 |

### Confusion Matrix

| | Predicted legitimate | Predicted fraud |
|---|---:|---:|
| Actual legitimate | 553,125 | 449 |
| Actual fraud | 606 | 1,539 |

### Interpretation

At the selected threshold, the model correctly identified 1,539 fraudulent transactions and incorrectly flagged 449 legitimate transactions. It missed 606 fraudulent transactions.

Because the dataset is highly imbalanced, accuracy alone does not provide a sufficient picture of model performance. Precision, recall, F1-score, and PR-AUC provide more useful information about fraud detection performance.

These are offline test results and should not be interpreted as a guarantee of performance in a production banking environment.

## Technology Stack

- **Language:** Python
- **Machine learning:** scikit-learn
- **Data analysis:** pandas
- **Model serialization:** joblib
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS

## Project Structure

```text
Credit_card_fraud_detection/
├── backend.py
├── data/
│   └── raw/                 # Local datasets; not committed
├── models/
│   └── fraud_detection_pipeline.joblib
├── notebooks/
│   └──                   # EDA and model training notebooks
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── requirements.txt
├── .gitignore
└── README.md
```

Adjust the notebook and frontend folder names in this tree if they differ in your repository.

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Credit_card_fraud_detection
```

### 2. Set up the Python environment

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Start the backend

From the project root, run:

```bash
python -m uvicorn backend:app --reload --port 8000
```

The API runs at `http://127.0.0.1:8000`.

Interactive API documentation is available at `http://127.0.0.1:8000/docs`.

### 4. Start the frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

The backend must be running for live predictions to work.

## Future Improvements

- Compare alternative decision thresholds based on fraud detection costs.
- Add explainability with SHAP or another feature-attribution method.
- Monitor data drift and evaluate performance on newer transactions.
- Improve API validation, error handling, and deployment security.
- Deploy the frontend and backend for a public demonstration.

## Disclaimer

This is an educational machine learning project intended for demonstration and portfolio purposes. It is not a production-ready fraud prevention system and should not be used to make real financial decisions.

## Author

Built as a machine learning portfolio project demonstrating data preprocessing, feature engineering, model evaluation, API development, and frontend integration.
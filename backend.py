
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# Locate the saved model relative to this file
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "fraud_detection_pipeline.joblib"

app = FastAPI(
    title="FraudShield API",
    description="Credit card fraud detection model API",
    version="1.0.0",
)

# Allow the local React/Vite website to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Load the pipeline once when the API starts
if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found at {MODEL_PATH}. "
        "Save gb_model to this location first."
    )

model = joblib.load(MODEL_PATH)

THRESHOLD = 0.5


class TransactionInput(BaseModel):
    amt: float = Field(ge=0, le=1_000_000)
    category: str = Field(min_length=1, max_length=100)
    merchant: str = Field(min_length=1, max_length=200)
    city_pop: int = Field(ge=0)
    customer_age: int = Field(ge=18, le=100)
    transaction_hour: int = Field(ge=0, le=23)
    day_of_week: int = Field(ge=0, le=6)


@app.get("/")
def home():
    return {"message": "FraudShield API is running"}


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": True}


@app.post("/predict")
def predict(transaction: TransactionInput):
    try:
        is_weekend = int(transaction.day_of_week >= 5)

        # Column names and types must match model training
        input_df = pd.DataFrame([{
            "amt": transaction.amt,
            "category": transaction.category,
            "merchant": transaction.merchant,
            "city_pop": transaction.city_pop,
            "customer_age": transaction.customer_age,
            "transaction_hour": transaction.transaction_hour,
            "day_of_week": transaction.day_of_week,
            "is_weekend": is_weekend,
        }])

        probability = float(model.predict_proba(input_df)[0, 1])
        prediction = int(probability >= THRESHOLD)

        return {
            "fraud_probability": probability,
            "prediction": prediction,
            "label": (
                "Potentially fraudulent"
                if prediction == 1
                else "Not flagged as fraudulent"
            ),
            "threshold": THRESHOLD,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(exc)}",
        ) from exc

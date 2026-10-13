
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://127.0.0.1:8000";

export interface PredictionRequest {
  amount: number;
  merchantCategory: string;
  merchantName: string;
  customerCityPopulation: number;
  customerAge: number;
  transactionHour: number;
  dayOfWeek: string;
  isWeekend: boolean;
}

interface BackendPredictionResponse {
  fraud_probability: number;
  prediction: number;
  label: string;
  threshold: number;
}

export interface PredictionResponse {
  prediction: "fraud" | "legitimate";
  probability: number;
  threshold: number;
  label: string;
}

const DAY_TO_NUMBER: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

export async function predictTransaction(
  data: PredictionRequest
): Promise<PredictionResponse> {
  const dayNumber =
    typeof data.dayOfWeek === "number"
      ? data.dayOfWeek
      : DAY_TO_NUMBER[data.dayOfWeek];

  if (dayNumber === undefined) {
    throw new Error("Please select a valid day of the week.");
  }

  const backendPayload = {
    amt: data.amount,
    category: data.merchantCategory,
    merchant: data.merchantName,
    city_pop: data.customerCityPopulation,
    customer_age: data.customerAge,
    transaction_hour: data.transactionHour,
    day_of_week: dayNumber,
  };

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Prediction request failed (${response.status}): ${errorText}`
    );
  }

  const result =
    (await response.json()) as BackendPredictionResponse;

  return {
    prediction: result.prediction === 1 ? "fraud" : "legitimate",
    probability: result.fraud_probability,
    threshold: result.threshold,
    label: result.label,
  };
}

export function isApiConfigured(): boolean {
  return API_BASE_URL.length > 0;
}

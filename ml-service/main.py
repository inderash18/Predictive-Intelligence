from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import time
from typing import Dict, Any

app = FastAPI(title="PredictX ML Service")

class ElectricityInput(BaseModel):
    historical_usage: list[float]
    temperature: float
    is_weekend: bool

class ServerInput(BaseModel):
    cpu_usage: float
    ram_usage: float
    disk_errors: int
    network_latency: float

class PCInput(BaseModel):
    cpu_temp: float
    gpu_temp: float
    ram_usage: float
    disk_load: float

@app.get("/")
def read_root():
    return {"status": "ML Service is healthy"}

@app.post("/predict/electricity")
async def predict_electricity(data: ElectricityInput):
    # Simulated ML Logic
    avg_usage = sum(data.historical_usage) / len(data.historical_usage) if data.historical_usage else 100
    temp_factor = 1.0 + (max(0, data.temperature - 25) * 0.05)
    weekend_factor = 0.8 if data.is_weekend else 1.2
    
    predicted_demand = avg_usage * temp_factor * weekend_factor + random.uniform(-10, 10)
    peak_usage_time = "6 PM" if predicted_demand > 400 else "8 PM"
    
    return {
        "predicted_demand": round(predicted_demand, 2),
        "peak_usage_time": peak_usage_time,
        "trend": [round(val * 1.05, 2) for val in data.historical_usage] + [round(predicted_demand, 2)]
    }

@app.post("/predict/server")
async def predict_server(data: ServerInput):
    # Simulated Binary Classification
    failure_score = (data.cpu_usage * 0.3) + (data.ram_usage * 0.2) + (data.disk_errors * 10) + (data.network_latency * 0.1)
    failure_probability = min(0.99, failure_score / 100)
    
    health_status = "Healthy"
    if failure_probability > 0.7:
        health_status = "Critical"
    elif failure_probability > 0.4:
        health_status = "Warning"
        
    recommendations = []
    if data.cpu_usage > 80: recommendations.append("Scale CPU resources")
    if data.disk_errors > 0: recommendations.append("Check disk health or replace")
    if failure_probability > 0.5: recommendations.append("Restart server or redirect traffic")

    return {
        "server_health": health_status,
        "failure_probability": round(failure_probability * 100, 2),
        "recommendations": recommendations or ["Normal operation"]
    }

@app.post("/predict/pc_health")
async def predict_pc(data: PCInput):
    # Simulated regression for crash risk
    crash_risk = (data.cpu_temp * 0.4) + (data.gpu_temp * 0.3) + (data.ram_usage * 0.2) + (data.disk_load * 0.1)
    crash_risk_percent = min(99, crash_risk - 40) if crash_risk > 40 else random.uniform(1, 10)
    
    status = "Stable"
    if crash_risk_percent > 80: status = "Critical"
    elif crash_risk_percent > 50: status = "Risk of Crash"

    suggestions = []
    if data.cpu_temp > 85: suggestions.append("Clean CPU fan or re-apply thermal paste")
    if data.gpu_temp > 80: suggestions.append("Improve case airflow")
    if data.ram_usage > 90: suggestions.append("Close background applications")
    
    return {
        "pc_health": status,
        "crash_risk": round(crash_risk_percent, 2),
        "suggestions": suggestions or ["System is running optimally"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@echo off
title SafeHire - Full-Stack AI Recruitment Fraud Detection System

echo ======================================================================
echo           SafeHire - Starting All Services
echo ======================================================================

set "PATH=C:\Users\srush\AppData\Local\Programs\nodejs;%PATH%"

echo 1. Starting FastAPI Python ML Microservice on port 8000...
start "SafeHire ML Service (Port 8000)" cmd /k "cd /d c:\minipro\ml-service && python -m uvicorn app.main:app --port 8000 --reload"

echo 2. Starting Express.js Backend API on port 5000...
start "SafeHire Backend (Port 5000)" cmd /k "cd /d c:\minipro\backend && npm run dev"

echo 3. Starting React + Vite Frontend on port 5173...
start "SafeHire Frontend (Port 5173)" cmd /k "cd /d c:\minipro\frontend && npm run dev"

echo ======================================================================
echo SafeHire services launched!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000/api
echo ML Service: http://localhost:8000/docs
echo ======================================================================
pause

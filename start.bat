@echo off
cd backend
start cmd /k "node server.js"
timeout /t 3
start brave http://localhost:3000
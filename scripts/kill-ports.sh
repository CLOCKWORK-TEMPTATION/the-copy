#!/bin/bash
echo "Stopping services..."

# Kill port 3001 (Backend)
lsof -ti:3001 | xargs kill -9 2>/dev/null && echo "Killed process on port 3001" || echo "No process on port 3001"

# Kill port 5000 (Frontend)
lsof -ti:5000 | xargs kill -9 2>/dev/null && echo "Killed process on port 5000" || echo "No process on port 5000"

echo "All services stopped!"

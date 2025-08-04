@echo off
pip install -r requirements.txt
uvicorn main:app --reload
pause

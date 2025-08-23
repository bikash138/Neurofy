@echo off
pip freeze > requirements.txt
uvicorn src.main:app --reload
pause

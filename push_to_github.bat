@echo off
title Push SafeHire to GitHub
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

echo ======================================================================
echo           Pushing SafeHire to GitHub
echo ======================================================================
echo.
git push -u origin main
echo.
echo ======================================================================
pause

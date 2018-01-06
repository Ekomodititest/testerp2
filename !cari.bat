@echo off
findstr /M "'##'" *.js > results.txt
if %errorlevel%==0 (
echo Found! logged files into results.txt
) else (
echo No matches found
)
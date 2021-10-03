FROM mcr.microsoft.com/dotnet/core/sdk:5.0
COPY .keepr/bin/Release/net5.0/publish/ App/
WORKDIR /App
CMD ASPNETCORE_URLS=http://*:$PORT dotnet keepr.dll 

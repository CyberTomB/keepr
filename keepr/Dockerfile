FROM mcr.microsoft.com/dotnet/core/sdk:3.1
COPY bin/Release/net5.0/publish/ App/
WORKDIR /App
CMD ASPNETCORE_URLS=http://*:$PORT dotnet keepr.dll 

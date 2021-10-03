FROM mcr.microsoft.com/dotnet/core/sdk:3.1
COPY bin/Debug/net5.0/ App/
WORKDIR /App
CMD ASPNETCORE_URLS=http://*:$PORT dotnet keepr.dll 

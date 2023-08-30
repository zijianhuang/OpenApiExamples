cd $PSScriptRoot
c:\green\OpenApiClientGen\Fonlow.OpenApiClientGen.exe mcp.yaml OpenApiCodeGen.json
((Get-Content -path McpAuto.cs -Raw) -replace '1Eigw','') | Set-Content -Path McpAuto.cs
((Get-Content -path McpAuto.cs -Raw) -replace '> Mcp','> ') | Set-Content -Path McpAuto.cs


### Generate codes using OpenApiClientGen

Run CodeGen.bat will call a locally installed OpenApiClientGen.exe to generate client API codes in McpAuto.cs. The Broker service is using this client API with data annotation attributes.

Generated from CreateMediDataClientApi.ps1

#### Remarks
The Medicare Online OpenApi definition files have some design defects from certain point of view:

1. Repetitive header info for authentication of each API function.
1. Versioning through hash in the function suffix.

Therefore, the ps1 file removes the hash.


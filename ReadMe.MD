

## Build CS Codes

Since different codegens may generate C# codes with different dependencies. The simpliest way to build is to create a CS project with SLN in the same folder.

## Build NG2 Codes

Folder NG2TestBed contains a basic NG2 project for building with client API codes generated. A command line tool NgBuild\NgBuild.exe is provided for such purpose. NgBuild.exe requires the client API to have such config:
1. Client Namespace must be `MyNS`
2. Client API container class must be `MyClient`

NgBuild.exe will copy the norminated client API file and overwrite the one in the test bed and build.
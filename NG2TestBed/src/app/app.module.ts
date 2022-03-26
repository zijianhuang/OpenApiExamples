import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as namespaces from '../clientapi/ClientApiAuto';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import MyClient = namespaces.MyNS.MyClient; 

export function myClientFactory(http: HttpClient) {
	//return new namespaces.MyNS.MyClient('http://somewhere.com/', http); //for OpenApiClientGen
	return new namespaces.MyNS.MyClient(http, 'http://somewhere.com/'); //for NSwag
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: namespaces.MyNS.MyClient,
      useFactory: myClientFactory,
      deps: [HttpClient],
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

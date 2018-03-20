import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NetworkEngineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkEngineProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NetworkEngineProvider Provider');
  }

readTable() : Promise<any>
{
  let url="http://192.168.43.207/read.php";
  let request = this.http.get(url);
  return request.toPromise();
}
writeTable(n) : Promise<any>
{
  let url="http://192.168.43.207/create.php";
  let param = {name: n};
  let request = this.http.post(url, param);
  return request.toPromise();
}
}

import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LogService {

  log(msg: string) {
    console.log(`LOG: ${msg}`);
  }

}

import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Record } from '../models/record';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  private http = inject(HttpClient);

  createRecord(formData: FormData): any {
    return this.http.post<any>(`${environment.API}/registro`, formData)
   }


  getRecords() {
    return this.http.get<Record[]>(`${environment.API}/registros`);
  }
}

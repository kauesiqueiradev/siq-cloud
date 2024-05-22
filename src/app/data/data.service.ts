import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

export interface FileData {
  fileName: string;
  fileUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private apiUrl = 'http://localhost:3000/api';
  // private apiUrl = 'http://172.16.50.14:3000/api';
  private apiUrl = 'http://localhost:3002/api';
  private iconsUrl = 'assets/icons.json';

  constructor(private http: HttpClient) { }

  getFolder(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-folders`).pipe(
    );
  }

  getFiles(folderPath: string):Observable<FileData[]> {
    return this.http.get<FileData[]>(`${this.apiUrl}/get-files?folder=${folderPath}`).pipe(
      // tap((data: any) => console.log('Arquivos da pasta:', data))
    )
  }

  GenerateInvoicePDF(folderName: string, fileName: string){
    return this.http.get(`${this.apiUrl}/get-file?folder=${encodeURIComponent(folderName)}&file=${encodeURIComponent(fileName)}`,{observe:'response',responseType:'blob'});  
  }

  // getOpenFileUrl(folder: string, file: string): string {
  //   return `${this.apiUrl}/api/open-file?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(file)}`;
  // }



  
  // getFileUrl(folder: string, file: string): string {
  //   return `${this.apiUrl}/open-file?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(file)}`;
  // }

  // downloadFile(folder: string, file: string): Observable<Blob> {
  //   const url = this.getFileUrl(folder, file);
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  // downloadPdfFile(folder: string, file: string): Observable<Blob> {
  //   const url = `${this.apiUrl}/open-file?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(file)}`;
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  getIcons(): Observable<{name: string, icon: string}[]> {
    return this.http.get<{ name: string, icon: string }[]>(this.iconsUrl);
  }
}

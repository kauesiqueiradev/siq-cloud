import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileCacheService {
  private cachedFiles: { [url: string]: Blob} = {};

  constructor(private http: HttpClient) { }

  getFile(fileUrl: string): Observable<Blob> {
    if (this.cachedFiles[fileUrl]) {
      console.log("abrindo a função getFile");
      // console.log('Testando');
      return of(this.cachedFiles[fileUrl]);
    } else {
      return new Observable<Blob>((observer) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileUrl);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          console.log("parte 1 do blob");
          if (xhr.status === 200) {
            const blob = xhr.response;
            this.cachedFiles[fileUrl] = blob;
            observer.next(blob);
            observer.complete();
            console.log("parte 2 do blob");
          } else {
            observer.error(`Erro ao buscar o arquivo ${fileUrl}: ${xhr.statusText}`);
          }
        };
        xhr.onerror = () => {
          observer.error(`Erro ao buscar o arquivo ${fileUrl}: ${xhr.statusText}`);
        };
        xhr.send();
      });
    } 
  }

  isFileCached(fileUrl: string): boolean {
    console.log('armazenou em cached no isFileCached');
    return !!this.cachedFiles[fileUrl];
  }

  getCachedFile(fileUrl: string): Blob | null {
    console.log('armazenou e entrou na função getCachedFile');
    return this.cachedFiles[fileUrl] || null;
  }

  cacheFile(fileUrl: string): Observable<Blob> {
    return this.getFile(fileUrl);
  }
}

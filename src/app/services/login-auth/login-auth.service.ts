import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

interface User{
  [keys: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  // private apiUrl = "https://172.16.50.12:9002/rest/ZWS_SRA";
  private apiUrl = "https://172.16.50.9:9103/rest/ZWS_SRA";
  // http://172.16.50.9:9103/rest

  isAuthenticated$: Observable<boolean> = of(false)

  constructor(private http: HttpClient) { }

  login(cpfOrMat:string): Observable<User | null>{
    const basicAuth = 'Basic VVNFUkFQSTohQFQzY24wdDN4dCFsJQ==';
    const headers = new HttpHeaders({
      'Authorization': basicAuth
    });

    return this.http.get<User>(`${this.apiUrl}/get_all?page=1&limit=10000`, { headers: headers})
    .pipe(
      map((response:any) => {
        const user = response.objects.find((obj: any) => obj.cic === cpfOrMat || obj.mat === cpfOrMat);

        if (user) {
          this.isAuthenticated$ = of(true)
        } else {
          this.isAuthenticated$ = of(false)
        }
       
        return user ? user : null;
        
      }),
      catchError(() => {
        this.isAuthenticated$ = of(false);
        return of(null);
      })
    );     
  }
}


// xport class LoginAuthService {
//   private apiUrl = "https://172.16.50.12:9002/rest/ZWS_SRA";

//   constructor(private http: HttpClient) { }

//   login(cpfOrMat:string): Observable<boolean> {
//     const basicAuth = 'Basic VVNFUkFQSTohQFQzY24wdDN4dCFsJQ==';
//     const headers = new HttpHeaders({
//       'Authorization': basicAuth
//     });

//    return this.checkAllItems(cpfOrMat, 1, headers).pipe(
//     map(found => !!found)
//    );
//   }

//   private checkAllItems(cpfOrMat: string, page: number, headers: HttpHeaders): Observable<boolean> {
//     return this.http.get<any>(`${this.apiUrl}/get_all?page=1&limit=10`, { headers: headers})
//       .pipe(
//         map((response:any) => {
//           const user = response.objects.find((obj: any) => obj.cic === cpfOrMat || obj.mat === cpfOrMat);
//           console.log("Usuário:", user);
//           return user;
//         })
//       )
//   }
// }






// private checkAllItems(cpfOrMat: string, page: number, headers: HttpHeaders): Observable<any> {
//   let currentPage = 1;
//   let foundUser: any = null;

//   return new Observable(observer => {
//    const checkNextPage = () => {
//      this.http.get<any>(`${this.apiUrl}/get_all?page=${currentPage}`, { headers: headers})
//        .subscribe(
//          (response: any) => {
//            const user = response.objects.find((obj: any) => obj.cic === cpfOrMat || obj.mat === cpfOrMat);
//            if (user) {
//              foundUser = user;
//              observer.next(user);
//              console.log("User:", user)
//              observer.complete();
//            } else {
//              console.log("Total de páginas: ",response.total_page);
//              currentPage++;
//              console.log("Pagina:",currentPage);
//              if (currentPage <= response.total_page) {
//                checkNextPage();
//                console.log('Proxina Pagina', checkNextPage);
//              } else {
//                observer.next(null);
//                observer.complete();
//              }
//            }
//          },
//          error => {
//            observer.error('Erro ao obter dados da API:');
//          }
//        );
//    };
//    checkNextPage();
//   })
//  }
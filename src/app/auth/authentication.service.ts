import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public async authentication(): Promise<any> {
    const basicAuth = 'Basic VVNFUkFQSTohQFQzY24wdDN4dCFsJQ==';
    let allData: any[] = [];
    let currentPage = 1;

    try {
      const totalPage = await this.getTotalPage(basicAuth);

      while (currentPage <= totalPage) {
        const res: any = await this.http.get('http://172.16.50.12:9002/rest/ZWS_SRA/get_all?page=currentPage', {
          headers: { Authorization: basicAuth }
        }).toPromise();

        allData = allData.concat(res.data);

        currentPage++;

      }

      // console.log(allData);
      return allData;
      

      // if(res == 200) {
      //   return res;
      //   console.log(res)
      // } else {
      //   throw new Error('Erro ao autentiticar, Não conectou na API');
      // }
    } catch (error) {
      throw new Error('Erro ao buscar todos os dados: ' + error);
    }
  }

  private async getTotalPage(basicAuth: string): Promise<number> {
    try {
      const res: any = await this.http.get('http://172.16.50.12:9002/rest/ZWS_SRA/get_all', {
        headers: { Authorization: basicAuth }
      }).toPromise();

      return res.total_page;
    } catch (error) {
      throw new Error('Erro ao obter o número total de páginas: ' + error);
    }
  }
}

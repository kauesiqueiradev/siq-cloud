import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/interface/card';
import { DataService, FileData } from 'src/app/data/data.service';
import { FileCacheService } from 'src/app/services/file-cache/file-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit{
  itensPorPagina = 8;
  paginaAtual = 1;

  pdfUrl: any

  type: string = '';
  cards: Card[] = [] ;
  folderName: string = '';
  files: FileData[] = [];
  errorMessage: string = '';
  selectedFileName: string = '';

  @ViewChild('content') popupview !: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private folderService: DataService, 
    private router: Router, 
    private modalservice: NgbModal,
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderName = params['folderName'];
      this.getFiles(this.folderName);
    })
  }

  getFiles(folder: string): void {
    this.folderService.getFiles(folder).subscribe(
      (data: any) => {
        // console.log("data:", data);
        if (data && data.files && Array.isArray(data.files) && data.files.length > 0) {
          const pdfFiles = data.files.filter((fileData: { fileName: string; }) => {
            return fileData.fileName.toLowerCase().endsWith('.pdf');
          });
  
          if (pdfFiles.length > 0) {
            this.files = pdfFiles;
          } else {
            this.files = [];
            this.errorMessage = "Não há arquivos PDF nesta pasta.";
          }
        } else {
          this.files = [];
          if (data && data.error === 'Erro ao ler a pasta') {
            this.errorMessage = "A pasta não existe.";
          } else {
            this.errorMessage = "Essa pasta não contém a pasta: Arquivos PDFs!";
          }
        }
      },
      error => {
        console.error('Erro ao buscar arquivos:', error);
        this.files = [];
        this.errorMessage = "Essa pasta não contém a pasta: Arquivos PDFs!";
      }
    );
  }

  PreviewInvoice(folderName: string, fileName: string) {
    this.folderService.GenerateInvoicePDF(folderName, fileName).subscribe({
      next: (res: any) => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdfUrl = url;
        this.selectedFileName = fileName;

        this.modalservice.open(this.popupview, { fullscreen: true , animation: true });
        
      }, error: (error: any) => {
        console.error('Erro ao gerar o PDF do fatura:', error);
      }
    })
  }

  getPaginaArquivos(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.cards.slice(inicio, fim);
  }

  getTotalPaginas(): number {
    return Math.ceil(this.cards.length / this.itensPorPagina);
  }

  goBackToProcedures() {
    this.router.navigate(['/home/procedures']);
  }
}
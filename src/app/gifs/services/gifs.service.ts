
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
  private _historial: string[]=[];
  private _apiKey :string ='g2Eujg3FgrUvZylDeirueseKQptBsyPk'
  private servicioUrl:string ='http://api.giphy.com/v1/gifs'

  public resultados:Gif[]=[]

  get historial(){
    return [...this._historial]
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || []
    
  }

  buscarGifs(query:string=""){
    query = query.trim().toLowerCase()

    if(!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key',this._apiKey) 
      .set('limit','10')
      .set('q',query);
  

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((response)=>{
      this.resultados= response.data 
      localStorage.setItem('resultado',JSON.stringify(this.resultados))
    })
   
  }
  
  
}

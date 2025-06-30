import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToolType } from './models/tool-type.model';
import { Tool } from './models/tool.model';

@Injectable({
  providedIn: 'root'
})
export class Tools {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api';

  addToolType(toolType: { name: String, model: String, type: String, pictureURL: String }) {
    return this.http.post(`${this.apiUrl}/addToolType`, toolType);
  }

  getToolTypes() {
    return this.http.get<ToolType[]>(`${this.apiUrl}/getToolTypes`);
  }

  getToolTypeById(id: string) {
    return this.http.get<ToolType>(`${this.apiUrl}/getToolTypeById/${id}`);
  }

  addTool(tool: { serialNumber: String, status: string, model: String}) {
    return this.http.post(`${this.apiUrl}/addTool`, tool);
  }

  getTools(model: string) {
    return this.http.get<Tool[]>(`${this.apiUrl}/getTools?model=${encodeURIComponent(model)}`);
  }

  getToolTypeModels() {
    return this.http.get<string[]>(`${this.apiUrl}/tooltypes/models`);
  }

  updateToolType(toolType: ToolType){
      return this.http.put<ToolType>(`${this.apiUrl}/tooltypes/${toolType._id}`, toolType);
  }

  deleteToolType(id: string){
    return this.http.delete(`${this.apiUrl}/deleteToolType/${id}`);
  }  

}

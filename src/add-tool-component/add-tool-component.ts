import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tools } from '../tools';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tool-component',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-tool-component.html',
  styleUrl: './add-tool-component.css'
})
export class AddToolComponent {

  constructor(private router: Router, private toolService: Tools, private toastr: ToastrService) {}

  tool = {
    serialNumber: '',
    status: '',
    model: ''
  };

  statuses = ['Elérhető', 'Kiadva', 'Szervizben', 'Leltár'];
  models: string[] = [];

  ngOnInit() {
    this.toolService.getToolTypeModels().subscribe({
      next: (data) => this.models = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (!this.tool.serialNumber) return;

    this.toolService.addTool({serialNumber: this.tool.serialNumber, status: this.tool.status, model: this.tool.model})
      .subscribe({
          next: (res: any) => {
            this.toastr.success('Sikeres Tool hozzáadás!', 'Siker');
          },
          error: (err: { error: { message: string; }; }) => {
            this.toastr.error(err.error.message, 'Hiba');
          }
    })

    this.tool = {
      serialNumber: '',
      status: '',
      model: ''
    };
    
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tools } from '../tools';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tool-types-component',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-tool-types-component.html',
  styleUrl: './add-tool-types-component.css'
})
export class AddToolTypesComponent {

  tool = {
    imageUrl: '',
    name: '',
    model: '',
    type: '',
  };

  types = ['Laptop', 'Telefon', 'Sim-kártya', 'Hotspot', 'Más'];

  constructor(private router: Router, private toolService: Tools, private toastr: ToastrService) {}

  onSubmit() {
    this.toolService.addToolType({name: this.tool.name, model: this.tool.model, 
      type: this.tool.type, pictureURL: this.tool.imageUrl})
      .subscribe({
          next: (res: any) => {
            this.toastr.success('Sikeres ToolType hozzáadás!', 'Siker');
          },
          error: (err: { error: { message: string; }; }) => {
            this.toastr.error(err.error.message, 'Hiba');
          }
    })

    this.tool = {
      imageUrl: '',
      name: '',
      model: '',
      type: '',
    };

  }

}

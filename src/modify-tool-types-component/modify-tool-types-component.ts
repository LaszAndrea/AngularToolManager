import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tools } from '../tools';

@Component({
  selector: 'app-modify-tool-types-component',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './modify-tool-types-component.html',
  styleUrl: './modify-tool-types-component.css'
})
export class ModifyToolTypesComponent {

  constructor(private router: Router, private toastr: ToastrService, private toolService: Tools, private route: ActivatedRoute){}

  toolType = {
    _id: '',
    pictureURL: '',
    name: '',
    model: '',
    type: '',
  };


  types = ['Laptop', 'Telefon', 'Sim-kártya', 'Hotspot', 'Más'];
  models: string[] = [];

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.toolService.getToolTypeById(id).subscribe(toolType => {
        this.toolType = toolType;
      });
    }
    this.toolService.getToolTypeModels().subscribe({
      next: (data) => this.models = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
  if (!this.toolType._id) {
    this.toastr.error('Nincs azonosító a módosításhoz!');
    return;
  }

  this.toolService.updateToolType(this.toolType).subscribe({
    next: () => {
      this.toastr.success('Sikeres módosítás!');
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.toastr.error('Hiba történt a módosítás során.');
      console.error(err);
    }
  });
}


}

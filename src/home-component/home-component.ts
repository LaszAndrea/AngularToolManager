import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tools } from '../tools';
import { ToolType } from '../models/tool-type.model';
import { Tool } from '../models/tool.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

  constructor(private toolService: Tools, private toastr: ToastrService, private router: Router) {}
  tools: ToolType[] = [];
  filteredTools: ToolType[] = [];
  userName: string = ""
  detailedTools: { [model: string]: Tool[] } = {};

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name;
    }
    this.toolService.getToolTypes().subscribe({
      next: (data) => {
        this.tools = data;
        this.filteredTools = data;
      },
      error: (err) => console.error('Hiba a lekéréskor:', err)
    });
    this.toolService.getToolTypes().subscribe({
    next: (data) => {
      this.tools = data;
      for (const toolType of this.tools) {
        const model = toolType.model;
        this.toolService.getTools(model).subscribe({
          next: (tools) => {
            this.detailedTools[model] = tools;
          },
          error: (err) => {
            console.error(`Hiba a ${model} eszközöknél:`, err);
            this.detailedTools[model] = [];
          }
        });
      }
    },
    error: (err) => console.error('Hiba a lekéréskor:', err)
  });
  }

  onSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  const query = input.value.toLowerCase();

  this.filteredTools = this.tools.filter(tool =>
    tool.name.toLowerCase().includes(query) ||
    tool.model.toLowerCase().includes(query) ||
    tool.type.toLowerCase().includes(query)
  );
  }

  expandedModels: Set<string> = new Set();
  toggleExpand(toolType: ToolType) {
    const model = toolType.model;

    if (this.expandedModels.has(model)) {
      this.expandedModels.delete(model);
    } else {
      this.expandedModels.add(model);

      if (!this.detailedTools[model]) {
        this.toolService.getTools(model).subscribe((tools) => {
          this.detailedTools[model] = tools;
        });
      }
    }
  }

  onDelete(toolType: ToolType) {
  if (confirm(`Biztosan törlöd a(z) ${toolType.name} típust és a hozzá tartozó eszközöket?`)) {
    this.toolService.deleteToolType(toolType._id).subscribe({
      next: () => {
        this.toastr.success('Sikeres törlés!');
        this.tools = this.tools.filter(t => t._id !== toolType._id);
      },
      error: (err) => {
        this.toastr.error('Hiba történt a törlés során.');
      }
    });
    }
  }

  editTool(toolType: ToolType) {
    this.router.navigate(['/modifyToolType', toolType._id]);
  }

  logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  fabOpen = false;

  toggleFab() {
    this.fabOpen = !this.fabOpen;
  }

  @HostListener('document:click')
  closeFab() {
    this.fabOpen = false;
  }

}

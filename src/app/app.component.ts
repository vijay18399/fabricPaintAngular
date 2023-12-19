import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicDirective } from './utils/dynamic.directive';
import { Page } from './models/page.model';
import { CanvasComponent } from './components/canvas/canvas.component';
import { PageService } from './services/page.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ToolService } from './services/tool.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page!: Page;
  componentRef: any;
  sideNavOpen = false;
  isDarkMode = false;
  colors: string[] = [
    '#0099D6',
    '#FFE800',
    '#E72853',
    '#EB7418',
    '#783060',
    '#000000',
    '#4CAF50',
    '#FF9800',
    '#FF5722',
    '#3F51B5',
    '#2196F3',
    '#673AB7',
    '#FFC107',
    '#607D8B',
    '#9C27B0'
  ];
  @ViewChild(DynamicDirective, { static: true }) canvasDir!: DynamicDirective;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(public toolService: ToolService,public pageService: PageService, public dialog: MatDialog, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    }

  }
  updateColor(color: string) {
    this.toolService.updateColor(color)
  }


  opensideNav() {
    this.sideNavOpen = !this.sideNavOpen;
    let data = (<any>this.componentRef.instance).getPageData();
    this.pageService.setPageData(data);
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

}

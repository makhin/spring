import { Component, OnInit } from '@angular/core';
import {IEntity} from '../models/IEntity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-save-panel',
  templateUrl: './save-panel.component.html',
  styleUrls: ['./save-panel.component.sass']
})

export class SavePanelComponent<T extends IEntity> implements OnInit {
  entity: T;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onInsert(entity: T) {
  }

  onUpdate(event: any) {
  }

  onDelete(entityToDelete: T, event: any) {
  }

  onBack() {
    this.router.navigate(['']);
  }
}

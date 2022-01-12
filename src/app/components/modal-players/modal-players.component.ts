import { ChangeDetectionStrategy, Component, HostListener, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-players',
  templateUrl: './modal-players.component.html',
  styleUrls: ['./modal-players.component.scss']
})
export class ModalPlayersComponent  {

  players = [] as any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      players: any
    }, public dialogRef: MatDialogRef<ModalPlayersComponent>) { 
      this.players = data.players;
    }

  public cancel() {
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }

  addPlayer() {
    if(this.players.length<8) {
      this.players.push('');
    }
  }

  removePlayer(i: any) {
    console.log(i);
    this.players.splice(i, 1);
    console.log(this.players);
  }
  
  trackByFn(index: any, item: any) {   
    return index; 
  }
  
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conversion-update-dialog',
  templateUrl: './conversion-update-dialog.component.html'
})
export class ConversionUpdateDialogComponent implements OnInit {
  
  public conversionDate!: Date;


  constructor(
    public dialogRef: MatDialogRef<ConversionUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { conversionId: number, conversionDate: string }
  ) {}

  ngOnInit() {
    // Convertir el string a objeto Date
    this.conversionDate = new Date(this.data.conversionDate);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    // Aquí puedes convertir de nuevo a string si es necesario
    this.data.conversionDate = this.conversionDate.toISOString(); 
    this.dialogRef.close(this.data);
  }
}

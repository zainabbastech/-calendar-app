import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-delete-appointment-dialog',
  templateUrl: './delete-appointment-dialog.component.html',
  styleUrls: ['./delete-appointment-dialog.component.css']
})
export class DeleteAppointmentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) { }

  onDelete(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}

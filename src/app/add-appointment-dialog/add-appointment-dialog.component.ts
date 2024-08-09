import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment-timezone';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.css']
})
export class AddAppointmentDialogComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }
  ) {
    this.appointmentForm = this.fb.group({
      title: [''],
      time: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const rawDate = this.data.date;
      const rawTime = this.appointmentForm.value.time;
      const timeMoment = moment(rawTime, 'HH:mm');
      const appointmentDate = moment.tz(rawDate, 'Asia/Karachi').set({
        hour: timeMoment.hour(),
        minute: timeMoment.minute(),
        second: 0,
        millisecond: 0
      }).toDate();

      console.log('Raw Date and Time:', rawDate, rawTime);
      console.log('Created Date Object:', appointmentDate);

      const appointment: Appointment = {
        id: Math.floor(Math.random() * 1000),
        title: this.appointmentForm.value.title || 'No Title',
        date: appointmentDate
      };
      this.dialogRef.close(appointment);
    }
  }
}

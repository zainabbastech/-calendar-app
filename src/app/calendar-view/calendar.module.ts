import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from './calendar-view.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';
import { CalendarViewModule } from './calendar-view.module';
@NgModule({
  declarations: [CalendarViewComponent, AddAppointmentDialogComponent, DeleteAppointmentDialogComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarViewModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule, 
    DragDropModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class CalendarModule { }

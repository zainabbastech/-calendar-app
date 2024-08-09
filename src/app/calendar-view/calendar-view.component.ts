import { Component, OnInit } from '@angular/core';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import { CalendarService } from '../service/calendar.service';
import { Appointment } from '../model/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';
import moment from 'moment-timezone';
import { DeleteAppointmentDialogComponent } from '../delete-appointment-dialog/delete-appointment-dialog.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
    currentMonth: Date = new Date();
    calendarDates: Date[] = [];
    appointments: Appointment[] = [];
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    constructor(
        private calendarService: CalendarService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.generateCalendar();
        this.loadAppointments();
    }

    loadAppointments(): void {
        this.calendarService.getAppointments().subscribe(appointments => {
            this.appointments = appointments;
            console.log('Loaded Appointments:', this.appointments);
        });
    }

    generateCalendar(): void {
        console.log('generateCalendar')
        const start = startOfWeek(startOfMonth(this.currentMonth));
        const end = endOfWeek(endOfMonth(this.currentMonth));
        let date = start;
        this.calendarDates = [];

        while (date <= end) {
            this.calendarDates.push(date);
            date = addDays(date, 1);
        }
    }

    prevMonth(): void {
        this.currentMonth = subMonths(this.currentMonth, 1);
        this.generateCalendar();
    }

    nextMonth(): void {
        this.currentMonth = addMonths(this.currentMonth, 1);
        this.generateCalendar();
    }

    isToday(date: Date): boolean {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    openDeleteDialog(appointment: Appointment): void {
        const dialogRef = this.dialog.open(DeleteAppointmentDialogComponent, {
            width: '300px',
            data: appointment
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.calendarService.deleteAppointment(appointment).subscribe(() => {
                    this.loadAppointments();
                    this.generateCalendar(); 
                });
            }
        });
    }

    getAppointmentsForDate(date: Date): Appointment[] {
        const appointmentsForDate = this.appointments.filter(appointment => {
            const appointmentMoment = moment.tz(appointment.date, 'Asia/Karachi');
            return appointmentMoment.isSame(date, 'day');
        });

        console.log('Appointments for Date:', date, appointmentsForDate);
        return appointmentsForDate;
    }

    openAppointmentDialog(date: Date): void {
        const appointmentsForDate = this.getAppointmentsForDate(date);

        if (appointmentsForDate.length > 0) {
            this.openDeleteDialog(appointmentsForDate[0]);
        } else {
            console.log('openAppointmentDialog')
            const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
                width: '400px',
                data: { date }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.calendarService.addAppointment(result).subscribe(() => {
                        this.loadAppointments();
                        this.generateCalendar();
                    });
                }
            });
        }
    }

    onDrop(event: CdkDragDrop<Date,any, any>): void {
        const draggedAppointment: Appointment = event.item.data;
        const targetDate: Date = event.container.data;

        if (draggedAppointment && targetDate) {
            const updatedAppointment: Appointment = {
                ...draggedAppointment,
                date: moment(targetDate).set({
                    hour: moment(draggedAppointment.date).hour(),
                    minute: moment(draggedAppointment.date).minute()
                }).toDate()
            };
            console.log('Updated Appointment:', updatedAppointment);
            this.calendarService.addAppointment(updatedAppointment).subscribe(() => {
                this.loadAppointments(); 
            });
        }
    }

}

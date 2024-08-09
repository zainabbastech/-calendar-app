import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../model/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private appointments: Appointment[] = [];

    getAppointments(): Observable<Appointment[]> {
        return of(this.appointments);
    }

    addAppointment(appointment: Appointment): Observable<void> {
        const index = this.appointments.findIndex(a => a.id === appointment.id);
        if (index > -1) {
            this.appointments[index] = appointment; 
        } else {
            this.appointments.push(appointment); 
        }
        return of(void 0);
    }

    filterAppointments(date: Date): Observable<Appointment[]> {
        return of(this.appointments.filter(appointment =>
            new Date(appointment.date).toDateString() === date.toDateString()
        ));
    }

    deleteAppointment(appointment: Appointment): Observable<void> {
        const index = this.appointments.findIndex(a => a.id === appointment.id);
        if (index > -1) {
            this.appointments.splice(index, 1);
        }
        return of(void 0);
    }
}

import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./calendar-view/calendar.module').then(m => m.CalendarModule)
    },
];
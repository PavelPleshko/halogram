import { transition, style, animate, trigger,state } from '@angular/animations';


export const fadeInOutAnimation =
    trigger('fadeInOutAnimation', [
   transition(':enter', [
            style({
                opacity:0
            }),
            animate('.6s ease-in-out', style({
                opacity:1
            }))
        ]),
        transition(':leave', [
            animate('.5s ease-in-out', style({
                opacity:0
            }))
        ])
    ]);
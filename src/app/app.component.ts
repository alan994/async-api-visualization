import { Component } from '@angular/core';
import { MergerService } from './merger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    data: any;
    details: any;


    constructor(private merger: MergerService) {
        this.data = merger.getEvents();
    }

    getDetailsForMessage(message: any) {
        this.details = this.merger.getDetailsForMessage(message);
    }



}

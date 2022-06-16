import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-service-definition',
    templateUrl: './service-definition.component.html',
    styleUrls: ['./service-definition.component.scss']
})
export class ServiceDefinitionComponent implements OnInit {

    @Input("service")
    public service: any;

    constructor() { }

    ngOnInit(): void {
    }

}

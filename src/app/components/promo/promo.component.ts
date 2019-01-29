import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

    promoTimerForm = new FormGroup({
        'hours': new FormControl('00'),
        'minutes': new FormControl('00'),
        'seconds': new FormControl('00'),
    });

    constructor() {
    }

    ngOnInit() {
    }

    onPromoTimerSubmitted() {
        console.log('Hours', this.promoTimerForm.value.hours);
    }

}

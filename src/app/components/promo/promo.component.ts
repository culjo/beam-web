import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

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

    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
    errorMessage: string;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 20000);

        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(5000)
        ).subscribe(() => this.successMessage = null);
    }

    onPromoTimerSubmitted() {
        console.log('Hours', this.promoTimerForm.value.hours);
    }

    startPromo() {
        this.errorMessage = null;
        this.apiService.startPromo().subscribe(
            done => {
                this._success.next(`${new Date()} - Hurray! Promos Started Successfully.`);
            },
            error1 => {
                console.log('Promo Failed to start', error1);
                this.errorMessage = 'Oops!.. Failed to start PROMO, please try again!';
            }
        );
    }

    stopPromo() {
        this.errorMessage = null;
        this.apiService.stopPromo().subscribe(
            done => {
                this._success.next(`${new Date()} - You have Ended the promo session. Bye!`);
            },
            error1 => {
                console.log('Error Ending promo..');
                this.errorMessage = 'Oops!.. Failed to stop PROMO, Please try again!';
            }
        );
    }

    public changeSuccessMessage() {
        this._success.next(`${new Date()} - Message successfully changed.`);
    }
}

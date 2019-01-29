import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/product';
import {Subscription} from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProduct} from '../../models/user-products';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    modalRef: NgbModalRef;
    subscribeFormGroup = new FormGroup({
        'phone': new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
        'price': new FormControl('0.00'),
        'fromAction': new FormControl('') // which action did the user perform before submitting
    });

    allProducts: Product[];
    userProducts: UserProduct[] = [];

    selectedProduct: Product;

    constructor(private apiService: ApiService, private modalService: NgbModal) {
    }

    ngOnInit() {
        if (this.hasRegistered()) {
            this.subscribeFormGroup.removeControl('phone');
        }
        if (this.hasRegistered()) {
            this.getUserProducts();
        } else {
            this.getAllProducts();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    hasRegistered() {
        const uId = localStorage.getItem('be_u_id');
        console.log('USER HAS ID ALREADY', uId);
        return uId == null ? false : true;
    }

    getAllProducts() {

        this.subscription = this.apiService.fetchAllProducts().subscribe(
            products => {
                this.allProducts = products.data;

                this.allProducts.forEach((product) => {
                    this.isProductInUserFavourite(product);
                });

            },
            error1 => {
                console.log('Product fetching failed');
            }
        );

    }

    getUserProducts() {

        const userId = localStorage.getItem('be_u_id');
        this.subscription = this.apiService.fetchUserProducts(userId).subscribe(
            products => {
                this.userProducts = products.data;
                this.getAllProducts();
            },
            error1 => {
                console.log('Product fetching failed');
            }
        );

    }

    isProductInUserFavourite(product: Product): boolean {
        const foundIndex = this.userProducts.findIndex(userFavProduct => {
            return userFavProduct.product_id === product.product_id;
        });
        return product.isInFavourite = foundIndex > -1;
    }

    openSubscriptionModal(modalContent, product) {
        this.selectedProduct = product;
        this.modalRef = this.modalService.open(modalContent, {centered: true});
        this.modalRef.result.then((result) => {

            console.log('Dialog Closed with a', result);
            // call a refresh here

        }, reason => {
            console.log('User Registration Dialog Dismissed', reason);
        });
    }

    closeUserRegModal(result: any) {
        if (this.modalRef != null) {
            // we could refresh this page here.. if possible
            this.modalRef.close(result);
        }
    }

    onSubmit() {

        const phone = this.subscribeFormGroup.value.phone;
        const price = this.subscribeFormGroup.value.price;

        if (this.hasRegistered()) { // user has fav before
            this.subscribeUser(price);
        } else {
            this.apiService.loginRegisterUser({phone: phone}).subscribe(
                result => {
                    if (result['success']) {
                        const userId = result['data']['user_id'];
                        localStorage.setItem('be_u_id', userId);
                        // localStorage.setItem('')
                        this.subscribeUser(price);
                    }
                },
                error1 => {
                    console.log(error1);
                }
            );

        }

    }

    subscribeUser(myPrice) {

        const userId = localStorage.getItem('be_u_id');
        const params = {
            userId: userId,
            myPrice: myPrice
        };

        this.apiService.subscribeUser(this.selectedProduct.product_id, params).subscribe(
            result => {
                console.log('Product Subscribed to successfully');
                this.closeUserRegModal('Success');

                const found = this.allProducts.findIndex((product) => {
                    return product.product_id === this.selectedProduct.product_id;
                });
                if (found > -1) {
                    this.allProducts[found].isInFavourite = true;
                }

            },
            error1 => {
                console.log(error1);
            }
        );

    }

}

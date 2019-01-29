import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/product';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    allProducts: Product[];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.getAllProducts();
    }

    getAllProducts() {
        this.apiService.fetchAllProducts().subscribe(
            products => {
                // run a change please
                this.allProducts = products.data;
            },
            error1 => {
                console.log('Error Fetching products', error1);
            }
        );
    }

    updateProduct(product: Product) {
        console.log('Update with Id', product.product_id);

        const params = {
            price: product.price.toString(),
            discount: product.discount.toString(),
            price_to_subtract: product.price_to_subtract.toString(),
            is_promo_enabled: product.is_promo_enabled
        };
        console.log('It\'s Ok to Update with ', params);

        this.apiService.updateProduct(product.product_id, params).subscribe(response => {
            if (response['success']) {
                console.log('Product Saved');
            }
        }, error1 => {
            console.log('Product Not Saved');
        });

    }

    /* this.apiService.fecthSomthing().subscribe(
                result => {
                    console.log('I AM BACK FROM HTTP CALL', result);
                },
                error1 => {
                    console.log('ERRROR FORM CALL', error1);
                }
            ); */
}

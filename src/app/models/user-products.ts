import {Product} from './product';

export interface UserProductResponse {
    success: boolean;
    message: string;
    data:    UserProduct[];
}

export interface UserProduct {
    user_product_id: number;
    user_id:         number;
    product_id:      number;
    my_price:        string;
    is_notified:     boolean;
    disabled:        boolean;
    created_on:      Date;
    updated_on:      Date;
    product:         Product;
}

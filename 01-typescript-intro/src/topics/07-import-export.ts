
//me traigo la interface del topic 06
import { Product } from './06-functions-destructuring'
import { taxCalculation } from './06-functions-destructuring';


const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },
    {
        description: 'iPad',
        price: 150
    }
];

//Tax = 0.15
const [total, tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.15
})

console.log('Total: ', total);
console.log('Tax: ', tax);
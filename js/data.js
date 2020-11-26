import API from './api.js';




const endpoints = {
    
    PRODUCTS: 'data/products',
    PRODUCT_BY_ID: 'data/products/',
    USERS: 'data/users',
    USER_BY_ID: 'data/users/'
}


const api = new API('925A77AA-87BD-678E-FF66-809F764B3C00','D2A8C6E6-C3B0-4298-BBEF-C2B3C4585602',


 );

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

export async function createProduct(product){
    return api.post(endpoints.PRODUCTS, product)
}

export async function getAllProducts(search){
    if(!search){
    return api.get(endpoints.PRODUCTS);
    }else{
        return api.get(endpoints.PRODUCTS + `?where=${escape(`name LIKE '%${search}%'`)}`);
    }
}

export async function getAllUsers(){
    return api.get(endpoints.USERS)
}

export async function getUserById(id){
    return api.get(endpoints.USER_BY_ID + id);
}
export async function getProductById(id){
    return api.get(endpoints.PRODUCT_BY_ID+id);
}

export async function editProduct(id,updatedProduct){
    return api.put(endpoints.PRODUCT_BY_ID+id, updatedProduct);


}

export async function deleteProduct(id){
    return api.delete(endpoints.PRODUCT_BY_ID+id);
}

export async function  addQuantity(id, quantity){
    const product = await getProductById(id);

    return editProduct(id, {quantity: product.quantity + quantity});


}

export function checkResult(result){
    if(result.hasOwnProperty('errorData')){
        const error = new Error();
        Object.assign(error,result);
        throw error;
    }
}
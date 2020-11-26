import { addQuantity, checkResult, createProduct, deleteProduct, editProduct, getProductById, getUserById } from "../data.js"

export async function createPage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/product/create.hbs', this.app.userData)
}

export async function createPost(){
    try{
    if(this.params.name.length === 0){
        throw new Error('All field must be filled')
    }
    if(this.params.price.length < 0){
        throw new Error('All fields must be filled')
    }
    
    const product = {
        name: this.params.name,
        price: this.params.price,
        details: this.params.details,
        imageURL: this.params.imageURL,
        quantity: Number.parseInt(this.params.quantity),
        addedBy: this.app.userData.username,
    }

    const result = await createProduct(product);

    checkResult(result);

    this.redirect('#/home')
}catch(err){
    alert(err.message);
}
}

export async function detailsPage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const context = Object.assign({}, this.app.userData);

    const product = await getProductById(this.params.id);

    context.product = product;

    if(this.app.userData.isAdmin === true){
        context.isAdmin = true;
    }

    const user = await getUserById(this.app.userData.userId);
    if(user.admin)
    {
        context.admin = true;
    }
    

    this.partial('./templates/product/details.hbs', context)
}

export async function editPage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const context = Object.assign({}, this.app.userData);

    const product = await getProductById(this.params.id);

    context.product = product;

    this.partial('./templates/product/edit.hbs', context)
}

export async function editPost(){
    try{
        if(this.params.name.length === 0){
            throw new Error('All fields must be filled')
        }
        if(this.params.price.length === 0){
            throw new Error('All fields must be filled')
        }

        const updatedProduct = {
            name: this.params.name,
            price: this.params.price,
            details: this.params.details,
            imageURL: this.params.imageURL,
            addedBy: this.app.userData.username,
            quantity: Number.parseInt(this.params.quantity)
        }

        const result = await editProduct(this.params.id,updatedProduct);

        checkResult(result);

        this.redirect('#/home')
    }catch(err){
        alert(err.message)
    }
}

export async function deleteGet(){
    try{
        const result = await deleteProduct(this.params.id);

        checkResult(result);

        this.redirect('#/home');
    }catch(err){
        alert(err.message)
    }
}

export async function addQuantityPost(){
    try{
        const quantity = parseInt(this.params.quantity);
        const result = await addQuantity(this.params.id, quantity);

        checkResult(result);

        this.redirect('#/details/' + this.params.id)
    }catch(err){
        alert(err.message)
    }
}
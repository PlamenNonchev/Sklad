import { getAllProducts, getUserById } from "../data.js";

export async function homePage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        product: await this.load('./templates/product/product.hbs')
    }

    const search = this.params.search;
    

    const context = Object.assign({}, this.app.userData);
    if(this.app.userData.username){
        const products = await getAllProducts(search);

        context.products = products;
    }

    context.search = search;
    const user = await getUserById(this.app.userData.userId);
    if(user.admin)
    {
        context.admin = true;
    }
    

 

    this.partial('./templates/home.hbs', context)
}
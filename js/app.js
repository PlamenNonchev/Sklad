import {homePage} from './controllers/home.js'
import { addQuantityPost, createPage, createPost, deleteGet, detailsPage, editPage, editPost } from './controllers/product.js';
import { loginPage, loginPost, logout, registerPage, registerPost } from './controllers/user.js';
import { register } from './data.js';

window.addEventListener('load', () =>{
    const app = Sammy('body', function(){
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            
        }

        


        this.get('/', homePage)
        this.get('#/home', homePage);
        this.get('index.html', homePage);

        this.get('#/create', createPage)
        this.post('#/create', (ctx) => {createPost.call(ctx)});

        this.get('#/register', registerPage);
        this.post('#/register', (ctx) => {registerPost.call(ctx)});

        this.get('#/login', loginPage);
        this.post('#/login', (ctx) => {loginPost.call(ctx)});

        this.get('#/logout', logout);

        this.get('#/details/:id', detailsPage);

        this.get('#/edit/:id', editPage)
        this.post('#/edit/:id', (ctx) => {editPost.call(ctx)});

        this.get('#/delete/:id', deleteGet)

        this.post('#/add-quantity/:id', (ctx) => {addQuantityPost.call(ctx)});
        




    })

    app.run();
})
import { checkResult, login, register, logout as apiLogout, getAllUsers } from "../data.js"

export async function registerPage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/user/register.hbs', this.app.userData)
}

export async function registerPost(){
    try{
    if(this.params.username.length < 3){
        throw new Error('Username should be at least 3 characters long')
    }
    if(this.params.password.length < 6){
        throw new Error('Password should be at least 6 characters long')
    }
    if(this.params.password !== this.params.rePassword){
        throw new Error('Passwords don\'t match')
    }

    let isAdmin = false;
    const users = await getAllUsers();

    if(users.length === 0)
    {
        isAdmin = true;
    }

    const result = await register(this.params.username,this.params.password,isAdmin);

    checkResult(result);

    const loginResult = await login(this.params.username,this.params.password);

    checkResult(loginResult);

    this.app.userData.username = loginResult.username;
    this.app.userData.userId = loginResult.userId;

    this.redirect('#/home');
}catch(err){
    alert(err.message)
}


    
}
export async function loginPage(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/user/login.hbs', this.app.userData)
}

export async function loginPost(){
    try{
    if(this.params.username.length === 0){
        throw new Error('All fields must be filled');
    }
    if(this.params.password.length === 0){
        throw new Error('All fields must be filled');
    }

    const result = await login(this.params.username,this.params.password);

    checkResult(result);

    this.app.userData.username = result.username;
    this.app.userData.userId = result.userId;

    this.redirect('#/home')
}catch(err){
    alert(err.message)
}
}

export async function logout(){
    try{
        const result = await apiLogout();

        checkResult(result);

        this.app.userData.username = '';
        this.app.userData.userId = '';

        this.redirect('#/login');
    }catch(err){
        alert(err.message)
    }
}
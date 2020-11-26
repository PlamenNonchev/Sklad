import { getUserById } from "./data.js";


export default class API{
    constructor(appId, apiKey){
        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoints = {
            REGISTER: 'users/register',
            LOGIN: 'users/login',
            LOGOUT: 'users/logout'
        }; 

        

    }
    host(endpoint){
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
    
    }

    getOptions(headers){
        const token = localStorage.getItem('userToken');
    
        const options = {headers: headers || {}};
        
        if(token !== null){
            Object.assign(options.headers,{'user-token': token});
        }
    
        return options;
    }
    
    async  get(endpoint){
      
    
    
        const result = (await fetch(this.host(endpoint), this.getOptions()));
    
       try{
        return await result.json();  
       }
       catch(err){
           return await result;
       }
    
        
    }

    async  post(endpoint,body){
        const options = this.getOptions({'Content-Type': 'application/json'});
    
         options.method = 'POST';
        
         options.body = JSON.stringify(body);
    
        
    
        const result = (await fetch(this.host(endpoint), options)).json();
    
       
        
    
        return result;
    }

    async  put(endpoint,body){
        const options = this.getOptions({'Content-Type': 'application/json'});
    
         options.method = 'PUT';
         
         options.body = JSON.stringify(body);
    
    
    
        const result = (await fetch(this.host(endpoint), options)).json();
    
     
        
    
        return result;
    }

    async delete(endpoint){

        const options = this.getOptions();

        options.method = 'DELETE';
     

        
        const result = await fetch(this.host(endpoint), options);

    

        return result;

    }

    async register(username,password, isAdmin){
        return this.post(this.endpoints.REGISTER,{
            username,
            password,
            admin: isAdmin
        });
       
    }

    async login(username,password){
        const result = await this.post(this.endpoints.LOGIN, {
            login: username,
            password
        });
        
        const user = await getUserById(result.objectId);


        localStorage.setItem('userToken',result['user-token']);
        localStorage.setItem('username',result.username);
        localStorage.setItem('userId',result.objectId);
        localStorage.setItem('isAdmin', user.admin);
    
        return result;
    
    }
    
    async logout(){
    
        const result = await this.get(this.endpoints.LOGOUT);
    
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin')
    
        return result;
    
    
        
    
    
        
    }
}














import {BaseAppConfig} from '../../app/ITypes'

//export const baseURL = window.location.href.indexOf('localhost') === -1 ? `${window.location.protocol}//${window.location.host}/api` : 'https://localhost:44330';

const prod : BaseAppConfig = {
    baseUrl: {
        api : 'http://api.domain.eu',
        app: 'http://crm.domain.eu/'
    }
};

const dev : BaseAppConfig = {
    baseUrl: {
        api : 'https://localhost:44330',
        app: 'http://localhost:3000/'
    }
 };

 

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

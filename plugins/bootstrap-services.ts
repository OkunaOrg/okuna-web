import '@abraham/reflection';
import { container } from '~/node_modules/tsyringe';
import { ApiService } from '~/services/Api';


export default function (ctx: any, inject: any) {
    if (!ctx.$axios) {
        console.error('Please make sure $axios module is added');
    } else {
        const apiService = container.resolve(ApiService);
        apiService.setAxiosClient(ctx.$axios);
    }
}
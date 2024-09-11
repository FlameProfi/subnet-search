import $api from "../http";
import {AxiosResponse} from 'axios';
import {IParams} from "../models/IUser";



export default class ParamsService{
    static fetchData(ip: string, subnet: number): Promise<AxiosResponse<IParams[]>> {
        return $api.get<IParams[]>(`/params/${ip}/${subnet}`)
    }
}

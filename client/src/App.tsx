import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IParams} from "./models/IUser";
import ParamsService from './services/ParamsService';
import "./style.css"
import git from "./icons8-git.svg"

const App: FC = () => {
    const {store} = useContext(Context);
    const [params, setParams] = useState<IParams[]>([]);
    const [ip, setIp] = useState<string>('')
    const [subnet, setSubnet] = useState<number>(0)
    let subnetCount = 0;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getParams() {
        if(ip && subnet == null && ip == "") return console.log("Введите данные");
        // console.log(await ParamsService.fetchData(ip, subnet))
        try {
            const response = await ParamsService.fetchData(ip, subnet);
            setParams(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className='main__content'>

            <div className='main__block'>
            <input
            onChange={e => setIp(e.target.value)}
            value={ip}
            type="text"
            placeholder='IP'
        />
        <input
            onChange={e => setSubnet(parseInt(e.target.value))}
            value={subnet}
            type="number"
            max={50}
            placeholder='Кол-во подсетей'
        />
            <button onClick={getParams}>Получить информацию</button>
            <div className='params__all'>
            {params.map(data =>
            <div className='params__item' key={data.broadcastAddress}>
                <div className='params__item__text'><h1>Subnet: </h1> <p>{subnetCount++}</p></div>
                <div className='params__item__text'><h1>Network Address:</h1> <p>{data.networkAddress}</p></div>
                <div className='params__item__text'><h1>Subnet Mask:</h1> <p>{data.subnetMask}</p></div>
                <div className='params__item__text'><h1>First Host: </h1> <p>{data.firstHost}</p></div>
                <div className='params__item__text'><h1>Last Host:</h1> <p>{data.lastHost}</p></div>
                <div className='params__item__text'><h1>Broadcast Address:</h1> <p>{data.broadcastAddress}</p></div>
            </div>
            )}
            </div>
            </div>
            <footer>

                <img src={git} alt="" onClick={() => window.location.assign('https://github.com/FlameProfi')} />
                <p>Поставьте звездочек на гитке</p>
            </footer>
        </div>
        
        
    );
};

export default observer(App);

export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
}

export interface IParams {
    networkAddress: string,
    subnetMask: string,
    firstHost: string,
    lastHost: string,
    broadcastAddress: string
}
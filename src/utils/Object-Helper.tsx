import {UsersType} from "../Redux/Types/types";
export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: string, newObjProps: {}) => {
    return items.map( (u: any) => {
        if(u[objPropName] === itemId){
            return {...u, ...newObjProps}
        }
        return u;
    })
}
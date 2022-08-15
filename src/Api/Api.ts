import axios from "axios";
import {PhotosType, ProfileType, UsersType} from "../Redux/Types/types";
import {ResultsCodesCaptchaEnum, ResultsCodesEnum} from "../Redux/ResultsCodesEnumsTypes/ResultsCodesEnumsTypes";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "64b9f8d5-34ac-46d0-8149-fd07b131216c"
    }
});

type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}
type UnfollowResponseType = {
    data: {}
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
type FollowResponseType = {
    data: {}
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
export const UsersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}
        &cout=${pageSize}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/${userId}`)
    },
    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
    },
    getProfile(userId: number){
        return instance.get<boolean>(`profile/` + userId);
    }
}

type PutStatusResponseType = {
    data: {}
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
type PutPhotosResponseType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
type PutProfileResponseType = {
    data: {}
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
export const ProfileAPI = {
    getProfile(userId: number | null){
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number){
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    putStatus(status: string){
        return instance.put<PutStatusResponseType>(`profile/status`, {status: status}).then(res => res.data);
    },
    putPhotos(photosFile: any){
        const formData = new FormData();
        formData.append("image", photosFile);
        return instance.put<PutPhotosResponseType>(`profile/photo`, formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
        }}).then(res => res.data);
    },
    putProfile(profile: ProfileType){
        return instance.put<PutProfileResponseType>(`profile`, {profile: profile}).then(res => res.data);
    }
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultsCodesEnum | ResultsCodesCaptchaEnum
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultsCodesEnum
    messages: Array<string>
}
export const authAPI = {
    Me(){
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string,password: string,rememberMe = false, captcha: null | string = null){
        return instance.post<LoginResponseType>(`auth/login`, {email,password,rememberMe,captcha}).then(res => res.data);
    },
    logout(){
        return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data);
    }
}

type CaptchaResponseType = {
    url: string
}
export const securityAPi = {
    captcha(){
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}


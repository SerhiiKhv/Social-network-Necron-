import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "64b9f8d5-34ac-46d0-8149-fd07b131216c"
    }
});

export const UsersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}
        &cout=${pageSize}`).then(response => {
            return response.data
        })
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    getProfile(userId){
        return instance.get(`profile/` + userId);
    }
}

export const ProfileAPI = {
    getProfile(userId){
        return instance.get(`profile/` + userId);
    },
    getStatus(userId){
        return instance.get(`profile/status/` + userId);
    },
    putStatus(status){
        return instance.put(`profile/status`, {status: status});
    },
    putPhotos(photosFile){
        const formData = new FormData();
        formData.append("image", photosFile);
        return instance.put(`profile/photo`, formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
        }});
    },
    putProfile(profile){
        return instance.put(`profile`, {profile: profile});
    }
}

export const authAPI = {
    Me(){
        return instance.get(`auth/me`);
    },
    login(email,password,rememberMe = false, captcha = null){
        return instance.post(`auth/login`, {email,password,rememberMe,captcha});
    },
    logout(){
        return instance.delete(`auth/login`);
    }
}

export const securityAPi = {
    captcha(){
        return instance.get(`security/get-captcha-url`);
    }
}


export type PostType = {
    id: number
    text: string
    like: number
}
export type ContactsType = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    fullName: string
    contacts: ContactsType
    photos:PhotosType
}
export type UsersType ={
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
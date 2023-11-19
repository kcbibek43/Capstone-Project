export interface Login{
    email: string,
    password: string,
    role? : string
}

export interface Register{
        name: string,
        email: string,
        userName: string,
        password: string,
        role? : string
}

export interface Property {
    id : string,
    location: string,
    landLordId: string,
    rent: number,
    description: string,
    type: string,
    numOfRooms: number,
    isAvailable: boolean,
    availableFrom: string,
    ameneties: Array<string>,
    images: Array<string>
}

export interface GetProperty{
    Id: string,
    Location: string,
    LandLordId: string,
    Rent: number,
    Description: string,
    Type:string,
    NumOfRooms: number,
    IsAvailable: boolean,
    AvailableFrom: string,
    Ameneties: string[
    ],
    Images: string[
    ]
}

export interface UserInfo{
    id: string,
    name: string,
    userId: string,
    userName: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    email: string,
    image: string
}


export interface Reviews{
        id: string,
        propertyId: string,
        review: Array<string>,
        rating: Array<number>,
        userName: Array<string>
}

export interface Appointment{
    id : string,
    landLordId : string,
    tenantId : string,
    from? : Date,
    to? : Date
}

export interface MapResponse{
    type : string,
    features : any[],
    query : any
}

export interface LocationStore{
    id: string,
    propertyId: string,
    longitude: number,
    latitude: number
}

export interface DocumentUrl {
    id: string,
    tenantId: string,
    propertyId: string,
    landlordId : string,
    doc1: string,
    doc2: string,
    isVerified: boolean
}

export interface Message {
        date?: Date,
        from: string,
        message: string
}


export interface Messages{
        id: string,
        tenantId: string,
        landLordId: string,
        messages: Array<Message>
}

import { Types } from "mongoose";

export const clearFilters = (filters: any = {}) => {

    let filtersMapped: any = {
        alive: true
    };

    for (const key in filters) {

        if(filters[key]) {
            if (typeof filters[key] === "string") {
                if (Types.ObjectId.isValid(filters[key])) {
    
                    const objectId = Types.ObjectId(filters[key]);
    
                    if(objectId.toString() == filters[key]) {
                        filters[key] = Types.ObjectId(filters[key]);
                    } else {
                        filters[key] = new RegExp(filters[key], 'gi');
                    }
    
                } else {
                    filters[key] = new RegExp(filters[key], 'gi');
                }
            }
            filtersMapped[key] = filters[key];
        }

    }

    return filtersMapped;
};

export const clearObject = (data: any) => {
    delete data.alive;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.createdBy;
    delete data._id;
    delete data.password;

    return data;
};
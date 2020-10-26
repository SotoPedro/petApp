import { Response, NextFunction } from 'express';


export const filters = (req: any, res: Response, next: NextFunction) => {

    req.query.page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    req.query.limit = isNaN(req.query.limit) ? 15 : Number(req.query.limit);
    req.query.skip = req.query.page * req.query.limit - req.query.limit;

    try {
        req.query.all = JSON.parse(req.query.all);
    } catch (error) {
        req.query.all = false;
    }
    try {
        req.query.populate = JSON.parse(req.query.populate);
    } catch (error) {
        req.query.populate = false;
    }
    // try {
    //     req.query.status = JSON.parse(req.query.status);
    // } catch (error) {
    //     req.query.all = false;
    // }

    let filters: any = { }

    req.query.filters = filters;

    next();
}
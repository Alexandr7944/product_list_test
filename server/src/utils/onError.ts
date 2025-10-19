import {ErrorRequestHandler} from 'express'

export const onError: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status && err.status < 500) {
        console.warn(err.status, err.message);
        return res.status(err.status).send(err.message);
    }
    console.error(err);
    res.status(500).send('Internal Server Error');
}

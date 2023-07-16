import contactService from "../service/contact-service";

const create = async (req, res, next) => {
    try {

        const user = req.user;
        const request = req.body;
        const result = await contactService.create(user, request);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {

        const user = req.user;
        const contactId = req.params.contactId;

        const result = await contactService.get(user, contactId);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {

        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;

        const result = await contactService.update(user, request);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {

        const user = req.user;
        const contactId = req.params.contactId;

        await contactService.remove(user, contactId);
        res.status(200).json({
            data: "OK"
        });

    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.params.name,
            email: req.params.email,
            phone: req.params.phone,
            page: req.params.page,
            size: req.params.size
        };

        const result = await contactService.search(user, request);
        res.status(200).json({
            data: result,
            paging: result.paging
        });

    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
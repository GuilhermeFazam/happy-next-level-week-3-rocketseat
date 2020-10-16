import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'],
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório'),
            latitude: Yup.number().required('Latitude Obrigatório'),
            longitude: Yup.number().required('Longitude Obrigatório'),
            about: Yup.string().required('Sobre Obrigatório').max(300),
            instructions: Yup.string().required('Instuções Obrigatório'),
            opening_hours: Yup.string().required(
                'Horario de abertura Obrigatório',
            ),
            open_on_weekends: Yup.boolean().required(
                'Aberto no Final de semana Obrigatório',
            ),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                }),
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    },
};

import type { FastifyInstance } from "fastify"
import animaisController from "../controllers/animaisController.js"
import type { animalInterface } from "../models/animal.js";



export const routes = (server: FastifyInstance) => {
    server.get('/animais', animaisController.listarAnimais);
    
    server.get <{Params: {id: number}}> ('/animais/:id', animaisController.listarAnimalPorId);

    // http://[::1]:8080/animais/especie?especie=Gato
    server.get <{Querystring: {especie: string}}> ('/animais/especie', {
        schema:{
            querystring: {
                type: 'object',
                properties:{
                    especie: {
                        type: 'string'
                    }
                },
            required: ['especie']},
            
        },
        handler: animaisController.listarAnimalPorEspecie});

    // http://[::1]:8080/animais/idade?idade=4
    server.get <{Querystring: {idade: number}}> ('/animais/idade', {
        schema:{
            querystring:{
                type: 'object',
                properties:{
                    idade:{
                        type: 'number'
                    }
                },
                required:['idade']},
        },
    handler: animaisController.listarAnimalAbaixoIdade}) 

    server.get('/animais/mediaPeso', animaisController.mediaPeso);

    server.post <{Body: animalInterface}> ('/animais',{
        schema:{
            body:{
                type: 'object',
                additionalProperties: false,
                properties:{
                    id:{
                        type:'integer'
                    },
                    nome:{
                        type:'string'
                    },
                    especie:{
                        type:'string'
                    },
                    raca:{
                        type:'string'
                    },
                    idade:{
                        type:'integer'
                    },
                    sexo:{
                        type:'string'
                    },
                    peso:{
                        type:'number'
                    }

                },
                required:[
                    'id',
                    'nome',
                    'especie',
                    'raca',
                    'idade',
                    'sexo',
                    'peso'
                ]
            }
        },
    handler: animaisController.cadastrarAnimal});

    server.put<{
    Params: { id: string };
    Body: Omit<animalInterface, 'id'>;
}>('/animais/:id', {
    schema: {
        params: {
            type: 'object',
            
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        },
        body: {
            type: 'object',
            additionalProperties: false,
            properties: {
                nome: { type: 'string' },
                especie: { type: 'string' },
                raca: { type: 'string' },
                idade: { type: 'integer' },
                sexo: { type: 'string' },
                peso: { type: 'number' }
            },
            required: [
                'nome',
                'especie',
                'raca',
                'idade',
                'sexo',
                'peso'
            ]
        }
    },
    handler: animaisController.alterarAnimal
});

    server.delete <{Params: {id: number}}> ('/animais/:id',{
        schema:{
            params:{
                type: 'object',
                properties:{
                    id:{
                        type: 'integer'
                    }
                },
                required:[
                    'id'
                ]
            }
        }, handler: animaisController.deletarAnimal});
    


    

}
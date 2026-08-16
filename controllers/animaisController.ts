import type { FastifyReply, FastifyRequest } from "fastify";
import animaisList from "../models/animais.js";
import type { animalInterface } from "../models/animal.js";

class animaisController {

    static cadastrarAnimal (
        req: FastifyRequest <{Body:animalInterface}>, 
        res: FastifyReply){
        try {
            const animal=req.body;
            const index: number= animaisList.findIndex(a => a.id===animal.id)
            if (index !== -1){
                return res.status(409).send({message: `Id já cadastrado`})
            }

            if (animal.peso<=0){
                return res.status(400).send({message: `Peso deve ser maior que 0`})
            }

            
            if (animal.idade<0){
                return res.status(400).send({message: `Idade não pode ser negativa`})
            }

            animaisList.push(animal);  

        


            return res.status(201).send(animaisList)

        } catch(erro){
            return res.status(500).send({message: `${erro} - Falha no cadastro` })
        }
    }

    static alterarAnimal (
        req: FastifyRequest <{Body: animalInterface}>,
        res:FastifyReply){
            try{
                const animal=req.body;
                const index: number= animaisList.findIndex(a => a.id===animal.id)

                if (index === -1){
                    return res.status(404).send({message: `Animal não encontrado`})
                }

                if (animal.peso<=0){
                    return res.status(400).send({message: `Peso deve ser maior que 0`})
                }

            
                if (animal.idade<0){
                    return res.status(400).send({message: `Idade não pode ser negativa`})
                }

                animaisList[index]=animal

                return res.status(200).send({
                    message: 'Dados do animal alterados com sucesso',
                    animal
                })

            }
            catch(erro){
                return res.status(500).send({message: `${erro} - Falha ao alterar dados do animal` })
            }


    }

    static deletarAnimal (
        req: FastifyRequest <{Params: {id:number}}>,
        res: FastifyReply
    ){
        try{
            const id: number=req.params.id;
            const index: number= animaisList.findIndex(a => a.id===id)
            const animal = animaisList[index];
            if (!animal) {
                return res.status(404).send({
                 message: "Animal não encontrado"
                });}           
            
            animaisList.splice(index,1);
            return res.status(200).send({
                message:'Animal removido com sucesso',
                animal
            })
            




        } catch(erro){
            return res.status(500).send({message: `${erro} - Falha ao remover animal` })
        }

    }







    static listarAnimais(req: FastifyRequest, res: FastifyReply){

        try{
            const animaisListRes=animaisList;
            return res.status(200).send(animaisListRes);
        }
        catch (erro) {
            return res.status(500).send({message: `${erro} - Falha na requisição` })
        }
    }

    static listarAnimalPorId (req: FastifyRequest <{Params: {id: number}}>, res: FastifyReply){
        

        try{
            const id: number = Number(req.params.id);
            const animalEncontrado= animaisList.filter(a => a.id===id);
            if (animalEncontrado.length==0){
                res.status(404).send({message: "Animal não encontrado"});
            }
            return res.status(200).send(animalEncontrado[0]);

        } catch(erro){
            return res.status(500).send({message: `${erro} - Falha na requisição` })
        }

    }

    static listarAnimalPorEspecie (req: FastifyRequest <{Querystring: {especie: string}}>, res: FastifyReply ){
         
        try{
            const especie: string = req.query.especie;
            const animaisListEspecie= animaisList.filter( a => a.especie==especie);
            if (animaisListEspecie.length==0){
                return res.status(404).send({message: "Nenhum animal registrado com a espécie"});
            }
            return res.status(200).send(animaisListEspecie);
            

        } catch(erro){
            return res.status(500).send({message: `${erro} - Falha na requisição`})
        }
    }

    static listarAnimalAbaixoIdade (
        req: FastifyRequest <{Querystring:{idade:number}}>,
        res: FastifyReply){
            try{


                const idade: number= req.query.idade;
                const animaisListAbaixoIdade= animaisList.filter( a => a.idade<idade);
                if (animaisListAbaixoIdade.length==0){
                    return res.status(404).send({message: `Nenhum animal registrado com idade abaixo de ${idade}`});
                }
                return res.status(200).send(animaisListAbaixoIdade);

            } catch (erro){
                return res.status(500).send({message: `${erro} - Falha na requisição`});

            }


        }

    static mediaPeso (req: FastifyRequest,
        res:FastifyReply){
             try {
                if (animaisList.length === 0) {
                    return res.status(404).send({
                message: 'Nenhum animal cadastrado'
                    });
                    }

                const pesoTotal = animaisList.reduce(
                (x, a) => x + a.peso,0);

                const mediaPeso = pesoTotal / animaisList.length;

                return res.status(200).send({
                    mediaPeso: Number(mediaPeso.toFixed(2))});

                } catch (erro) {
            return res.status(500).send({message: `${erro} - Falha na requisição`});
    }
    }


}

export default animaisController;
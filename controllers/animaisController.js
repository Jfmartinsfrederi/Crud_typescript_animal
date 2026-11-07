import animais from "../models/animais.js";
class animaisController {
    static listarAnimais(req, res) {
        try {
            const animaisList = animais;
            return res.status(200).send(animaisList);
        }
        catch (erro) {
            return res.status(500).send({ message: `${erro} - Falha na requisição` });
        }
    }
}
export default animaisController;
//# sourceMappingURL=animaisController.js.map
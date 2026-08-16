import animaisController from "../controllers/animaisController.js";
export const routes = (server) => {
    server.get('/animais', animaisController.listarAnimais);
};
//# sourceMappingURL=routes.js.map
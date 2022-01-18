import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;
    let newUser = {};
    try {
      newUser = this.createUserUseCase.execute({ name, email });
    } catch (error) {
      console.log(error.name, error.message);
      if (error.message === "Mensagem do erro") {
        return response.status(400).json({ error: error.message }).send();
      }
    }

    return response.status(201).json(newUser).send();
  }
}

export { CreateUserController };

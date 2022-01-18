import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    const users = [];

    try {
      users.push(this.listAllUsersUseCase.execute({ user_id }));
    } catch (error) {
      if (error.message === "Credential failed!") {
        return response.status(400).json({ error: error.message }).send();
      }
    }

    return response.json(users[0]).send();
  }
}

export { ListAllUsersController };

import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    let user;

    try {
      user = this.showUserProfileUseCase.execute({ user_id });
    } catch (error) {
      user = undefined;
    }

    if (!user) {
      return response.status(404).json({ error: "Not found" }).send();
    }
    return response.json(user).send();
  }
}

export { ShowUserProfileController };

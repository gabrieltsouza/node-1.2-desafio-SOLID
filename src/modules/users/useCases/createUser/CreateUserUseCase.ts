import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);
    if (!name) {
      throw new Error("Name is mandatory!");
    }
    if (!email) {
      throw new Error("Email is mandatory!");
    }

    if (userAlreadyExists) {
      throw new Error("Mensagem do erro");
    }
    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: IUsersRepository;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe("Send Forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "123435",
      email: "test@test.com.br",
      name: "User Test",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test@test.com.br");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not to be able to send an email if user not not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("test2@test.com.br")
    ).rejects.toEqual(new AppError("User does not exists "));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "123435",
      email: "test3@test.com.br",
      name: "User Test",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test3@test.com.br");

    expect(generateTokenMail).toBeCalled();
  });
});

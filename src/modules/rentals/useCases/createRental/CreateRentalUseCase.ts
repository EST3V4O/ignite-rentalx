import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findByOpenRentalByCar(
      car_id
    );

    if (carUnavailable) throw new AppError("Car is unavailable");

    const retalOpenToUser = await this.rentalsRepository.findByOpenRentalByUser(
      user_id
    );

    if (retalOpenToUser)
      throw new AppError("There's a rental in progress for user!");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };

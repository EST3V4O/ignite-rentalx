import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      brand: "Brand",
      license_plate: "ABC1234",
      fine_amount: 60,
      daily_rate: 100,
      category_id: "",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description car",
        brand: "Brand",
        license_plate: "ABC1234",
        fine_amount: 60,
        daily_rate: 100,
        category_id: "",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description car",
        brand: "Brand",
        license_plate: "ABC1234",
        fine_amount: 60,
        daily_rate: 100,
        category_id: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description car",
      brand: "Brand",
      license_plate: "ABCD1234",
      fine_amount: 60,
      daily_rate: 100,
      category_id: "",
    });

    expect(car.available).toBe(true);
  });
});

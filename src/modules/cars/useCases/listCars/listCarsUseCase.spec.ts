import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./listCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should to be able list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Card description",
      daily_rate: 110.0,
      license_plate: "DEF-8108",
      fine_amount: 40,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should to be able list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Card description",
      daily_rate: 110.0,
      license_plate: "DEF-8108",
      fine_amount: 40,
      brand: "Car brand test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car brand test",
    });

    expect(cars).toEqual([car]);
  });
});

import { v4 as uuidv4 } from "uuid";
import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async createProperty(data: {
    name: string;
    description: string;
    maxGuests: number;
    basePricePerNight: number;
  }): Promise<Property> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("O nome da propriedade é obrigatório.");
    }
    if (data.maxGuests == null || data.maxGuests <= 0) {
      throw new Error("A capacidade máxima deve ser maior que zero.");
    }
    if (data.basePricePerNight == null) {
      throw new Error("O preço base por noite é obrigatório.");
    }

    const property = new Property(
      uuidv4(),
      data.name,
      data.description,
      data.maxGuests,
      data.basePricePerNight
    );
    await this.propertyRepository.save(property);
    return property;
  }
}

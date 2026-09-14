import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa";
    entity.description = "Descrição";
    entity.maxGuests = 4;
    entity.basePricePerNight = 200;

    const property = PropertyMapper.toDomain(entity);

    expect(property).toBeInstanceOf(Property);
    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa");
    expect(property.getDescription()).toBe("Descrição");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = new PropertyEntity();
    entity.id = "1";

    expect(() => PropertyMapper.toDomain(entity)).toThrow(
      "Os campos obrigatórios não foram preenchidos."
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 200);
    const entity = PropertyMapper.toPersistence(property);

    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe("1");
    expect(entity.name).toBe("Casa");
    expect(entity.description).toBe("Descrição");
    expect(entity.maxGuests).toBe(4);
    expect(entity.basePricePerNight).toBe(200);
  });
});

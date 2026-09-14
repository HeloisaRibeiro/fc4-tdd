import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {
  const makeCompleteEntity = (): BookingEntity => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "p1";
    propertyEntity.name = "Casa";
    propertyEntity.description = "Descrição";
    propertyEntity.maxGuests = 4;
    propertyEntity.basePricePerNight = 200;

    const guestEntity = new UserEntity();
    guestEntity.id = "u1";
    guestEntity.name = "Maria";

    const entity = new BookingEntity();
    entity.id = "b1";
    entity.property = propertyEntity;
    entity.guest = guestEntity;
    entity.startDate = new Date("2024-12-20");
    entity.endDate = new Date("2024-12-25");
    entity.guestCount = 2;
    entity.totalPrice = 1000;
    entity.status = "CONFIRMED";
    return entity;
  };

  it("deve converter BookingEntity em Booking corretamente", () => {
    const booking = BookingMapper.toDomain(makeCompleteEntity());

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("b1");
    expect(booking.getGuest().getId()).toBe("u1");
    expect(booking.getProperty().getId()).toBe("p1");
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getTotalPrice()).toBe(1000);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    expect(() => BookingMapper.toDomain(new BookingEntity())).toThrow(
      "Os campos obrigatórios não foram preenchidos."
    );
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("p1", "Casa", "Descrição", 4, 200);
    const guest = new User("u1", "Maria");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );
    const booking = new Booking("b1", property, guest, dateRange, 2);

    const entity = BookingMapper.toPersistence(booking);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("b1");
    expect(entity.guest.id).toBe("u1");
    expect(entity.property.id).toBe("p1");
    expect(entity.guestCount).toBe(2);
    expect(entity.status).toBe("CONFIRMED");
  });
});

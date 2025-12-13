jest.mock("../models/Vehicle.model", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Vehicle = require("../models/Vehicle.model");
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle.controller");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("vehicle.controller", () => {
  let res;
  let next;

  beforeEach(() => {
    res = buildRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createVehicle", () => {
    const payload = {
      plateNumber: "AB-123-CD",
      brand: "Volvo",
      model: "FH",
      vehicleType: "Truck",
      fuelType: "Diesel",
      maxLoad: 10,
    };

    it("creates a new vehicle when the plate number is unique", async () => {
      Vehicle.findOne.mockResolvedValue(null);
      Vehicle.create.mockResolvedValue({ ...payload, _id: "veh-1" });

      const req = { body: payload };
      await createVehicle(req, res, next);

      expect(Vehicle.findOne).toHaveBeenCalledWith({
        plateNumber: payload.plateNumber,
      });
      expect(Vehicle.create).toHaveBeenCalledWith(payload);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ...payload, _id: "veh-1" });
      expect(next).not.toHaveBeenCalled();
    });

    it("bubbles an error when the plate number already exists", async () => {
      Vehicle.findOne.mockResolvedValue({ _id: "existing" });

      const req = { body: payload };
      await createVehicle(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledTimes(1);
      const forwardedError = next.mock.calls[0][0];
      expect(forwardedError).toEqual(
        expect.objectContaining({
          message:
            "Un véhicule avec cette plaque d'immatriculation existe déjà.",
          status: 400,
        })
      );
      expect(Vehicle.create).not.toHaveBeenCalled();
    });
  });

  describe("getVehicles", () => {
    it("returns vehicles sorted by creation date desc", async () => {
      const vehicles = [{ _id: "1" }, { _id: "2" }];
      const sortMock = jest.fn().mockResolvedValue(vehicles);
      Vehicle.find.mockReturnValue({ sort: sortMock });

      const req = {};
      await getVehicles(req, res, next);

      expect(Vehicle.find).toHaveBeenCalledWith();
      expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(vehicles);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("getVehicleById", () => {
    it("returns 404 when the vehicle is not found", async () => {
      Vehicle.findById.mockResolvedValue(null);

      const req = { params: { id: "missing" } };
      await getVehicleById(req, res, next);

      expect(Vehicle.findById).toHaveBeenCalledWith("missing");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Véhicule non trouvé.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("returns the vehicle when found", async () => {
      const vehicle = { _id: "veh-2", plateNumber: "AA-000-AA" };
      Vehicle.findById.mockResolvedValue(vehicle);

      const req = { params: { id: "veh-2" } };
      await getVehicleById(req, res, next);

      expect(Vehicle.findById).toHaveBeenCalledWith("veh-2");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(vehicle);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("updateVehicle", () => {
    it("updates the vehicle when it exists", async () => {
      Vehicle.findById.mockResolvedValue({ _id: "veh-3" });
      Vehicle.findByIdAndUpdate.mockResolvedValue({
        _id: "veh-3",
        maxLoad: 15,
      });

      const req = { params: { id: "veh-3" }, body: { maxLoad: 15 } };
      await updateVehicle(req, res, next);

      expect(Vehicle.findById).toHaveBeenCalledWith("veh-3");
      expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
        "veh-3",
        { maxLoad: 15 },
        {
          new: true,
          runValidators: true,
        }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id: "veh-3", maxLoad: 15 });
      expect(next).not.toHaveBeenCalled();
    });

    it("returns 404 when the vehicle to update is missing", async () => {
      Vehicle.findById.mockResolvedValue(null);

      const req = { params: { id: "veh-4" }, body: { maxLoad: 20 } };
      await updateVehicle(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Véhicule non trouvé pour la modification.",
      });
      expect(Vehicle.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("deleteVehicle", () => {
    it("deletes the vehicle when present", async () => {
      Vehicle.findByIdAndDelete.mockResolvedValue({ _id: "veh-5" });

      const req = { params: { id: "veh-5" } };
      await deleteVehicle(req, res, next);

      expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith("veh-5");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Véhicule supprimé avec succès",
        id: "veh-5",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("returns 404 when the vehicle to delete is missing", async () => {
      Vehicle.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: "veh-6" } };
      await deleteVehicle(req, res, next);

      expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith("veh-6");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Véhicule non trouvé pour la suppression.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});

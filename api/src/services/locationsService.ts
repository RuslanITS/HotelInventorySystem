import * as fileDb from "../helpers/fileDb";
import { Location, LocationApi } from "../type";

export const getAll = async (): Promise<Location[]> => {
  return await fileDb.getLocations();
};

export const getById = async (
  id: string,
): Promise<Location | null> => {
  const locations = await fileDb.getLocations();

  return locations.find((location) => location.id === id) || null;
};

export const create = async (
  locationData: LocationApi,
): Promise<Location> => {
  const locations = await fileDb.getLocations();

  const newLocation: Location = {
    id: crypto.randomUUID(),
    ...locationData,
  };

  locations.push(newLocation);

  await fileDb.saveLocations(locations);

  return newLocation;
};

export const update = async (
  id: string,
  locationData: LocationApi,
): Promise<Location | null> => {
  const locations = await fileDb.getLocations();

  const location = locations.find(
    (location) => location.id === id,
  );

  if (!location) {
    return null;
  }

  location.name = locationData.name;
  location.description = locationData.description;

  await fileDb.saveLocations(locations);

  return location;
};

export const remove = async (
  id: string,
): Promise<boolean> => {
  const locations = await fileDb.getLocations();

  const index = locations.findIndex(
    (location) => location.id === id,
  );

  if (index === -1) {
    return false;
  }

  locations.splice(index, 1);

  await fileDb.saveLocations(locations);

  return true;
};
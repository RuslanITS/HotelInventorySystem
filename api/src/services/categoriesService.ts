import * as fileDb from "../helpers/fileDb";
import { Category, CategoryApi } from "../type";

export const getAll = async (): Promise<Category[]> => {
  return await fileDb.getCategories();
};

export const getById = async (
  id: string,
): Promise<Category | null> => {
  const categories = await fileDb.getCategories();

  return categories.find((category) => category.id === id) || null;
};

export const create = async (
  categoryData: CategoryApi,
): Promise<Category> => {
  const categories = await fileDb.getCategories();

  const newCategory: Category = {
    id: crypto.randomUUID(),
    ...categoryData,
  };

  categories.push(newCategory);

  await fileDb.saveCategories(categories);

  return newCategory;
};

export const update = async (
  id: string,
  categoryData: CategoryApi,
): Promise<Category | null> => {
  const categories = await fileDb.getCategories();

  const category = categories.find(
    (category) => category.id === id,
  );

  if (!category) {
    return null;
  }

  category.name = categoryData.name;
  category.description = categoryData.description;

  await fileDb.saveCategories(categories);

  return category;
};

export const remove = async (
  id: string,
): Promise<boolean> => {
  const categories = await fileDb.getCategories();

  const index = categories.findIndex(
    (category) => category.id === id,
  );

  if (index === -1) {
    return false;
  }

  categories.splice(index, 1);

  await fileDb.saveCategories(categories);

  return true;
};
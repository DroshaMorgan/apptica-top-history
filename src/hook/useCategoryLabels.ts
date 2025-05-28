import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import subCategoryMap from "../helpers/subCategoryMap";

const API_KEY = import.meta.env.VITE_API_KEY;

type Category = {
  id: number;
  name: string;
  categories: Category[];
};

const findCategoryNameById = (
  categories: Category[],
  targetId: string
): string | null => {
  for (const category of categories) {
    if (String(category.id) === targetId) {
      return category.name;
    }

    if (category.categories?.length) {
      const found = findCategoryNameById(category.categories, targetId);
      if (found) return found;
    }
  }

  return null;
};

export function useCategoryLabels() {
  const { data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=${API_KEY}`
      );
      return res.data.data;
    },
  });

  const getLabel = (categoryId: string, subCategoryId: string) => {
    if (!data) return null;

    const categoryName =
      findCategoryNameById(data, categoryId) ?? `Category ${categoryId}`;
    const subCategoryName =
      subCategoryMap[Number(subCategoryId)] ?? `SubCategory ${subCategoryId}`;

    return `${categoryName} - ${subCategoryName}`;
  };

  return { getLabel };
}

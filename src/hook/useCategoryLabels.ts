import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import subCategoryMap from "../helpers/subCategoryMap";

const API_KEY = import.meta.env.VITE_API_KEY;

type Category = {
  id: number;
  name: string;
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
    const categoryName =
      data?.find((category) => String(category.id) === categoryId)?.name ??
      `Category ${categoryId}`;
    const subCategoryName =
      subCategoryMap[Number(subCategoryId)] ?? `SubCategory ${subCategoryId}`;
    return `${categoryName} - ${subCategoryName}`;
  };

  return { getLabel };
}

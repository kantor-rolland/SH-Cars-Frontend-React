import { useEffect } from 'react';
import Papa from 'papaparse';

// ezek az adatok vannak a csv fileban
interface CarData {
  make: string;
  model: string;
  year: string;
}

interface LoadDataFromCSVProps {
  onDataLoaded: (
    csvData: CarData[],
    brands: string[],
    modelsByBrand: Record<string, string[]>,
    initialModels?: string[],
  ) => void;
  initialData?: { brand: string; name: string; fuelType: string; transmission: string } | null;
  setLoading: (loading: boolean) => void;
  setText: (text: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedModel: (model: string) => void;
  setSelectedFuel: (fuel: string) => void;
  setSelectedTransmission: (transmission: string) => void;
}

export default function LoadDataFromCSV({
  initialData = null,
  onDataLoaded,
  setLoading,
  setText,
  setSelectedBrand,
  setSelectedModel,
  setSelectedFuel,
  setSelectedTransmission,
}: LoadDataFromCSVProps) {
  useEffect(() => {
    Papa.parse('/resources/2024.csv', {
      download: true,
      complete: (result) => {
        const parsedData = result.data as CarData[];
        const uniqueBrands = Array.from(new Set(parsedData.map((item) => item.make)));
        const modelsByBrand: Record<string, string[]> = {};

        uniqueBrands.forEach((brand) => {
          modelsByBrand[brand] = parsedData.filter((item) => item.make === brand).map((item) => item.model);
        });

        let text = 'addCarMessage';
        let initialModels: string[] = [];

        // ha van initialDatank beallitjuk a select mezoit
        if (initialData) {
          text = 'editCarMessage';
          initialModels = modelsByBrand[initialData.brand] || [];

          setSelectedBrand(initialData.brand);
          setSelectedModel(initialData.name);
          setSelectedFuel(initialData.fuelType);
          setSelectedTransmission(initialData.transmission);
          setText(text);
        }

        onDataLoaded(parsedData, uniqueBrands, modelsByBrand, initialModels);
        setLoading(false);
      },
      header: true,
    });
  }, [initialData, onDataLoaded, setLoading]);

  return null;
}

import { useQuery } from '@tanstack/react-query';
import { extraService } from '../../api/ExtraService';
import { ExtraOverviewDTO } from '../../model/dto/extra/extraOverviewDTO';

export default function useFindCarsByQuery(query: string) {
  console.log('USE FIND Extras BY QUERY');
  console.log({ query });

  return useQuery<ExtraOverviewDTO[]>({
    queryKey: ['extras', query], // cars + query
    // a query tartalma fuggvenyeben
    queryFn: query === '' ? extraService.getAllExtras : () => extraService.getExtrasByName(query),
  });
}

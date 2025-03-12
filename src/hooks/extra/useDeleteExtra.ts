import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { queryClient } from '../../query/common.query';
import { extraService } from '../../api/ExtraService';

// kiszedve kulon
export default function useDeleteExtra() {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => extraService.deleteExtra(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extras'] });
      console.log(t('deleteExtraMessageSuccessfully'));
      // navigate('/extras');
    },
    onError: (error) => {
      console.error(error);
      console.error(t('deleteExtraMessageError'));
      console.log(t('deleteExtraMessageError'));
    },
  });
}

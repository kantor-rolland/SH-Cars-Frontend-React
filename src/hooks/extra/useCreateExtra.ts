import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { queryClient } from '../../query/common.query';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';
import { extraService } from '../../api/ExtraService';

export default function useCreateExtra() {
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: (extraData: ExtraInDTO) => extraService.createExtra(extraData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extras'] });
      console.log('Sikeres letrehooozas');
      // alert(t('addExtraMessageSuccessfully'));
      console.info(t('addExtraMessageSuccessfully'));
      // navigate('/extras');
    },
    onError: (error) => {
      console.error('Error creating car:', error);
      console.log(t('addExtraMessageError'));
    },
  });
}

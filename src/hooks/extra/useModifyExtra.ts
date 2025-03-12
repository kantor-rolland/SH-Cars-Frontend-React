import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { queryClient } from '../../query/common.query';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';
import { extraService } from '../../api/ExtraService';

export default function useModifyExtra(extraId: number) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (extraData: ExtraInDTO) => extraService.updateExtra(extraId, extraData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extra', extraId] });
      // alert(t('editCarMessageSuccessfully'));
      console.log(t('editCarMessageSuccessfully'));
      console.info('Extra modified successfully');
      navigate(`/extras/${extraId}`);
    },
    onError: (error) => {
      console.error('Error updating extra:', error);
      console.log('Failed to update extra.');

      console.error(t('editCarMessageError'), error);
      console.log('Failed to update extra.');
    },
  });
}

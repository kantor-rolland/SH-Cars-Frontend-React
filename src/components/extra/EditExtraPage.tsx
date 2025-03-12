import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';
import { extraService } from '../../api/ExtraService';
import useModifyExtra from '../../hooks/extra/useModifyExtra';
import ExtraForm from './ExtraForm';

export default function EditExtraPage() {
  const { extraId } = useParams<{ extraId: string }>();
  const [initialData, setInitialData] = useState<ExtraInDTO | null>(null);

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        const extra = await extraService.getExtraById(Number(extraId));
        setInitialData(extra);
      } catch (error) {
        console.error('Error fetching extra details:', error);
        console.log('Failed to load extra details.');
        console.log(t('getCarMessageError'));
      }
    };

    fetchExtraData();
  }, [extraId]);

  const useModifyExtraMutation = useModifyExtra(Number(extraId));

  const handleUpdateExtra = (extraData: ExtraInDTO) => {
    useModifyExtraMutation.mutate(extraData);
  };

  return initialData ? (
    <ExtraForm initialData={initialData} onSubmit={handleUpdateExtra} />
  ) : (
    <p>{t('loadingExtraDataMessage')}</p>
  );
}

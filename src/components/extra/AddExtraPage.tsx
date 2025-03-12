import { useNavigate } from 'react-router-dom';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';
import ExtraForm from './ExtraForm';
import useCreateExtra from '../../hooks/extra/useCreateExtra';

export default function AddExtraPage() {
  const createExtraMutation = useCreateExtra();
  const navigate = useNavigate();

  const handleAddExtra = (extraData: ExtraInDTO) => {
    createExtraMutation.mutate(extraData);
    navigate('/extras');
  };

  return <ExtraForm onSubmit={handleAddExtra} />;
}

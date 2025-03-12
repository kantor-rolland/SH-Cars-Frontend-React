import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation(); // nemzetkoziesiteshez

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>{t('welcomeMessage')}</h1>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="../../public/resources/images/logo.png"
          alt="Logo"
          style={{
            width: 250,
            height: 250,
          }}
        />
      </div>
    </>
  );
}

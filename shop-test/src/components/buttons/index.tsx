import './styles.css'

interface typeButton {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export function Buttons({ text, onClick, loading }: typeButton) {
  return (
    <div onClick={()=> !loading && onClick()} className="btn-container">
      {loading ? 'Cargando' : text}
    </div>
  );
}

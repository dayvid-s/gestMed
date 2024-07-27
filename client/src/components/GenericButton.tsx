
interface GenericButtonProps {
  title: string;
  onClick: () => void;
}

export function GenericButton({ title, onClick }: GenericButtonProps) {
  return (
    <button className='border-2 rounded-lg  h-10 bg-[#025959] hover:bg-[#078b8b] text-white text-2xl p-3 items-center flex justify-center' onClick={onClick}>
      {title}
    </button>
  );
}
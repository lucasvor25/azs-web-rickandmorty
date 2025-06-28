import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
    to?: string;
};

export default function BackButton({ to = '/' }: Props) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(to);
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`flex items-center gap-2 mb-4 cursor-pointer text-white text-base hover:underline`}
        >
            <FaArrowLeft />
        </button>
    );
}
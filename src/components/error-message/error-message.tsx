import css from './error-message.module.css';
import { NameSpace } from "../../constants";
import { useAppSelector } from "../../hooks";

function ErrorMessage(): React.JSX.Element | null {
	const error = useAppSelector((state) => state[NameSpace.Error].error);

	return (error)
		? <div className={css['error-message']}>{error}</div>
		: null;
}

export default ErrorMessage;

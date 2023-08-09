import { store } from "../store";
import { clearErrorAction } from "../store/api-actions";
import { errorActions } from "../store/errors/errors.slice";

const processErrorHandle = (message: string): void => {
	store.dispatch(errorActions.setError(message));
	store.dispatch(clearErrorAction());
}

export {processErrorHandle};


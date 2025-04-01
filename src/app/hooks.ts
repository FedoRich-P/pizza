import { AppDispatch, RootState } from './store.ts';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

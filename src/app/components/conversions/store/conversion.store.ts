import { createStore, withProps, select } from '@ngneat/elf';
import { Conversion } from 'src/app/modelo/conversions';

export interface ConversionsState {
  conversions: Conversion[];
}

const initialState: ConversionsState = {
  conversions: [],
};

const conversionsStore = createStore(
  { name: 'conversion' },
  withProps<ConversionsState>(initialState)
);

export const conversions$ = conversionsStore.pipe(select((state) => state.conversions));

export default conversionsStore; // Exportando por defecto

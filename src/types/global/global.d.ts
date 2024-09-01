import messages from '../../../messages/pl.json';

type Messages = typeof messages;

declare global {
  interface IntlMessages extends Messages {}
}

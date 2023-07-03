export const COMMON_STATUS_MESSAGES = {
  ERROR: {
    EMPTY_FIELD: (fieldName?: string) =>
      fieldName
        ? `Pole "${fieldName}" nie może być puste.`
        : 'To pole nie może być puste.',
    TOO_SHORT_PASSWORD: (length: number) =>
      `Długość hasła ma być ${length} lub więcej.`,
  },
};

export const USER_STATUS_MESSAGES = {
  SUCCESS: {
    CREATED: 'Użytkownik został utworzony.',
    UPDATED: 'Użytkownik został zaktualizowany.',
    DELETED: 'Użytkownik został usunięty.',
  },
  ERROR: {
    CREDENTIALS_ARE_NOT_VALID: 'Niepoprawny login lub hasło.',
    DATABASE_ERROR_WHILE_DELETE:
      'Nie udało się usunąć użytkownika z bazy danych.',
    DATABASE_ERROR_WHILE_FIND:
      'Błąd bazy danych przy wyszukiwaniu użytkownika.',
    DATABASE_ERROR_WHILE_SAVE:
      'Nie udało się zapisać użytkownika do bazy danych.',
    DUPLICATE_USER: 'Użytkownik z taką nazwą już istnieje.',
    EMPTY_NAME: 'Użytkownik nie może mieć pustą nazwę',
    NOT_AUTHORIZED: 'Użytkownik nie był zalogowany.',
    USER_NOT_FOUND: 'Użytkownik nie był znaleziony.',
  },
};

export const NEWS_STATUS_MESSAGES = {
  SUCCESS: {
    DELETE: 'Wiadomość została usunięta.',
  },
  ERROR: {
    DATABASE_ERROR_WHILE_DELETE:
      'Nie udało się usunąć wiadomości z bazy danych.',
    DATABASE_ERROR_WHILE_FIND: 'Błąd bazy danych przy wyszukiwaniu wiadomości.',
    DATABASE_ERROR_WHILE_SAVE:
      'Nie udało się zapisać wiadomość do bazy danych.',
    NEWS_NOT_FOUND:
      'Wiadomość nie była znaleziona albo nie masz uprawnień do jej edycji',
  },
};

export const ITEM_TYPE_COLORS = {
  any: 'grey',
  boolean: 'light-blue',
  number: 'green',
  date: 'purple',
  string: 'blue',
  integer: 'teal',
  array: 'orange',
  object: 'lime'
};

export const POSSIBLE_ITEM_CONDITIONS = [
  {
    key: 'default',
    displayName: 'default'
  },
  {
    key: 'minimum',
    displayName: 'min'
  },
  {
    key: 'maximum',
    displayName: 'max'
  },
  {
    key: 'minLength',
    displayName: 'minLength'
  },
  {
    key: 'maxLength',
    displayName: 'maxLength'
  },
  {
    key: 'uniqueItems',
    displayName: 'uniqueItems'
  }
];

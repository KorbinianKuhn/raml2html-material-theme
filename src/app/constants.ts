export const ITEM_TYPE_COLORS = {
  any: 'grey',
  default: 'grey',
  boolean: 'light-blue',
  number: 'green',
  date: 'purple',
  string: 'blue',
  integer: 'teal',
  array: 'orange',
  object: 'lime',
  union: 'grey',
  nil: 'grey',
  file: 'grey'
};

export const POSSIBLE_ITEM_CONDITIONS = [
  {
    key: 'default',
    displayName: 'default'
  },
  {
    key: 'enum',
    displayName: 'one of'
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

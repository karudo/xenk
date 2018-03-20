import {createQuery, types, field, inlineFragment} from './src'

const queryField = field(
  'post',
  [
    'id',
    'title',
    'text',
    field('author', ['name', 'email']),
    inlineFragment('ExtendedPest', ['ex', 'info'])
  ],
  {id: 'postid'}
);

const query = createQuery(queryField, {
  postid: types.id.notNull
});

(console as any).log(query)



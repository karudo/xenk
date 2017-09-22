# xenk

## A GraphQL query builder.

### examples

```javascript
import {createQuery, field, types} from 'xenk'

const queryField = field(
  'post', 
  [
    'id',
    'title',
    'text',
    field('author', ['name', 'email'])
  ], 
  {id: 'postid'}
);

const query = createQuery(queryField, {
  postid: types.id.notNull
});

console.log(query)
/*
query ($postid: ID!) {
  post (id: $id) {
    id
    title
    text
    author {
      name
      email
    }
  }
}
*/

```

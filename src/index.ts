import * as types from './types';
export {types};

import {XenkTypeFunction} from './types';

export type XenkField = string | XenkFieldPrepack;

export type XenkArgs = {
  [key: string]: string
};

export type XenkVariables = {
  [key: string]: XenkTypeFunction
};

export type XenkFieldPrepack = {
  select: string,
  fields: XenkField[],
  args: XenkArgs
};

export function field (select: string, fields?: XenkField[], args?: XenkArgs): XenkFieldPrepack {
  return {
    select: select,
    fields,
    args
  };
}

function stringifyField (field: XenkFieldPrepack): string {
  let str = field.select;
  if (field.args) {
    str += ` (${Object.keys(field.args).map(a => `${a}: $${field.args[a]}`).join(`, `)})`;
  }
  if (field.fields) {
    const fields = field.fields.map(f => {
      return typeof f === 'string' ? f : stringifyField(f);
    });
    str += ` {\n${fields.join('\n')}\n}`;
  }
  return str;
}

function createGraphQLQuery (queryType: string, field: XenkFieldPrepack, variables?: XenkVariables): string {
  let varsStr = '';
  if (variables) {
    varsStr = `(${Object.keys(variables).map(k => `$${k}: ${variables[k]()}`).join(', ')}) `;
  }
  return `${queryType} ${varsStr}{\n${stringifyField(field)}\n}`;
}

export function createQuery(field: XenkFieldPrepack, variables?: XenkVariables) {
  return createGraphQLQuery('query', field, variables);
}

export function createMutation(field: XenkFieldPrepack, variables?: XenkVariables) {
  return createGraphQLQuery('mutation', field, variables);
}

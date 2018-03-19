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
  name: string,
  subFields: XenkField[],
  args: XenkArgs
};

export function field (fieldName: string, subFields?: XenkField[], args?: XenkArgs): XenkFieldPrepack {
  return {
    name: fieldName,
    subFields,
    args
  };
}

function stringifyField ({name, subFields, args}: XenkFieldPrepack): string {
  let str = name;
  if (args) {
    str += ` (${Object.keys(args).map(argName => `${argName}: $${args[argName]}`).join(`, `)})`;
  }
  if (subFields) {
    const fields = subFields.map(f => typeof f === 'string' ? f : stringifyField(f));
    str += ` {\n${fields.join('\n')}\n}`;
  }
  return str;
}

function createGraphQLQuery (
  queryType: string,
  field: XenkFieldPrepack,
  variables?: XenkVariables,
  name?: string
): string {
  let varsStr = '';
  if (variables) {
    varsStr = `(${Object.keys(variables).map(k => `$${k}: ${variables[k]()}`).join(', ')}) `;
  }
  return `${queryType} ${name || ''}${varsStr}{\n${stringifyField(field)}\n}`;
}

export function createQuery(field: XenkFieldPrepack, variables?: XenkVariables, name?: string) {
  return createGraphQLQuery('query', field, variables, name);
}

export function createMutation(field: XenkFieldPrepack, variables?: XenkVariables, name?: string) {
  return createGraphQLQuery('mutation', field, variables, name);
}

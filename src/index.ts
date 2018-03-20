import * as types from './types';
export {types};

import {XenkTypeFunction} from './types';

export type XenkField = string | XenkFieldPrepack;

export type XenkInlineFragment = XenkInlineFragmentPrepack;

export type XenkSubFieldUnion = XenkField | XenkInlineFragment;

export type XenkSubField = XenkSubFieldUnion | XenkSubFieldUnion[];

export type XenkArgs = {
  [key: string]: string
};

export type XenkVariables = {
  [key: string]: XenkTypeFunction
};

export class XenkFieldPrepack {
  public name: string;
  public subFields: XenkSubField;
  public args: XenkArgs;
  constructor (name, subFields, args) {
    this.name = name;
    this.subFields = subFields;
    this.args = args
  }

  toString () {
    let str = this.name;
    if (this.args) {
      str += ` (${Object.keys(this.args).map(argName => `${argName}: $${this.args[argName]}`).join(`, `)})`;
    }
    if (this.subFields) {
      const subFieldsArr = Array.isArray(this.subFields) ? this.subFields : [this.subFields];
      const fields = subFieldsArr.map(f => typeof f === 'string' ? f : f.toString());
      str += ` {\n${fields.join('\n')}\n}`;
    }
    return str;
  }
}

export class XenkInlineFragmentPrepack {
  public type: string;
  public fields: [XenkField];
  constructor (type, fields) {
    this.type = type;
    this.fields = fields;
  }

  toString () {
    return `... ${this.type} on {\n${this.fields.map(f => f.toString()).join('\n')}\n}\n`;
  }
}

export function field (name: string, subFields?: XenkSubField, args?: XenkArgs): XenkFieldPrepack {
  return new XenkFieldPrepack(name, subFields, args)
}

export function inlineFragment (type: string, fields: XenkField[]): XenkInlineFragmentPrepack {
  return new XenkInlineFragmentPrepack(type, fields)
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
  return `${queryType} ${name || ''}${varsStr}{\n${field.toString()}\n}`;
}

export function createQuery(field: XenkFieldPrepack, variables?: XenkVariables, name?: string) {
  return createGraphQLQuery('query', field, variables, name);
}

export function createMutation(field: XenkFieldPrepack, variables?: XenkVariables, name?: string) {
  return createGraphQLQuery('mutation', field, variables, name);
}

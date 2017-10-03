
export interface XenkTypeFunction {
  (): string;
}

export interface XenkVariableType extends XenkTypeFunction {
  notNull: XenkTypeFunction;
}

function createScalar (scalarName: string): XenkVariableType {
  const scalar: XenkVariableType = function () {
    return scalarName;
  } as XenkVariableType;

  Object.defineProperty(scalar, 'notNull', {
    get() {
      return () => `${scalar()}!`;
    }
  });
  return scalar;
}


export const int = createScalar('Int');

export const float = createScalar('Float');

// tslint:disable-next-line:variable-name
export const string = createScalar('String');

// tslint:disable-next-line:variable-name
export const boolean = createScalar('Boolean');

export const id = createScalar('ID');

export function list(listItemType: XenkTypeFunction): XenkVariableType {
  return createScalar(`[${listItemType()}]`);
}

export function scalar(scalarName: string): XenkVariableType {
  return createScalar(scalarName);
}

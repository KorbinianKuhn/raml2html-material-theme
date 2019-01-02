export interface IRaml {
  securitySchemes: {
    [key: string]: IRamlSecurityScheme;
  };
  title: string;
  version: string;
  baseUri: string;
  baseUriParameters: IRamlItem[];
  protocols: string[];
  mediaType: string[];
  securedBy: Array<{
    schemeName: string;
  }>;
  resources: IRamlResource[];
  documentation: IRamlDocumentation[];
}

export interface IRamlDocumentation {
  title: string;
  content: string;
  uniqueId: string;
}

export interface IRamlSecurityScheme {
  type: string;
  name: string;
  displayName: string;
  description: string;
  settings: {
    [key: string]: any;
  };
  describedBy: {
    headers?: IRamlItem[];
    queryParameters?: IRamlItem[];
    responses?: IRamlResponse[];
  };
}

export interface IRamlItem {
  key: string;
  name: string;
  displayName: string;
  description?: string;
  required?: boolean;
  type: string;
  typePropertyKind: string;
  default: any;
  examples?: IRamlExample[];
  enum?: any[];
  properties?: IRamlItem[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  uniqueItems?: boolean;
  pattern: string;
  additionalProperties?: boolean;
}

export interface IRamlExample {
  name: string;
  displayName?: string;
  strict: boolean;
  strucuredValue: any;
  value: string;
}

export interface IRamlResource {
  absoluteUri: string;
  allUriParameters: IRamlItem[];
  displayName: string;
  methods: IRamlMethod[];
  parentUrl: string;
  relativeUri: string;
  relativeUriPathSegments: string[];
  securedBy: Array<{
    schemeName: string;
  }>;
  uniqueId: string;
  resources?: IRamlResource[];
  themeFirstUriSegment: string;
}

export interface IRamlMethod {
  method: string;
  protocols: string[];
  securedBy: Array<{
    schemeName: string;
  }>;
  description?: string;
  headers?: IRamlItem[];
  allUriParameters: IRamlItem[];
  uriParameters: IRamlItem[];
  queryParameters: IRamlItem[];
  body: IRamlItem[];
  responses: IRamlResponse[];
  themeSearchString: string;
}

export interface IRamlResponse {
  key: string;
  code: string;
  description: string;
  headers?: IRamlItem[];
  body?: IRamlItem[];
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IRaml,
  IRamlDocumentation,
  IRamlItem,
  IRamlResource,
  IRamlSecurityScheme
} from '../interfaces/raml.interface';

@Injectable({
  providedIn: 'root'
})
export class RamlService {
  private data: IRaml;

  constructor() {
    const ramlData = environment.production
      ? window['ramlData']
      : environment.ramlData;
    this.prepareData(ramlData);
  }

  private prepareData(data: IRaml) {
    this.data = data;
    this.data.resources = this.flattenResources(this.data.resources);
    this.generateSearchStrings();
    this.data.resources.map(r => {
      // Get first URI Segment
      r.themeFirstUriSegment = [r.parentUrl, r.relativeUri]
        .join('/')
        .replace(/\/\//g, '/')
        .split('/')[1];

      // Generate example data
      r.allUriParameters.map(o => this.generateExampleForItem(o));
      r.methods.map(m => {
        ['allUriParameters', 'queryParameters'].map(key => {
          if (key in m) {
            m[key].map(o => this.generateExampleForItem(o));
          }
        });
        if (m.body) {
          m.body.map(b => {
            if (b.properties) {
              b.properties.map(o => this.generateExampleForItem(o));
            }
          });
        }
      });
    });
    this.data.baseUriParameters = this.data.baseUriParameters || [];
    this.data.baseUriParameters.map(o => this.generateExampleForItem(o));
    this.data.securedBy = this.data.securedBy || [];
    if (this.data.mediaType && !Array.isArray(this.data.mediaType)) {
      this.data.mediaType = [this.data.mediaType];
    }
  }

  private generateExampleForItem(item: IRamlItem) {
    if (!item.examples) {
      let example;
      if (item.enum) {
        example = item.enum[0];
      } else if (item.default !== undefined) {
        example = item.default;
      } else if (['number', 'integer'].includes(item.type)) {
        try {
          const min = item.minimum !== undefined ? item.minimum : 0;
          const max = item.maximum !== undefined ? item.maximum : 0;
          example =
            Math.floor(Math.random() * Math.max(min, max)) + Math.min(min, max);
        } catch (err) {
          console.error(err);
        }
      }

      if (example) {
        if (typeof example !== 'string') {
          example = JSON.stringify(example);
        }
        item.examples = [
          {
            value: example,
            strucuredValue: example,
            strict: true,
            name: null
          }
        ];
      }
    }
  }

  private flattenResources(resources: IRamlResource[]): IRamlResource[] {
    if (!resources) {
      return [];
    }
    const flattenedResources: IRamlResource[] = [];
    for (const resource of resources) {
      if (!resource.methods) {
        resource.methods = [];
      }
      flattenedResources.push(resource);
      flattenedResources.push(...this.flattenResources(resource.resources));
      delete resource.resources;
    }
    return flattenedResources;
  }

  private generateSearchStrings(): void {
    this.data.resources.map(resource => {
      let stringifiedResource = JSON.parse(JSON.stringify(resource));
      delete stringifiedResource.methods;
      stringifiedResource = JSON.stringify(stringifiedResource);
      resource.methods.map(method => {
        method.themeSearchString = stringifiedResource + JSON.stringify(method);
      });
    });
  }

  getDocumentation(): IRamlDocumentation[] {
    return this.data.documentation;
  }

  getResources(): IRamlResource[] {
    return this.data.resources;
  }

  getResourceById(resourceId: string) {
    return this.data.resources.find(o => o.uniqueId === resourceId);
  }

  getMethodByResource(resource: IRamlResource, method: string) {
    return resource ? resource.methods.find(o => o.method === method) : null;
  }

  getSecuritySchemeByName(name: string): IRamlSecurityScheme {
    return this.data.securitySchemes[name];
  }

  getData(): IRaml {
    return this.data;
  }
}

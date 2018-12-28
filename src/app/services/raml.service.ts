import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IRaml,
  IRamlDocumentation,
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
  }

  private flattenResources(resources: IRamlResource[]): IRamlResource[] {
    if (!resources) {
      return [];
    }
    const flattenedResources: IRamlResource[] = [];
    for (const resource of resources) {
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
        method.searchString = stringifiedResource + JSON.stringify(method);
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

import { TestBed } from '@angular/core/testing';

import { ValidacionesService } from './validaciones.service';

describe('ValidacionesService', () => {
  let service: ValidacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

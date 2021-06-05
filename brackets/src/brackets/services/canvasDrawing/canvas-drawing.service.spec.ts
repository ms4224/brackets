import { TestBed } from '@angular/core/testing';

import { CanvasDrawingService } from './canvas-drawing.service';

describe('CanvasDrawingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasDrawingService = TestBed.get(CanvasDrawingService);
    expect(service).toBeTruthy();
  });
});

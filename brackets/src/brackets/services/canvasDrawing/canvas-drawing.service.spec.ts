import { TestBed } from '@angular/core/testing';

import { CanvasDrawingService, iMatchConnection } from './canvas-drawing.service';

describe('CanvasDrawingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasDrawingService = TestBed.get(CanvasDrawingService);
    expect(service).toBeTruthy();
  });

  it('should register a connectionGrid appropriately', () => {
    const testConn00: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 0,
      matchIndex: 0
    }
    const testConn01: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 0,
      matchIndex: 1
    }
    const testConn02: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 0,
      matchIndex: 2
    }
    const testConn10: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 1,
      matchIndex: 0
    }
    const testConn11: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 1,
      matchIndex: 1
    }
    const testConn20: iMatchConnection = {
      front: {x: 0, y: 0},
      back: {x: 20, y: 0},
      bracketIndex: 2,
      matchIndex: 0
    }
    const service: CanvasDrawingService = TestBed.get(CanvasDrawingService);
    service.registerMatchConnection(testConn11);
    service.registerMatchConnection(testConn20);
    service.registerMatchConnection(testConn10);
    service.registerMatchConnection(testConn00);
    service.registerMatchConnection(testConn02);
    service.registerMatchConnection(testConn01);
    expect(service['connectionGrid']).toEqual([
      [testConn00, testConn01, testConn02],
      [testConn10, testConn11],
      [testConn20]
    ]);
  })
});

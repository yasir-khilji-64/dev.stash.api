import { NextFunction, Request, Response } from 'express';

import { errorHandler, notFound } from './error-handler.middleware';

describe('Given a request for a non-existent resource', () => {
  describe('When the notFound middleware is invoked', () => {
    test('Then it should set status code to 422 and pass the error to next', () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      notFound(req, res, next);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

describe('Given an error occured in the application', () => {
  describe('When the errorhandler middleware is invoked', () => {
    test('Then it should set the appropriate status code and send error response', () => {
      const err = new Error('Test error');
      const req = {} as Request;
      const res = {
        statusCode: 404,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: err.message,
        stack: err.stack,
      });
    });

    test('Then it should set tatus code to 500 if response status code is 200', () => {
      const err = new Error('Test error');
      const req = {} as Request;
      const res = {
        statusCode: 200,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        message: err.message,
        stack: err.stack,
      });
    });
  });
});

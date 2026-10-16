import { Test, TestingModule } from '@nestjs/testing';
import { UenServiceController } from './uen-service.controller.js';

describe('UenServiceController', () => {
  let controller: UenServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UenServiceController],
    }).compile();

    controller = module.get<UenServiceController>(UenServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status for a valid UEN', () => {
    const validUEN = '201912345A';
    const result = controller.validateUEN({ uen: validUEN });
    expect(result).toEqual({ status: 'success', message: 'UEN is valid' });
  });

  it('should return status for an invalid UEN', () => {
    const invalidUEN = '123456789';
    const result = controller.validateUEN({ uen: invalidUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for an empty UEN', () => {
    const emptyUEN = '';
    const result = controller.validateUEN({ uen: emptyUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN that is too short', () => {
    const shortUEN = '12345678';
    const result = controller.validateUEN({ uen: shortUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN that is too long', () => {
    const longUEN = '12345678901';
    const result = controller.validateUEN({ uen: longUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN with invalid characters', () => {
    const invalidCharUEN = '2019@12345A';
    const result = controller.validateUEN({ uen: invalidCharUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN with spaces', () => {
    const spacedUEN = '2019 12345A';
    const result = controller.validateUEN({ uen: spacedUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN with special characters', () => {
    const specialCharUEN = '2019#12345A';
    const result = controller.validateUEN({ uen: specialCharUEN });
    expect(result).toEqual({ status: 'error', message: 'UEN is invalid' });
  });

  it('should return status for a UEN with lowercase letters', () => {
    const lowercaseUEN = '201912345a';
    const result = controller.validateUEN({ uen: lowercaseUEN });
    expect(result).toEqual({ status: 'success', message: 'UEN is valid' });
  });
});

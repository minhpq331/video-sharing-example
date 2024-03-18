import { ApiAuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { TestBed } from '@automock/jest';

describe('ApiAuthGuard', () => {
  let guard: ApiAuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ApiAuthGuard).compile();
    guard = unit;
    jwtService = unitRef.get(JwtService);
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no token', async () => {
      const context: any = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      };

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if invalid token', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error());

      const context: any = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: 'Bearer token',
            },
          }),
        }),
      };

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should return true if valid token', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({
        id: 1,
      });

      const context: any = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: 'Bearer token',
            },
          }),
        }),
      };

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });
  });
});

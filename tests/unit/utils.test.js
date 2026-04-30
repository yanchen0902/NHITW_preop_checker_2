import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isWithin3Months, matchAlert } from '../../src/content/utils.js';

describe('isWithin3Months', () => {
  beforeEach(() => {
    // Mock current date to 2026-04-30 for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 30)); // Month is 0-indexed (3 = April)
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true for a date within 90 days', () => {
    // 2026 is ROC 115. April 30. 90 days ago is around end of Jan.
    expect(isWithin3Months('115/03/01')).toBe(true);
  });

  it('should return false for a date older than 90 days', () => {
    expect(isWithin3Months('114/12/01')).toBe(false);
  });

  it('should handle invalid formats gracefully', () => {
    expect(isWithin3Months('')).toBe(false);
    expect(isWithin3Months('115/03')).toBe(false);
  });
});

describe('matchAlert', () => {
  it('should match SGLT2 by exact name', () => {
    const alert = matchAlert('JARDIANCE', '', '');
    expect(alert).not.toBeNull();
    expect(alert.category).toBe('SGLT2i');
  });

  it('should match generic SGLT2 by ATC code', () => {
    const alert = matchAlert('UNKNOWN_DRUG', 'A10BK99', '');
    expect(alert).not.toBeNull();
    expect(alert.category).toBe('SGLT2i');
  });

  it('should match ACEI/ARB by ingredient suffix', () => {
    const alert = matchAlert('SOME_DRUG', '', 'VALSARTAN');
    expect(alert).not.toBeNull();
    expect(alert.category).toBe('ACEI/ARB');
  });

  it('should not match irrelevant drugs', () => {
    const alert = matchAlert('PANADOL', 'N02BE01', 'PARACETAMOL');
    expect(alert).toBeNull();
  });
});

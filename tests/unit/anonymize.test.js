import { describe, it, expect } from 'vitest';
import { getAnonymizedPatientInfo } from '../../src/content/utils.js';

describe('getAnonymizedPatientInfo', () => {
  it('should anonymize a 3-character name correctly', () => {
    document.body.innerHTML = `
      <div class="member-info">
        <span class="name">王小明</span>
        <span class="idno">A123456789</span>
      </div>
    `;
    const info = getAnonymizedPatientInfo();
    expect(info.name).toBe('王〇明');
    expect(info.id).toBe('A123****89');
  });

  it('should anonymize a 2-character name correctly', () => {
    document.body.innerHTML = `
      <div class="member-info">
        <span class="name">陳大</span>
        <span class="idno">B987654321</span>
      </div>
    `;
    const info = getAnonymizedPatientInfo();
    expect(info.name).toBe('陳〇');
  });

  it('should anonymize a 4-character name correctly', () => {
    document.body.innerHTML = `
      <div class="member-info">
        <span class="name">歐陽修之</span>
        <span class="idno">C111111111</span>
      </div>
    `;
    const info = getAnonymizedPatientInfo();
    expect(info.name).toBe('歐〇〇之');
  });

  it('should handle idempotency (already anonymized names)', () => {
    document.body.innerHTML = `
      <div class="member-info">
        <span class="name">林〇華</span>
        <span class="idno">D123****89</span>
      </div>
    `;
    const info = getAnonymizedPatientInfo();
    // Should not change the already replaced circle or star
    expect(info.name).toBe('林〇華');
    expect(info.id).toBe('D123****89');
  });

  it('should fallback to 10 stars if ID is totally missing', () => {
    document.body.innerHTML = `
      <div class="member-info">
        <span class="name">林無名</span>
      </div>
    `;
    const info = getAnonymizedPatientInfo();
    expect(info.id).toBe('**********');
  });
});

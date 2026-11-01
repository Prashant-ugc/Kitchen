import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRemodelEstimate,
  calculateMonthlyPayment,
  validateLeadForm,
  TRANSFORMATION_PROJECTS,
  STYLE_MOODBOARDS,
  FIVE_WEEK_TIMELINE,
} from './remodelLogic';

test('calculateRemodelEstimate computes accurate ranges and ROI for standard kitchen', () => {
  const result = calculateRemodelEstimate('kitchen', 'standard', 'custom_quartz');
  assert.equal(result.minCost, 34000);
  assert.equal(result.maxCost, 46000);
  assert.equal(result.formattedRange, '$34,000 – $46,000');
  assert.ok(result.equityBoost >= 28000 && result.equityBoost <= 35000);
  assert.equal(result.roiPercent, 78);
});

test('calculateRemodelEstimate scales properly for expansive bundle with chefs grade finish', () => {
  const stdBath = calculateRemodelEstimate('guest_bath', 'compact', 'refresh');
  const luxuryBundle = calculateRemodelEstimate('bundle', 'expansive', 'chefs_grade');
  assert.ok(luxuryBundle.minCost > stdBath.maxCost);
  assert.ok(luxuryBundle.equityBoost > stdBath.equityBoost);
  assert.ok(luxuryBundle.formattedEquity.includes('Instant Equity'));
});

test('calculateMonthlyPayment handles 18-month 0% promo and 60/120 month amortized terms', () => {
  const promo = calculateMonthlyPayment(36000, 18);
  assert.equal(promo.monthlyPayment, 2000);
  assert.ok(promo.aprLabel.includes('0.0%'));

  const term120 = calculateMonthlyPayment(21000, 120);
  const term60 = calculateMonthlyPayment(21000, 60);
  assert.ok(term120.monthlyPayment < term60.monthlyPayment);
  assert.ok(term120.monthlyPayment >= 240 && term120.monthlyPayment <= 260);
});

test('validateLeadForm enforces name, 10-digit phone, email, and 5-digit ZIP', () => {
  const invalid = validateLeadForm({
    name: 'A',
    phone: '123',
    email: 'invalid-email',
    zip: '787',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.zip);

  const valid = validateLeadForm({
    name: 'Harrison Ford',
    phone: '(512) 555-0192',
    email: 'harrison@austinhome.com',
    zip: '78746',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('curated showroom datasets are complete', () => {
  assert.equal(TRANSFORMATION_PROJECTS.length, 3);
  assert.equal(STYLE_MOODBOARDS.length, 3);
  assert.equal(FIVE_WEEK_TIMELINE.length, 5);
});

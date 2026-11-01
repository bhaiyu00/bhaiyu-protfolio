import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  generateMailtoUrl,
  generateWhatsAppUrl,
  getNextRotatorIndex,
  PROJECTS_DATA,
  ROTATOR_WORDS,
  calculateScrollProgress,
  calculateParallaxOffset,
  clampVelocity,
} from './portfolioLogic';

test('validates valid contact form data correctly', () => {
  const result = validateContactForm({
    name: 'Aarav Patel',
    email: 'aarav@example.com',
    projectType: 'Web Development',
    message: 'Hello Nishant, we would like to collaborate on an interactive experience.',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('catches short name or invalid email in contact form', () => {
  const result = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    projectType: 'General',
    message: 'Short',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('generates mailto URL with encoded parameters', () => {
  const url = generateMailtoUrl(
    {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'AI Automation',
      message: 'Need help with WhatsApp bot.',
    },
    'nishantbarman04k@gmail.com'
  );
  assert.ok(url.startsWith('mailto:nishantbarman04k@gmail.com?'));
  assert.ok(url.includes('AI%20Automation'));
  assert.ok(url.includes('John%20Doe'));
});

test('generates whatsapp URL with encoded text', () => {
  const url = generateWhatsAppUrl({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    projectType: 'Web Experience',
    message: 'Excited to chat!',
  });
  assert.ok(url.startsWith('https://wa.me/'));
  assert.ok(url.includes('Sarah%20Connor'));
});

test('cycles rotator index within boundaries', () => {
  const next0 = getNextRotatorIndex(0, ROTATOR_WORDS.length);
  assert.equal(next0, 1);
  const nextLast = getNextRotatorIndex(ROTATOR_WORDS.length - 1, ROTATOR_WORDS.length);
  assert.equal(nextLast, 0);
});

test('calculates scroll progress correctly', () => {
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);
  assert.equal(calculateScrollProgress(500, 2000, 1000), 50);
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 100);
  // Edge case when totalHeight <= windowHeight
  assert.equal(calculateScrollProgress(0, 800, 1000), 0);
});

test('calculates parallax offset and clamps velocity within bounds', () => {
  const offset = calculateParallaxOffset(500, 500, 1000, 0.1);
  assert.ok(typeof offset === 'number');
  assert.equal(clampVelocity(15, -10, 10), 10);
  assert.equal(clampVelocity(-20, -10, 10), -10);
  assert.equal(clampVelocity(5, -10, 10), 5);
});

test('ensures all 4 projects exist with complete metadata and image paths', () => {
  assert.equal(PROJECTS_DATA.length, 4);
  for (const project of PROJECTS_DATA) {
    assert.ok(project.title);
    assert.ok(project.category);
    assert.ok(project.imagePath);
    assert.ok(project.features.length >= 3);
  }
});

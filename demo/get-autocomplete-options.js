function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const people1 = [
  { name: 'Person Awesome1', details: 'p.awesome1@email.com' },
  { name: 'Person Awesome2', details: 'p.awesome2@email.com' },
  { name: 'Person Awesome3', details: 'p.awesome3@email.com' },
  { name: 'Person Awesome4', details: 'p.awesome4@email.com' },
  { name: 'Person Awesome5', details: 'p.awesome5@email.com' },
  { name: 'Person Awesome6', details: 'p.awesome6@email.com' },
  { name: 'Person Awesome7', details: 'p.awesome7@email.com' },
  { name: 'Person Awesome8', details: 'p.awesome8@email.com' },
  { name: 'Person Awesome9', details: 'p.awesome9@email.com' },
  { name: 'Person Awesome10', details: 'p.awesome10@email.com' },
  { name: 'Person Awesome11', details: 'p.awesome11@email.com' },
  { name: 'Person Awesome12', details: 'p.awesome12@email.com' },
];

const people2 = [
  { name: 'Someone Awesome1', details: 's.awesome1@email.com' },
  { name: 'Someone Awesome2', details: 's.awesome2@email.com' },
  { name: 'Someone Awesome3', details: 's.awesome3@email.com' },
  { name: 'Someone Awesome4', details: 's.awesome4@email.com' },
  { name: 'Someone Awesome5', details: 's.awesome5@email.com' },
  { name: 'Someone Awesome6', details: 's.awesome6@email.com' },
  { name: 'Someone Awesome7', details: 's.awesome7@email.com' },
  { name: 'Someone Awesome8', details: 's.awesome8@email.com' },
  { name: 'Someone Awesome9', details: 's.awesome9@email.com' },
  { name: 'Someone Awesome10', details: 's.awesome10@email.com' },
  { name: 'Someone Awesome11', details: 's.awesome11@email.com' },
  { name: 'Someone Awesome12', details: 's.awesome12@email.com' },
];

const people3 = [
  { name: 'Finishing Person', details: 'f.person@email.com' },
  { name: 'Final Human', details: 'f.human@email.com' },
];

export default async function* getOptions(_query) {
  await sleep(150);
  yield people1;
  await sleep(150);
  yield people2;
  await sleep(150);
  yield people3;
}

import test from 'ava';
import whatdog from './';

test('image', async t => {
    const result = await whatdog('http://imgur.com/B7a15F5.jpg');
    t.is(result.isDog, true);
    t.is(result.breed, `Norfolk Terrier`);
    t.is(result.about, `Spirited, small but sturdy, feisty yet sweet personality`);
});

test('no url', async t => {
    const result1 = await t.throws(whatdog());
    t.is(result1.message, 'A valid url is required.');

    const result2 = await t.throws(whatdog(''));
    t.is(result2.message, 'A valid url is required.');

    const result3 = await t.throws(whatdog({}));
    t.is(result3.message, 'A valid url is required.');
});

test('non-image url', async t => {
    const result = await t.throws(whatdog('http://microsoft.com/'));
    t.regex(result.message, /ParseError.*/);
});

import { setupTest } from 'ember-qunit';
import { parseMemeUrl } from 'potber-client/helpers/parse-meme-url';
import { module, test } from 'qunit';

module('Unit | Helper | parse-meme-url', function (hooks) {
  setupTest(hooks);

  test('returns the input', function (assert) {
    assert.equal(
      parseMemeUrl(['https://some-absolue-path.com']),
      'https://some-absolue-path.com'
    );
  });

  test('transforms a relative URL to the appropiate absolute URL', function (assert) {
    assert.equal(
      parseMemeUrl(['some/meme.png']),
      'https://test.spuxx.de/images/memes/some-meme.png'
    );
  });
});

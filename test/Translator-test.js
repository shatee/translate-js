'use strict';

import assert from 'power-assert';
import Translator from '../src/Translator';

const translator = new Translator();
translator.defaultLocale = 'en-US';

translator.setMessages('en-US', {
  ['焼きリンゴ']: 'a baked apple',
  ['%name%は%target%を食べていた']: '%name% was eating an %target%',
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name% uploaded a video',
    '%name% uploaded %num% videos'
  ]
});

translator.setMessages('zh-TW', {
  ['焼きリンゴ']: '燒烤蘋果',
  ['%name%は%target%を食べていた']: '%name%吃著%target%',
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name%%num%個動畫投稿了',
    '%name%%num%個動畫投稿了'
  ]
});


describe('Translator', () => {

  describe('Translator#translate', () => {
    it('get translated text', () => {
      const translated = translator.translate('焼きリンゴ');
      assert('a baked apple' === translated);
    });

    it('has params', () => {
      const translated = translator.translate('%name%は%target%を食べていた', {
        name: 'John',
        target: 'orange'
      });
      assert('John was eating an orange' === translated);
    });

    it('chinese taiwan', () => {
      const translated = translator.translate('焼きリンゴ', {}, {locale: 'zh-TW'});
      assert('燒烤蘋果' === translated);
    });

    it('unknown locale (to source text)', () => {
      const translated = translator.translate('焼きリンゴ', {}, {locale: 'fr-FR'});
      assert('焼きリンゴ' === translated);
    });
  });

  describe('Translator#pluralTranslate', () => {
    it('get plural translated text', () => {
      const translated1 = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: 'Paul',
        num: 1
      });
      assert('Paul uploaded a video' === translated1);

      const translated2 = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: 'Paul',
        num: 2
      });
      assert('Paul uploaded 2 videos' === translated2);
    });

    it('use translate text', () => {
      const translated = translator.pluralTranslate('焼きリンゴ');
      assert('a baked apple' === translated);
    });

    it('chinese taiwan', () => {
      const translated = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: 'Paul',
        num: 2
      }, {locale: 'zh-TW'});
      assert('Paul2個動畫投稿了' === translated);
    });
  });


});

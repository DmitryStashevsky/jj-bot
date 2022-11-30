const { I18n } = require('i18n');
const path = require('path');

const i18n = new I18n({
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  directory: path.join(__dirname, '/locales')
});

i18n.init = (language) => {
  i18n.setLocale(language === 'ru' || language === 'en'
  ? language
  : 'ru'
  );
}

module.exports = i18n;
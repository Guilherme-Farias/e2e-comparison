module.exports = {
  '*.ts': filenames => [
    `prettier --write ${filenames.join(' ')}`,
    `npm run lint --fix . ${filenames.join(' --file')}`,
  ],
};

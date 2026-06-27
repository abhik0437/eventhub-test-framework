module.exports = {
    default: {
        require: ['tests/step-definitions/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: ['progress'],
        paths: ['tests/features/**/*.feature']
    }
}
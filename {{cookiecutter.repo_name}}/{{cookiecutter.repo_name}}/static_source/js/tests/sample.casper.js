casper.test.comment('Casper+Django integration example');
var helper = require('./djangocasper.js');
helper.scenario('/',
    function() {
        this.test.assertSelectorHasText('h1', 'Go forth and build...',
            "The home page has the lightmatter logo");
        this.click('h1');
    },
    function() {
        helper.assertAbsUrl('/',
            "After clicking the logo, nothing happens");
    }
);
helper.run();

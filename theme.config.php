<?php
return [
    'extends' => 'bootstrap3',
    'favicon' => 'aksearch-favicon.ico',
    'helpers' => [
      'factories' => [
        'AkSearch\View\Helper\AkSearch\Datepicker' => 'AkSearch\View\Helper\AkSearch\DatepickerFactory',
        'AkSearch\View\Helper\AkSearch\Warnings' => 'AkSearch\View\Helper\AkSearch\WarningsFactory',
        'AkSearch\View\Helper\Root\AccountMenu' => 'AkSearch\View\Helper\Root\AccountMenuFactory',
        'AkSearch\View\Helper\Root\Auth' => 'VuFind\View\Helper\Root\AuthFactory',
        'AkSearch\View\Helper\Root\Citation' => 'VuFind\View\Helper\Root\CitationFactory',
        'AkSearch\View\Helper\Root\Record' => 'VuFind\View\Helper\Root\RecordFactory',
        'AkSearch\View\Helper\Root\SearchBox' => 'AkSearch\View\Helper\Root\SearchBoxFactory',
        'VuFind\View\Helper\Root\RecordDataFormatter' => 'AkSearch\View\Helper\Root\RecordDataFormatterFactory'
      ],
      'aliases' => [
        'accountMenu' => 'AkSearch\View\Helper\Root\AccountMenu',
        'auth' => 'AkSearch\View\Helper\Root\Auth',
        'datepicker' => 'AkSearch\View\Helper\AkSearch\Datepicker',
        'searchbox' => 'AkSearch\View\Helper\Root\SearchBox',
        'warnings' => 'AkSearch\View\Helper\AkSearch\Warnings',

        // Overrides
        'VuFind\View\Helper\Root\Citation' => 'AkSearch\View\Helper\Root\Citation',
        'VuFind\View\Helper\Root\Record' => 'AkSearch\View\Helper\Root\Record'
      ]
    ],
    'js' => [
        'lightbox.js',
        'vendor/klaro/klaro-config.js',
        'vendor/klaro/klaro.js'
    ],
    'less' => [
        'active' => true,
        'compiled.less'
    ]
];

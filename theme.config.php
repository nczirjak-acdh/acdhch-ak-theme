<?php

return [
    'extends' => 'bootstrap3',
    'favicon' => 'acdhch-favicon.ico',
    'helpers' => [
        'factories' => [
            
            
            'AkSearch\View\Helper\AkSearch\Warnings' => 'AkSearch\View\Helper\AkSearch\WarningsFactory',            
            'AkSearch\View\Helper\Root\Auth' => 'VuFind\View\Helper\Root\AuthFactory',            
            'AkSearch\View\Helper\Root\SearchBox' => 'AkSearch\View\Helper\Root\SearchBoxFactory',
            
            
            'AkSearch\View\Helper\Root\Record' => 'VuFind\View\Helper\Root\RecordFactory',
            'AkSearch\View\Helper\AcdhchTheme\Datepicker' => 'AkSearch\View\Helper\AkSearch\DatepickerFactory',
            'VuFind\View\Helper\Root\RecordDataFormatter' => 'AkSearch\View\Helper\Root\RecordDataFormatterFactory',
            'AkSearch\View\Helper\Root\Citation' => 'VuFind\View\Helper\Root\CitationFactory',
             'AkSearch\View\Helper\Root\AccountMenu' => 'AkSearch\View\Helper\Root\AccountMenuFactory',
            
            #'AcdhchTheme\View\Helper\Root\Record' => 'VuFind\View\Helper\Root\RecordFactory',
            #'AcdhchTheme\View\Helper\AcdhchTheme\Datepicker' => 'AcdhchTheme\View\Helper\AcdhchTheme\DatepickerFactory',
            #'VuFind\View\Helper\Root\RecordDataFormatter' => 'AcdhchTheme\View\Helper\Root\RecordDataFormatterFactory',
            #'AcdhchTheme\View\Helper\Root\Citation' => 'VuFind\View\Helper\Root\CitationFactory',
            # 'AcdhchTheme\View\Helper\Root\AccountMenu' => 'AcdhchTheme\View\Helper\Root\AccountMenuFactory',
            
        ],
        'aliases' => [
            
            'auth' => 'AkSearch\View\Helper\Root\Auth',           
            'searchbox' => 'AkSearch\View\Helper\Root\SearchBox',
            'warnings' => 'AkSearch\View\Helper\AkSearch\Warnings',
            
            'accountMenu' => 'AkSearch\View\Helper\Root\AccountMenu',
            'datepicker' => 'AkSearch\View\Helper\AkSearch\Datepicker',
            
            
            #'accountMenu' => 'AcdhchTheme\View\Helper\Root\AccountMenu',
            #'datepicker' => 'AcdhchTheme\View\Helper\AcdhchTheme\Datepicker',
            // Overrides
            #'VuFind\View\Helper\Root\Citation' => 'AcdhchTheme\View\Helper\Root\Citation',
            #'VuFind\View\Helper\Root\Record' => 'AcdhchTheme\View\Helper\Root\Record',
            
            'VuFind\View\Helper\Root\Citation' => 'AkSearch\View\Helper\Root\Citation',
            'VuFind\View\Helper\Root\Record' => 'AkSearch\View\Helper\Root\Record',
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

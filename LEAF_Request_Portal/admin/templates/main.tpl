{strip}<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {if $tabText != ''}
        <title>{$tabText} - {$title} | {$city}</title>
    {else}
        <title>{$title} | {$city}</title>
    {/if}
    <style type="text/css" media="screen">
        @import "../../libs/js/jquery/css/dcvamc/jquery-ui.custom.min.css";
        {section name=i loop=$stylesheets}
            @import "{$stylesheets[i]}";
        {/section}
        @import "../../libs/js/jquery/chosen/chosen.min.css";
        @import "../../libs/js/jquery/trumbowyg/ui/trumbowyg.min.css";
        @import "../../libs/js/jquery/icheck/skins/square/blue.css";
        @import "css/style.css";
        @import "../../libs/css/leaf.css";
    </style>
    <style type="text/css" media="print">
        @import "css/printer.css";
    </style>

    <script type="text/javascript" src="../../libs/js/jquery/jquery.min.js"></script>

    {if $useUI == true}
        <script type="text/javascript" src="../../libs/js/jquery/jquery-ui.custom.min.js"></script>
        <script type="text/javascript" src="../js/dialogController.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/chosen/chosen.jquery.min.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/trumbowyg/trumbowyg.min.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/icheck/icheck.js"></script>
    {else if $useLiteUI == true}
        <script type="text/javascript" src="../js/dialogController.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/chosen/chosen.jquery.min.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/trumbowyg/trumbowyg.min.js"></script>
        <script type="text/javascript" src="../../libs/js/jquery/icheck/icheck.js"></script>
    {/if}
    {if $leafSecure >= 1}
        <script type="text/javascript" src="../../libs/js/LEAF/sessionTimeout.js"></script>
    {/if}
    {section name=i loop=$javascripts}
        <script type="text/javascript" src="{$javascripts[i]}"></script>
    {/section}
    <script src="https://unpkg.com/vue@next"></script>  <!-- DEV -->
    <!-- <script type="text/javascript" src="../../libs/js/vue/vue.global.prod.js"></script> -->
    <script type="text/javascript" src="../../libs/js/vue/vue-dest/leaf-vue-main.js" defer></script>
    <link rel="icon" href="../vafavicon.ico" type="image/x-icon" />
</head>

<body>
    <div id="vue-leaf-header">
        <transition name="warn">
        <scrolling-leaf-warning v-show="windowTop > 0" prop-secure='{$leafSecure}'>Do Not Enter PHI / PII</scrolling-leaf-warning>
        </transition>

        <header id="leaf-header" aria-label="Official government website">
            <div id="header-top" v-if="!topIsRetracted">
                <a id="logo" href="./" title="Home" aria-label="LEAF home">{$logo}</a>
                <div><em><h1 id="site-info-title">{$title}</h1><h2 id="site-info-city">{$city}</h2></em></div>
                <leaf-warning prop-secure='{$leafSecure}'></leaf-warning>

                {if $qrcodeURL != ''}
                    <div><img class="print nodisplay" style="width: 72px" src="../../libs/qrcode/?encode={$qrcodeURL}" alt="QR code" /></div>
                {/if}
            </div>
            {$emergency}
            <nav id="leaf-vue-nav" aria-label="main menu">
                <ul id="nav-navlinks">
                    <minimize-button :is-retracted="topIsRetracted" @toggle-top-header="toggleHeader"></minimize-button>
                    <admin-leaf-nav :inner-width="windowInnerWidth"
                                    orgchart-path='{$orgchartPath}'
                                    site-type='{$siteType}'></admin-leaf-nav>
                </ul>
                <ul id="nav-user-info">
                    <leaf-user-info :inner-width="windowInnerWidth" user-name='{$name}'></leaf-user-info>
                </ul>
            </nav>
        </header>
    </div>

    <div id="body">
        {if $status != ''}
            <div class="lf-alert">{$status}</div>
        {/if}
        <div id="bodyarea" class="default-container">
            {$body}
        </div>
    </div>

    <footer class="usa-footer leaf-footer noprint" id="footer" {if $hideFooter == true} style="visibility: hidden; display: none"{/if}>
        <a id="versionID" href="../?a=about">{$smarty.const.PRODUCT_NAME}<br />Version {$smarty.const.VERSION_NUMBER} r{$revision}</a>
    </footer>

</body>
</html>{/strip}

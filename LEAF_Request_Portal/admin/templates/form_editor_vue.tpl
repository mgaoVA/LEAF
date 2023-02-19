<div id="vue-formeditor-app">
    <div style="display:none" id="subordinate_site_warning">
        <h3>This is a Nationally Standardized Subordinate Site</h3>
        <span>Do not make modifications! &nbsp;Synchronization problems will occur. &nbsp;Please contact your process POC if modifications need to be made.</span>
    </div>
    <mod-form-menu></mod-form-menu>
    <router-view></router-view>
    <!-- DIALOGS -->
    <leaf-form-dialog v-if="showFormDialog" :has-dev-console-access='<!--{$hasDevConsoleAccess}-->'>  
        <template #dialog-content-slot>
            <component :is="dialogFormContent" :ref="dialogFormContent"></component>
        </template>
    </leaf-form-dialog>
</div>

<script type="text/javascript" src="../../libs/js/vue-dest/LEAF_FormEditor_main_build.js" defer></script>

<script>
    const CSRFToken = '<!--{$CSRFToken}-->';
    let postRenderFormBrowser;

    $(function() {
        <!--{if $referFormLibraryID != ''}-->
            postRenderFormBrowser = function() { 
                $('.formLibraryID_<!--{$referFormLibraryID}-->')
                .animate({'background-color': 'yellow'}, 1000)
                .animate({'background-color': 'white'}, 1000)
                .animate({'background-color': 'yellow'}, 1000);
            };
        <!--{/if}-->
    });
</script>
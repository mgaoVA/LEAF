<?php
/* Smarty version 3.1.33, created on 2021-06-14 14:27:40
  from '/var/www/html/LEAF_Nexus/templates/print_subindicators_ajax.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_60c7675ce450e1_33298023',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4fe1f1a3141c0ac83b3bfb75eeaeeacdef2207e7' => 
    array (
      0 => '/var/www/html/LEAF_Nexus/templates/print_subindicators_ajax.tpl',
      1 => 1623622032,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:print_subindicators.tpl' => 1,
  ),
),false)) {
function content_60c7675ce450e1_33298023 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/var/www/html/libs/smarty/plugins/modifier.sanitize.php','function'=>'smarty_modifier_sanitize',),1=>array('file'=>'/var/www/html/libs/smarty/plugins/modifier.date_format.php','function'=>'smarty_modifier_date_format',),));
?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'textarea') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo $_smarty_tpl->tpl_vars['uid']->value;?>
">
                <?php echo smarty_modifier_sanitize($_smarty_tpl->tpl_vars['indicator']->value['data']);?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'radio') {?>
                <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['indicator']->value['options'], 'option');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['option']->value) {
?>
                <?php if (is_array($_smarty_tpl->tpl_vars['option']->value)) {?>
                    <?php $_smarty_tpl->_assignInScope('option', $_smarty_tpl->tpl_vars['option']->value[0]);?>
                    <?php if ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                        <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                    <?php }?>
                <?php } elseif ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                    <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                <?php }?>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'multiselect') {?>
                <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['indicator']->value['options'], 'option');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['option']->value) {
?>
                <?php if (is_array($_smarty_tpl->tpl_vars['option']->value)) {?>
                    <?php $_smarty_tpl->_assignInScope('option', $_smarty_tpl->tpl_vars['option']->value[0]);?>
                    <?php if ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                        <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                    <?php }?>
                <?php } elseif ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                    <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                <?php }?>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'dropdown') {?>
                <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['indicator']->value['options'], 'option');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['option']->value) {
?>
                <?php if (is_array($_smarty_tpl->tpl_vars['option']->value)) {?>
                    <?php $_smarty_tpl->_assignInScope('option', $_smarty_tpl->tpl_vars['option']->value[0]);?>
                    <?php if ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                        <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                    <?php }?>
                <?php } elseif ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data']) {?>
                    <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                <?php }?>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'text') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php echo smarty_modifier_sanitize($_smarty_tpl->tpl_vars['indicator']->value['data']);?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'number') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true);?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'numberspinner') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true);?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'date') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php echo smarty_modifier_date_format(htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true),"%A, %B %e, %Y");?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'time') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php echo smarty_modifier_date_format(htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true),"%l:%M %p");?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'currency') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                <?php if ($_smarty_tpl->tpl_vars['indicator']->value['data'] != 'NaN') {?>
                    $<?php echo number_format(htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true),2,".",",");?>

                <?php } else { ?>

                <?php }?>
            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'checkbox') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
                 <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true);?>

            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'checkboxes') {?>
                <span id="parentID_{$indicator.parentID|strip_tags|escape}">
            <?php $_smarty_tpl->_assignInScope('idx', 0);?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['indicator']->value['options'], 'option');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['option']->value) {
?>
                    <input type="hidden" name="<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
[<?php echo $_smarty_tpl->tpl_vars['idx']->value;?>
]" value="no" /> <!-- dumb workaround -->
                    <?php if ($_smarty_tpl->tpl_vars['option']->value == $_smarty_tpl->tpl_vars['indicator']->value['data'][$_smarty_tpl->tpl_vars['idx']->value]) {?>
                        <br /><img class="print" src="images/checkbox-yes.png" alt="checked" />
                        <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                    <?php } else { ?>
                        <br /><img class="print" src="images/checkbox-no.png" alt="not checked" />
                        <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['option']->value), ENT_QUOTES, 'UTF-8', true);?>

                    <?php }?>
                    <?php $_smarty_tpl->_assignInScope('idx', $_smarty_tpl->tpl_vars['idx']->value+1);?>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'fileupload') {?>
            <span class="printResponse" style="text-align: right" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php if ($_smarty_tpl->tpl_vars['indicator']->value['data'][0] != '') {?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['indicator']->value['data'], 'file');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['file']->value) {
?>
            <a href="file.php?categoryID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
&amp;UID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
&amp;indicatorID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
&amp;file=<?php echo urlencode($_smarty_tpl->tpl_vars['file']->value);?>
" target="_blank" class="printResponse" onclick="event.stopPropagation();"><img src="../libs/dynicons/?img=mail-attachment.svg&amp;w=16" /><?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['file']->value), ENT_QUOTES, 'UTF-8', true);?>
</a>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            <?php } else { ?>
            No files attached.
            <?php }?>
            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'image') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php if ($_smarty_tpl->tpl_vars['indicator']->value['data'] != '') {?>
            <img src="image.php?categoryID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
&amp;UID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
&amp;indicatorID=<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
" class="printResponse" style="max-width: 200px" />
            <?php } else { ?>
            No image available.
            <?php }?>
            </span>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['indicator']->value['format'] == 'position') {?>
            <span class="printResponse" id="data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
">
            <?php if ($_smarty_tpl->tpl_vars['indicator']->value['data'] != '') {?>
            <div dojoType="dijit.layout.ContentPane" style="padding: 0px">
            <?php echo '<script'; ?>
 type="dojo/method">
                dojo.xhrGet({
                    url: "./api/?a=position/" + <?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['data']), ENT_QUOTES, 'UTF-8', true);?>
,
                    handleAs: 'json',
                    load: function(response, args) {
                        dojo.byId('data_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['indicator']->value['indicatorID']), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['categoryID']->value), ENT_QUOTES, 'UTF-8', true);?>
_<?php echo htmlspecialchars(preg_replace('!<[^>]*?>!', ' ', $_smarty_tpl->tpl_vars['uid']->value), ENT_QUOTES, 'UTF-8', true);?>
').innerHTML = response.title;
                        return response;
                    },
                    preventCache: true
                });
            <?php echo '</script'; ?>
>
            Loading...
            </div>
            <?php } else { ?>
            Unassigned
            <?php }?>
            </span>
        <?php }?>

        <?php $_smarty_tpl->_subTemplateRender("file:print_subindicators.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('form'=>$_smarty_tpl->tpl_vars['indicator']->value['child'],'depth'=>$_smarty_tpl->tpl_vars['depth']->value+4,'recordID'=>$_smarty_tpl->tpl_vars['recordID']->value), 0, false);
}
}

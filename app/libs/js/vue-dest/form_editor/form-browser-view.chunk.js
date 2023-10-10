"use strict";(self.webpackChunkleaf_vue=self.webpackChunkleaf_vue||[]).push([[821],{775:(e,t,n)=>{n.d(t,{Z:()=>o});const o={data:function(){return{scrollY:window.scrollY,initialTop:15,modalElementID:"leaf_dialog_content",modalBackgroundID:"leaf-vue-dialog-background",elBody:null,elModal:null,elBackground:null}},inject:["dialogTitle","closeFormDialog","formSaveFunction","dialogButtonText"],mounted:function(){this.elBody=document.querySelector("body"),this.elModal=document.getElementById(this.modalElementID),this.elBackground=document.getElementById(this.modalBackgroundID);var e=this.elModal.clientWidth>this.elBody.clientWidth?this.elModal.clientWidth:this.elBody.clientWidth;this.elBackground.style.minHeight=200+this.elBody.clientHeight+"px",this.elBackground.style.minWidth=e+"px",this.makeDraggable(this.elModal),window.addEventListener("resize",this.checkSizes)},beforeUnmount:function(){window.removeEventListener("resize",this.checkSizes)},methods:{checkSizes:function(){var e=this.elModal.clientWidth>this.elBody.clientWidth?this.elModal.clientWidth:this.elBody.clientWidth;this.elBackground.style.minWidth=e+"px",this.elBackground.style.minHeight=this.elModal.offsetTop+this.elBody.clientHeight+"px"},makeDraggable:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=0,o=0,r=0,i=0,a=function(e){(e=e||window.event).preventDefault(),n=r-e.clientX,o=i-e.clientY,r=e.clientX,i=e.clientY,t.style.top=t.offsetTop-o+"px",t.style.left=t.offsetLeft-n+"px",l()},s=function(){document.onmouseup=null,document.onmousemove=null},l=function(){t.offsetTop<window.scrollY&&(t.style.top=window.scrollY+"px"),t.offsetLeft<window.scrollX&&(t.style.left=window.scrollX+"px"),t.offsetLeft+t.clientWidth+18>window.innerWidth+window.scrollX&&(t.style.left=window.innerWidth+window.scrollX-t.clientWidth-18+"px"),e.elBackground.style.minWidth=e.elBody.clientWidth+"px",e.elBackground.style.minHeight=e.elModal.offsetTop+e.elBody.clientHeight+"px"};document.getElementById(this.modalElementID+"_drag_handle")&&(document.getElementById(this.modalElementID+"_drag_handle").onmousedown=function(e){(e=e||window.event).preventDefault(),r=e.clientX,i=e.clientY,document.onmouseup=s,document.onmousemove=a})}},template:'<Teleport to="body">\n        <div id="leaf-vue-dialog-background">\n            <div :id="modalElementID" class="leaf-vue-dialog" role="dialog" :style="{top: scrollY + initialTop + \'px\'}">\n                <div v-html="dialogTitle" :id="modalElementID + \'_drag_handle\'" class="leaf-vue-dialog-title"></div>\n                <div tabindex=0 @click="closeFormDialog" @keypress.enter="closeFormDialog" id="leaf-vue-dialog-close">&#10005;</div>\n                <div id="record">\n                    <div role="document" style="position: relative;">\n                        <main id="xhr" class="leaf-vue-dialog-content" role="main">\n                            <slot name="dialog-content-slot"></slot>\n                        </main>\n                    </div>\n                    <div id="leaf-vue-dialog-cancel-save">\n                        <button type="button" style="width: 90px;"\n                            id="button_save" class="btn-confirm" :title="dialogButtonText.confirm"\n                            @click="formSaveFunction">\n                            {{dialogButtonText.confirm}}\n                        </button>\n                        <button type="button" style="width: 90px;"\n                            id="button_cancelchange" class="btn-general" :title="dialogButtonText.cancel"\n                            @click="closeFormDialog">\n                            {{dialogButtonText.cancel}}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </Teleport>'}},393:(e,t,n)=>{n.d(t,{Z:()=>o});const o={name:"browser-and-restore-menu",inject:["siteSettings","openNewFormDialog","openImportFormDialog"],template:'<div><nav id="top-menu-nav">\n        \x3c!-- FORM BROWSER AND RESTORE FIELDS MENU --\x3e\n        <ul id="page-menu">\n            <li v-if="$route.name === \'restore\'">\n                <router-link :to="{ name: \'browser\' }" class="router-link">\n                    Form Browser\n                </router-link>                \n            </li>\n            <li>\n                <button type="button" id="createFormButton" @click="openNewFormDialog()">\n                    Create Form<span role="img" aria="">📄</span>\n                </button>\n            </li>\n            <li>\n                <a href="./?a=formLibrary" class="router-link">LEAF Library<span role="img" aria="">📘</span></a>\n            </li>\n            <li>\n                <button type="button" @click="openImportFormDialog">\n                    Import Form<span role="img" aria="">📦</span>\n                </button>\n            </li>\n            <li v-if="$route.name === \'browser\'">\n                <router-link :to="{ name: \'restore\' }" class="router-link" >\n                    Restore Fields<span role="img" aria="">♻️</span>\n                </router-link>\n            </li>\n        </ul>\n    </nav>\n    <div v-if="siteSettings?.siteType===\'national_subordinate\'" id="subordinate_site_warning" style="padding: 0.5rem; margin: 0.5rem 0;" >\n        <h3 style="margin: 0 0 0.5rem 0; color: #a00;">This is a Nationally Standardized Subordinate Site</h3>\n        <span><b>Do not make modifications!</b> &nbsp;Synchronization problems will occur. &nbsp;Please contact your process POC if modifications need to be made.</span>\n    </div></div>'}},169:(e,t,n)=>{n.d(t,{Z:()=>o});const o={name:"import-form-dialog",data:function(){return{initialFocusElID:"formPacket",files:null}},inject:["APIroot","CSRFToken","setDialogSaveFunction","closeFormDialog"],created:function(){this.setDialogSaveFunction(this.onSave)},mounted:function(){document.getElementById(this.initialFocusElID).focus()},methods:{onSave:function(){var e=this;if(null!==this.files){var t=new FormData;t.append("formPacket",this.files[0]),t.append("CSRFToken",this.CSRFToken),$.ajax({type:"POST",url:"".concat(this.APIroot,"formStack/import"),processData:!1,contentType:!1,cache:!1,data:t,success:function(t){1!=+t&&alert(t),e.closeFormDialog(),e.$router.push({name:"browser"})},error:function(e){return console.log("form import error",e)}})}else console.log("no attachment")},attachForm:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(null===(e=n.target)||void 0===e?void 0:e.files)||(null===(t=n.dataTransfer)||void 0===t?void 0:t.files);(null==o?void 0:o.length)>0&&(this.files=o)}},template:'\n            <div id="file_control" style="margin: 1em 0; min-height: 50px;">\n                <label for="formPacket">Select LEAF Form Packet to import:</label>\n                <input id="formPacket" name="formPacket" type="file" @change="attachForm"/>\n            </div>'}},491:(e,t,n)=>{n.d(t,{Z:()=>o});const o={name:"new-form-dialog",data:function(){return{requiredDataProperties:["parentID"],categoryName:"",categoryDescription:"",newFormParentID:this.dialogData.parentID}},inject:["APIroot","CSRFToken","setDialogSaveFunction","dialogData","checkRequiredData","addNewCategory","closeFormDialog"],created:function(){this.checkRequiredData(this.requiredDataProperties),this.setDialogSaveFunction(this.onSave)},mounted:function(){document.getElementById("name").focus()},emits:["get-form"],computed:{nameCharsRemaining:function(){return Math.max(50-this.categoryName.length,0)},descrCharsRemaining:function(){return Math.max(255-this.categoryDescription.length,0)}},methods:{onSave:function(){var e=this;$.ajax({type:"POST",url:"".concat(this.APIroot,"formEditor/new"),data:{name:this.categoryName,description:this.categoryDescription,parentID:this.newFormParentID,CSRFToken:this.CSRFToken},success:function(t){var n=t,o={};o.categoryID=n,o.categoryName=e.categoryName,o.categoryDescription=e.categoryDescription,o.parentID=e.newFormParentID,o.workflowID=0,o.needToKnow=0,o.visible=1,o.sort=0,o.type="",o.stapledFormIDs=[],o.destructionAge=null,e.addNewCategory(n,o),""===e.newFormParentID?e.$router.push({name:"category",query:{formID:n}}):e.$emit("get-form",n),e.closeFormDialog()},error:function(e){console.log("error posting new form",e),reject(e)}})}},template:'<div>\n            <div style="display: flex; justify-content: space-between; padding: 0.25em 0">\n                <div><b>Form Name</b><span style="font-size:80%"> (up to 50 characters)</span></div>\n                <div>{{nameCharsRemaining}}</div>\n            </div>\n            <input id="name" type="text" maxlength="50" v-model="categoryName" style="width: 100%;" />\n            <div style="display: flex; justify-content: space-between; padding: 0.25em 0; margin-top: 1em;">\n                <div><b>Form Description</b><span style="font-size:80%"> (up to 255 characters)</span></div>\n                <div>{{descrCharsRemaining}}</div>\n            </div>\n            <textarea id="description" maxlength="255" rows="5" v-model="categoryDescription" \n                style="width: 100%; resize:none;">\n            </textarea>\n        </div>'}},105:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var o=n(775),r=n(491),i=n(169),a=n(393);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==s(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===s(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==d(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==d(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===d(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const g={name:"form-browser",inject:["appIsLoadingCategories","showCertificationStatus","secureStatusText","secureBtnText","secureBtnLink","categories"],components:{CategoryItem:{name:"category-item",props:{categoriesRecord:Object,availability:String},inject:["APIroot","CSRFToken","libsPath","categories","updateCategoriesProperty","decodeAndStripHTML","allStapledFormCatIDs"],computed:{workflowID:function(){return parseInt(this.categoriesRecord.workflowID)},cardLibraryClasses:function(){return"formPreview formLibraryID_".concat(this.categoriesRecord.formLibraryID)},catID:function(){return this.categoriesRecord.categoryID},stapledForms:function(){var e=this,t=[];return this.categoriesRecord.stapledFormIDs.forEach((function(n){return t.push(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.categories[n]))})),t=t.sort((function(e,t){return e.sort-t.sort}))},isStapledToOtherForm:function(){return this.allStapledFormCatIDs.includes(this.categoriesRecord.categoryID)},categoryName:function(){return""===this.categoriesRecord.categoryName?"Untitled":this.decodeAndStripHTML(this.categoriesRecord.categoryName)},formDescription:function(){return this.decodeAndStripHTML(this.categoriesRecord.categoryDescription)},workflowDescription:function(){return this.workflowID>0?"".concat(this.categoriesRecord.workflowDescription||"No Description"," (#").concat(this.categoriesRecord.workflowID,")"):"No Workflow"}},methods:{updateSort:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=parseInt(t.currentTarget.value);isNaN(o)||(o<-128&&(o=-128,t.currentTarget.value=-128),o>127&&(o=127,t.currentTarget.value=127),$.ajax({type:"POST",url:"".concat(this.APIroot,"formEditor/formSort"),data:{sort:o,categoryID:n,CSRFToken:this.CSRFToken},success:function(){e.updateCategoriesProperty(n,"sort",o)},error:function(e){return console.log("sort post err",e)}}))}},template:'<tr :id="catID" :title="catID + \': \' + categoryName">\n            <td height="40" class="form-name">\n                <router-link :to="{ name: \'category\', query: { formID: catID }}">\n                {{ categoryName }}\n                </router-link>\n            </td>\n            <td class="formPreviewDescription">{{ formDescription }}</td>\n            <td v-if="availability !== \'supplemental\'">{{ workflowDescription }}</td>\n            <td v-else>\n                <div v-if="allStapledFormCatIDs.includes(catID)" style="display: flex; justify-content: center;">\n                    <span role="img" aria="">📑</span>&nbsp;Stapled\n                </div>\n            </td>\n            <td>\n                <div v-if="parseInt(categoriesRecord.needToKnow) === 1" class="need-to-know-enabled">\n                    <img :src="libsPath + \'dynicons/svg/emblem-readonly.svg\'" alt="" style="width: 20px;margin-right:2px"/>\n                    &nbsp;<em>Need to Know enabled</em>\n                </div>\n            </td>\n            <td>\n                <input type="number" @change="updateSort($event, catID)"\n                    :aria-labelledby="availability + \'_sort\'"\n                    :value="categoriesRecord.sort" min="-128" max="127"\n                    style="width: 100%; min-width:50px;" />\n            </td>\n        </tr>\n        <template v-if="stapledForms.length > 0">\n            <tr v-for="form in stapledForms" :key="catID + \'_stapled_with_\' + form.categoryID" class="sub-row">\n                <td height="36" class="form-name">\n                    <router-link :to="{ name: \'category\', query: { formID: form.categoryID }}" class="router-link">\n                        <span role="img" aria="">📌&nbsp;</span>\n                        <span style="text-decoration:underline;">{{ categories[form.categoryID].categoryName }}</span>\n                    </router-link>\n                </td>\n                <td>{{ categories[form.categoryID].categoryDescription }}</td>\n                <td></td>\n                <td>\n                    <div v-if="parseInt(categories[form.categoryID].needToKnow) === 1" class="need-to-know-enabled">\n                        <img :src="libsPath + \'dynicons/svg/emblem-readonly.svg\'" alt="" style="width: 20px;margin-right:2px"/>\n                        &nbsp;<em>Need to Know enabled</em>\n                    </div>\n                </td>\n                <td>\n                    <input type="number" @change="updateSort($event, form.categoryID)"\n                        :aria-labelledby="availability + \'_sort\'"\n                        :value="categories[form.categoryID].sort" min="-128" max="127"\n                        style="width: 100%; min-width:50px;" />\n                </td>\n            </tr>\n        </template>'}},computed:{activeForms:function(){var e=[];for(var t in this.categories)""===this.categories[t].parentID&&0!==parseInt(this.categories[t].workflowID)&&1===parseInt(this.categories[t].visible)&&e.push(u({},this.categories[t]));return e.sort((function(e,t){return e.sort-t.sort}))},inactiveForms:function(){var e=[];for(var t in this.categories)""===this.categories[t].parentID&&0!==parseInt(this.categories[t].workflowID)&&0===parseInt(this.categories[t].visible)&&e.push(u({},this.categories[t]));return e.sort((function(e,t){return e.sort-t.sort}))},supplementalForms:function(){var e=[];for(var t in this.categories)""===this.categories[t].parentID&&0===parseInt(this.categories[t].workflowID)&&e.push(u({},this.categories[t]));return e=e.sort((function(e,t){return e.sort-t.sort}))}},template:'<template v-if="appIsLoadingCategories === false">\n        \x3c!-- secure form section --\x3e\n        <div v-if="showCertificationStatus" id="secure_forms_info" style="padding: 8px; background-color: #a00; margin-bottom:1em;">\n            <span id="secureStatus" style="font-size: 120%; padding: 4px; color: white; font-weight: bold;">{{secureStatusText}}</span>\n            <a id="secureBtn" :href="secureBtnLink" target="_blank" class="buttonNorm">{{secureBtnText}}</a>\n        </div>\n\n        \x3c!-- form browser tables --\x3e\n        <div id="form_browser_tables">\n            <h3>Active Forms:</h3>\n            <table v-if="activeForms.length > 0" id="active_forms">\n                <tr class="header-row">\n                    <th id="active_name" style="width:250px">Form Name</th>\n                    <th style="width:400px">Description</th>\n                    <th style="width:250px">Workflow</th>\n                    <th style="width:125px">Need to Know</th>\n                    <th id="active_sort" style="width:80px">Priority</th>\n                </tr>\n                <category-item v-for="c in activeForms" \n                    :categories-record="c" \n                    availability="active" \n                    :key="\'active_\' + c.categoryID">\n                </category-item>\n            </table>\n            <p v-else style="margin-bottom: 2rem;">No Active Forms</p>\n\n            <h3>Inactive Forms:</h3>\n            <table v-if="inactiveForms.length > 0" id="inactive_forms">\n                <tr class="header-row">\n                    <th id="inactive_name" style="width:250px">Form Name</th>\n                    <th style="width:400px">Description</th>\n                    <th style="width:250px">Workflow</th>\n                    <th style="width:125px">Need to Know</th>\n                    <th id="inactive_sort" style="width:80px">Priority</th>\n                </tr>\n                <category-item v-for="c in inactiveForms" \n                    :categories-record="c" \n                    availability="inactive" \n                    :key="\'inactive_\' + c.categoryID">\n                </category-item>\n            </table>\n            <p v-else style="margin-bottom: 2rem;">No Inctive Forms</p>\n\n            <h3>Supplemental Forms:</h3>\n            <table v-if="supplementalForms.length > 0" id="supplemental_forms">\n                <tr class="header-row">\n                    <th id="supplemental_name" style="width:250px">Form Name</th>\n                    <th style="width:400px">Description</th>\n                    <th style="width:250px">Staple Status</th>\n                    <th style="width:125px">Need to Know</th>\n                    <th id="supplemental_sort" style="width:80px">Priority</th>\n                </tr>\n                <category-item v-for="c in supplementalForms" \n                    :categories-record="c" \n                    availability="supplemental" \n                    :key="\'supplement_\' + c.categoryID">\n                </category-item>\n            </table>\n            <p v-else style="margin-bottom: 2rem;">No Supplemental Forms</p>\n        </div>\n    </template>'},f={name:"form-browser-view",components:{LeafFormDialog:o.Z,NewFormDialog:r.Z,ImportFormDialog:i.Z,BrowserAndRestoreMenu:a.Z,FormBrowser:g},inject:["getSiteSettings","setDefaultAjaxResponseMessage","getEnabledCategories","showFormDialog","dialogFormContent","appIsLoadingCategories"],beforeRouteEnter:function(e,t,n){n((function(e){console.log("entering form browser"),e.setDefaultAjaxResponseMessage(),e.getSiteSettings(),!1===e.appIsLoadingCategories&&(console.log("browser view initiated categories update"),e.getEnabledCategories())}))},template:'<BrowserAndRestoreMenu />\n    <section>\n        <div v-if="appIsLoadingCategories" class="page_loading">\n            Loading... \n            <img src="../images/largespinner.gif" alt="loading..." />\n        </div>\n        <FormBrowser v-else></FormBrowser>\n\n        \x3c!-- DIALOGS --\x3e\n        <leaf-form-dialog v-if="showFormDialog">\n            <template #dialog-content-slot>\n                <component :is="dialogFormContent"></component>\n            </template>\n        </leaf-form-dialog>\n    </section>'}}}]);
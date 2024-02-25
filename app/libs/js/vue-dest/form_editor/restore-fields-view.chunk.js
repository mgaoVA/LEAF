"use strict";(self.webpackChunkleaf_vue=self.webpackChunkleaf_vue||[]).push([[644],{275:(e,t,n)=>{n.d(t,{c:()=>o});const o={data:function(){return{scrollY:window.scrollY,initialTop:15,modalElementID:"leaf_dialog_content",modalBackgroundID:"leaf-vue-dialog-background",elBody:null,elModal:null,elBackground:null,elClose:null}},inject:["dialogTitle","closeFormDialog","formSaveFunction","dialogButtonText","lastModalTab"],mounted:function(){this.elBody=document.querySelector("body"),this.elModal=document.getElementById(this.modalElementID),this.elBackground=document.getElementById(this.modalBackgroundID),this.elClose=document.getElementById("leaf-vue-dialog-close");var e=this.elModal.clientWidth>this.elBody.clientWidth?this.elModal.clientWidth:this.elBody.clientWidth;this.elBackground.style.minHeight=200+this.elBody.clientHeight+"px",this.elBackground.style.minWidth=e+"px",this.makeDraggable(this.elModal),window.addEventListener("resize",this.checkSizes);var t=document.activeElement;null===(null!==t?t.closest(".leaf-vue-dialog-content"):null)&&this.elClose.focus()},beforeUnmount:function(){window.removeEventListener("resize",this.checkSizes)},methods:{checkSizes:function(){var e=this.elModal.clientWidth>this.elBody.clientWidth?this.elModal.clientWidth:this.elBody.clientWidth;this.elBackground.style.minWidth=e+"px",this.elBackground.style.minHeight=this.elModal.offsetTop+this.elBody.clientHeight+"px"},firstTab:function(e){if(!0===(null==e?void 0:e.shiftKey)){var t=document.querySelector("#ifthen_deletion_dialog button.btn-general"),n=document.getElementById("next"),o=document.getElementById("button_cancelchange"),i=t||n||o;null!==i&&"function"==typeof i.focus&&(i.focus(),e.preventDefault())}},makeDraggable:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=0,o=0,i=0,l=0,a=function(e){(e=e||window.event).preventDefault(),n=i-e.clientX,o=l-e.clientY,i=e.clientX,l=e.clientY,t.style.top=t.offsetTop-o+"px",t.style.left=t.offsetLeft-n+"px",r()},d=function(){document.onmouseup=null,document.onmousemove=null},r=function(){t.offsetTop<window.scrollY&&(t.style.top=window.scrollY+"px"),t.offsetLeft<window.scrollX&&(t.style.left=window.scrollX+"px"),t.offsetLeft+t.clientWidth+18>window.innerWidth+window.scrollX&&(t.style.left=window.innerWidth+window.scrollX-t.clientWidth-18+"px"),e.elBackground.style.minWidth=e.elBody.clientWidth+"px",e.elBackground.style.minHeight=e.elModal.offsetTop+e.elBody.clientHeight+"px"};document.getElementById(this.modalElementID+"_drag_handle")&&(document.getElementById(this.modalElementID+"_drag_handle").onmousedown=function(e){(e=e||window.event).preventDefault(),i=e.clientX,l=e.clientY,document.onmouseup=d,document.onmousemove=a})}},template:'<Teleport to="body">\n        <div id="leaf-vue-dialog-background">\n            <div :id="modalElementID" class="leaf-vue-dialog" role="dialog" :style="{top: scrollY + initialTop + \'px\'}">\n                <div v-html="dialogTitle" :id="modalElementID + \'_drag_handle\'" class="leaf-vue-dialog-title"></div>\n                <div tabindex=0 @click="closeFormDialog" @keypress.enter="closeFormDialog" @keydown.tab="firstTab" id="leaf-vue-dialog-close">&#10005;</div>\n                <div id="record">\n                    <div role="document" style="position: relative;">\n                        <main id="xhr" class="leaf-vue-dialog-content" role="main">\n                            <slot name="dialog-content-slot"></slot>\n                        </main>\n                    </div>\n                    <div id="leaf-vue-dialog-cancel-save">\n                        <button type="button" style="width: 90px;"\n                            id="button_save" class="btn-confirm" :title="dialogButtonText.confirm"\n                            @click="formSaveFunction">\n                            {{dialogButtonText.confirm}}\n                        </button>\n                        <button type="button" style="width: 90px;"\n                            id="button_cancelchange" class="btn-general" :title="dialogButtonText.cancel"\n                            @click="closeFormDialog" @keydown.tab="lastModalTab">\n                            {{dialogButtonText.cancel}}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </Teleport>'}},808:(e,t,n)=>{n.d(t,{c:()=>o});const o={name:"import-form-dialog",data:function(){return{initialFocusElID:"formPacket",files:null}},inject:["APIroot","CSRFToken","setDialogSaveFunction","closeFormDialog"],created:function(){this.setDialogSaveFunction(this.onSave)},mounted:function(){document.getElementById(this.initialFocusElID).focus()},methods:{onSave:function(){var e=this;if(null!==this.files){var t=new FormData;t.append("formPacket",this.files[0]),t.append("CSRFToken",this.CSRFToken),$.ajax({type:"POST",url:"".concat(this.APIroot,"formStack/import"),processData:!1,contentType:!1,cache:!1,data:t,success:function(t){1!=+t&&alert(t),e.closeFormDialog(),e.$router.push({name:"browser"})},error:function(e){return console.log("form import error",e)}})}else console.log("no attachment")},attachForm:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(null===(e=n.target)||void 0===e?void 0:e.files)||(null===(t=n.dataTransfer)||void 0===t?void 0:t.files);(null==o?void 0:o.length)>0&&(this.files=o)}},template:'\n            <div id="file_control" style="margin: 1em 0; min-height: 50px;">\n                <label for="formPacket">Select LEAF Form Packet to import:</label>\n                <input id="formPacket" name="formPacket" type="file" @change="attachForm"/>\n            </div>'}},187:(e,t,n)=>{n.d(t,{c:()=>o});const o={name:"new-form-dialog",data:function(){return{requiredDataProperties:["parentID"],categoryName:"",categoryDescription:"",newFormParentID:this.dialogData.parentID}},inject:["APIroot","CSRFToken","decodeAndStripHTML","setDialogSaveFunction","dialogData","checkRequiredData","addNewCategory","closeFormDialog"],created:function(){this.checkRequiredData(this.requiredDataProperties),this.setDialogSaveFunction(this.onSave)},mounted:function(){document.getElementById("name").focus()},emits:["get-form"],computed:{nameCharsRemaining:function(){return Math.max(50-this.categoryName.length,0)},descrCharsRemaining:function(){return Math.max(255-this.categoryDescription.length,0)}},methods:{onSave:function(){var e=this,t=XSSHelpers.stripAllTags(this.categoryName),n=XSSHelpers.stripAllTags(this.categoryDescription);$.ajax({type:"POST",url:"".concat(this.APIroot,"formEditor/new"),data:{name:t,description:n,parentID:this.newFormParentID,CSRFToken:this.CSRFToken},success:function(o){var i=o,l={};l.categoryID=i,l.categoryName=t,l.categoryDescription=n,l.parentID=e.newFormParentID,l.workflowID=0,l.needToKnow=0,l.visible=1,l.sort=0,l.type="",l.stapledFormIDs=[],l.destructionAge=null,e.addNewCategory(i,l),""===e.newFormParentID?e.$router.push({name:"category",query:{formID:i}}):e.$emit("get-form",i),e.closeFormDialog()},error:function(e){console.log("error posting new form",e)}})}},template:'<div>\n            <div style="display: flex; justify-content: space-between; padding: 0.25em 0">\n                <div><b>Form Name</b><span style="font-size:80%"> (up to 50 characters)</span></div>\n                <div>{{nameCharsRemaining}}</div>\n            </div>\n            <input id="name" type="text" maxlength="50" v-model="categoryName" style="width: 100%;" />\n            <div style="display: flex; justify-content: space-between; padding: 0.25em 0; margin-top: 1em;">\n                <div><b>Form Description</b><span style="font-size:80%"> (up to 255 characters)</span></div>\n                <div>{{descrCharsRemaining}}</div>\n            </div>\n            <textarea id="description" maxlength="255" rows="5" v-model="categoryDescription" \n                style="width: 100%; resize:none;">\n            </textarea>\n        </div>'}},488:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});var o=n(275),i=n(187),l=n(808);const a={name:"restore-fields-view",data:function(){return{disabledFields:null}},components:{LeafFormDialog:o.c,NewFormDialog:i.c,ImportFormDialog:l.c},inject:["APIroot","CSRFToken","setDefaultAjaxResponseMessage","showFormDialog","dialogFormContent"],created:function(){var e=this;$.ajax({type:"GET",url:"".concat(this.APIroot,"form/indicator/list/disabled"),success:function(t){e.disabledFields=t.filter((function(e){return parseInt(e.indicatorID)>0}))},error:function(e){return console.log(e)},cache:!1})},beforeRouteEnter:function(e,t,n){n((function(e){e.setDefaultAjaxResponseMessage()}))},methods:{restoreField:function(e){var t=this;$.ajax({type:"POST",url:"".concat(this.APIroot,"formEditor/").concat(e,"/disabled"),data:{CSRFToken,disabled:0},success:function(){t.disabledFields=t.disabledFields.filter((function(t){return parseInt(t.indicatorID)!==e})),alert("The field has been restored.")},error:function(e){return console.log(e)}})}},template:'<section>\n            <h2 id="page_breadcrumbs">\n                <a href="../admin" class="leaf-crumb-link" title="to Admin Home">Admin</a>\n                <i class="fas fa-caret-right leaf-crumb-caret"></i>\n                <router-link :to="{ name: \'browser\' }" class="leaf-crumb-link" title="to Form Browser">Form Browser</router-link>\n                <i class="fas fa-caret-right leaf-crumb-caret"></i>Restore Fields\n            </h2>\n            <h3>List of disabled fields available for recovery</h3>\n            <div>Deleted fields and associated data will be not display in the Report Builder</div>\n\n            <div v-if="disabledFields === null" class="page_loading">\n                Loading...\n                <img src="../images/largespinner.gif" alt="loading..." />\n            </div>\n            <table v-else class="usa-table leaf-whitespace-normal">\n                <thead>\n                    <tr>\n                        <th>indicatorID</th>\n                        <th>Form</th>\n                        <th>Field Name</th>\n                        <th>Input Format</th>\n                        <th>Status</th>\n                        <th>Restore</th>\n                    </tr>\n                </thead>\n                <tbody id="fields">\n                    <tr v-for="f in disabledFields" key="f.indicatorID">\n                        <td>{{ f.indicatorID }}</td>\n                        <td>{{ f.categoryName }}</td>\n                        <td>{{ f.name }}</td>\n                        <td>{{ f.format }}</td>\n                        <td>{{ f.disabled }}</td>\n                        <td><button class="btn-general"\n                            @click="restoreField(parseInt(f.indicatorID))">\n                            Restore this field</button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n            \x3c!-- DIALOGS --\x3e\n            <leaf-form-dialog v-if="showFormDialog">\n                <template #dialog-content-slot>\n                    <component :is="dialogFormContent"></component>\n                </template>\n            </leaf-form-dialog>\n        </section>'}}}]);
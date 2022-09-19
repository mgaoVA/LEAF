export default {
    name: 'FormEditingDisplay',  //NOTE: this will replace previous 'print-subindicators' component
    props: {
        depth: Number,
        formNode: Object,
        index: Number
    },
    inject: [
        'truncateText',
        'newQuestion',
        'getForm',
        'editIndicatorPrivileges',
        'gridInstances',
        'updateGridInstances',
        'listItems',
        'allListItemsAreAdded',
        'allowedConditionChildFormats'
    ],
    methods: {
        ifthenUpdateIndicatorID(indicatorID) {
            vueData.indicatorID = parseInt(indicatorID); //NOTE: TODO: possible better way
            document.getElementById('btn-vue-update-trigger').dispatchEvent(new Event("click"));
        }
    },
    computed: {
        hasChildNode() {
            const { child } = this.formNode;
            return child !== null && Object.keys(child).length > 0;
        },
        children() {
            let eles = [];
            if(this.hasChildNode) {
                for (let c in this.formNode.child) {
                    eles.push(this.formNode.child[c]);
                }
                eles = eles.sort((a, b)=> a.sort - b.sort);
            }
            return eles;
        },
        isHeaderLocation() {
            let ID = parseInt(this.formNode.indicatorID);
            let item = this.listItems[ID];
            return this.allListItemsAreAdded && (item.parentID===null || item.newParentID===null);
        },
        currentSectionNumber() {
            let ID = parseInt(this.formNode.indicatorID);
            let item = this.listItems[ID];
            return this.allListItemsAreAdded && item.parentID===null ? item.sort + 1 : '';
        },
        consitionsAllowed() {
            return !this.isHeaderLocation && this.allowedConditionChildFormats.includes(this.formNode.format?.toLowerCase());
        },
        indicatorName() {
            let name = XSSHelpers.stripAllTags(this.formNode.name) || '[ blank ]';
            name = parseInt(this.depth) === 0 ? this.truncateText(name, 70) : name;
            return name;
        },
        bgColor() {
            return `rgb(${255-2*this.depth},${255-2*this.depth},${255-2*this.depth})`;
        },
        suffix() {
            return `${this.formNode.indicatorID}_${this.formNode.series}`;
        },
        colspan() {
            return this.formNode.format === null || this.formNode.format.toLowerCase() === 'textarea' ? 2 : 1;
        },
        required() {
            return parseInt(this.formNode.required) === 1;
        },
        isEmpty() {
            return this.formNode.isEmpty === true;
        },
        blockID() { //NOTE: not sure about empty id attr
            return parseInt(this.depth) === 0 ?  '' : `subIndicator_${this.suffix}`;
        },
        labelID() {
            return parseInt(this.depth) === 0 ? `PHindicator_${this.suffix}` : '';
        },
        labelClass() {
            if (parseInt(this.depth) === 0) {
                return this.required && this.isEmpty ? `printheading_missing` : `printheading`;
            } else {
                return this.required && this.isEmpty ? `printsubheading_missing` : `printsubheading`;
            }
        },
        truncatedOptions() {
            return this.formNode.options?.slice(0, 6) || [];
        }
    },
    mounted(){
        if(this.formNode.format==='grid') {
            const options = JSON.parse(this.formNode.options[0]);
            this.updateGridInstances(options, this.formNode.indicatorID, this.formNode.series);
            this.gridInstances[this.formNode.indicatorID].preview();
        }
    },
    template:`<div :class="depth===0 ? 'printmainblock' : 'printsubblock'" :id="blockID">
            <div :class="depth===0 ? 'printmainlabel' : 'printsublabel'">
                <div :id="labelID" :class="labelClass">
                    <div v-if="isHeaderLocation && currentSectionNumber!==''" class="printcounter">{{currentSectionNumber}}</div>
                    <img v-if="parseInt(formNode.is_sensitive)===1" 
                        src="../../libs/dynicons/?img=eye_invisible.svg&amp;w=16" alt=""
                        :style="{margin: depth===0 ? '0.2em' : 'auto'}"
                        title="This field is sensitive" />
                    <div style="display: flex; align-items:center;">
                        <span tabindex="0" class="printsubheading" 
                            @click="getForm(formNode.indicatorID, formNode.series)"
                            @keypress.enter="getForm(formNode.indicatorID, formNode.series)"
                            :title="'edit indicator ' + formNode.indicatorID"
                            :style="{fontWeight: depth===0 ? 'bold' : 'normal'}">
                            {{indicatorName}} <span>📝</span>
                        </span>
                    </div>
                </div>

                
                <div class="printResponse" :id="'xhrIndicator_' + suffix" 
                    :style="{minHeight: depth===0 ? '50px': 0}">

                    <!-- NOTE: FORMAT PREVIEWS -->
                    <div class="form_editing_area">

                        <div id="form_editing_toolbar">  <!-- format display and toolbar -->
                            <div>format: {{formNode.format || 'none'}}</div>

                            <div style="display: flex; align-items:center;">
                                <button v-if="consitionsAllowed" :id="'edit_conditions_' + formNode.indicatorID" 
                                    @click="ifthenUpdateIndicatorID(formNode.indicatorID)" :title="'Edit conditions for ' + formNode.indicatorID" class="icon">
                                    <img src="../../libs/dynicons/?img=preferences-system.svg&amp;w=20" alt="" />
                                </button>
                                <button @click="editIndicatorPrivileges(formNode.indicatorID)"
                                    :title="'Edit indicator ' + formNode.indicatorID + ' privileges'" class="icon">
                                    <img src="../../libs/dynicons/?img=emblem-readonly.svg&amp;w=20" alt=""/> 
                                </button>

                                <button v-if="formNode.has_code" title="Advanced Options present" class="icon">
                                    <img v-if="formNode.has_code" src="../../libs/dynicons/?img=document-properties.svg&amp;w=20" alt="" />
                                </button>
                                <button class="btn-general add-subquestion" title="Add Sub-question"
                                    @click="newQuestion(formNode.indicatorID)">
                                    + Add Sub-question
                                </button>
                            </div>
                        </div>

                        <!-- TODO: OLD -->
                        <!--
                        <template v-if="formNode.format==='grid'">
                            <br /><br />
                            <div :id="'grid'+ suffix" style="width: 100%; max-width: 100%;"></div>
                        </template>
                        <template v-else>
                            <ul v-if="formNode.options && formNode.options !== ''">
                                <li v-for="o in truncatedOptions" :key="o">{{o}}</li>
                                <li v-if="formNode.options !== '' && formNode.options.length > 6">...</li>
                            </ul>
                        </template> -->
                    </div>

                    <!-- NOTE: RECURSIVE SUBQUESTIONS -->
                    <template v-if="hasChildNode">
                        <div class="printformblock">
                            <form-editing-display v-for="child in children"
                                :depth="depth + 1"
                                :formNode="child"
                                :key="'editing_display_' + child.indicatorID"> 
                            </form-editing-display>
                        </div>
                    </template>
                </div>
            </div> <!-- END MAIN/SUB LABEL -->
        </div> <!-- END MAIN/SUB BLOCK -->`
}
export default {
    name: 'form-index-listing',
    props: {
        formPage: Number,
        depth: Number,
        formNode: Object,
        index: Number,
        parentID: Number,
        menuOpen: Boolean
    },
    inject: [
        'truncateText',
        'shortIndicatorNameStripped',
        'clearListItem',
        'addToListTracker',
        'focusIndicator',
        'formMenuState',
        'updateFormMenuState',
        'focusedIndicatorID',
        'previewMode',
        'startDrag',
        'onDragEnter',
        'onDragLeave',
        'onDrop',
        'moveListItem'
    ],
    mounted() {
        //add to listTracker array to track indicatorID, parentID, sort and current index values
        this.addToListTracker(this.formNode, this.parentID, this.index);
        //maintain focus on an indicator if it has been focused
        if(this.focusedIndicatorID === this.formNode.indicatorID) {
            const elSelected = document.getElementById(`index_listing_${this.focusedIndicatorID}`);
            if(elSelected !== null) {
                elSelected.focus();
            }
        }
    },
    beforeUnmount() {
        this.clearListItem(this.formNode.indicatorID);
    },
    methods: {
        indexHover(event = {}) {
            event?.currentTarget?.classList.add('index-selected');
        },
        indexHoverOff(event = {}){
            event?.currentTarget?.classList.remove('index-selected');
        },
        changeMenuState(indID = 0, menuOpen = true, cascade = false) {
            this.focusIndicator(indID || null);
            this.updateFormMenuState(indID, menuOpen, cascade);
        }
    },
    computed: {
        indexDisplay() {
            //short label (description), otherwise display the name. Show 'blank' if it has neither
            let display = this.formNode.description || this.formNode.name || '[ blank ]';
            return `${this.shortIndicatorNameStripped(display, 38 - this.depth)}`;
        },
        menuIconTitle() {
            const option = this.menuOpen ? 'close' : 'open';
            return `Click to ${option} this menu.  Ctrl-click to also ${option} all submenus.`;
        },
        suffix() {
            return `${this.formNode.indicatorID}_${this.formNode.series}`;
        },
        required() {
            return parseInt(this.formNode.required) === 1;
        },
        isEmpty() {
            return this.formNode.isEmpty === true;
        }
    },
    template:`
        <li tabindex="0" :title="'index item '+ formNode.indicatorID"
            :class="depth === 0 ? 'section_heading' : 'subindicator_heading'"
            @mouseover.stop="indexHover" @mouseout.stop="indexHoverOff"
            @click.stop="focusIndicator(formNode.indicatorID)"
            @keydown.enter.space.prevent.stop="focusIndicator(formNode.indicatorID)">

            <div>
                <span v-show="!previewMode" role="img" aria="" alt="" style="opacity:0.3">☰&nbsp;&nbsp;</span>
                {{indexDisplay}}
                <div v-if="formNode.child" tabindex="0" class="sub-menu-chevron" :class="{closed: !menuOpen}"
                    @click.stop.exact="changeMenuState(formNode.indicatorID, !menuOpen)"
                    @click.ctrl.stop.exact="changeMenuState(formNode.indicatorID, !menuOpen, true)"
                    @keydown.stop.enter.space.exact.prevent="changeMenuState(formNode.indicatorID, !menuOpen)"
                    @keydown.ctrl.stop.enter.space.exact.prevent="changeMenuState(formNode.indicatorID, !menuOpen, true)"
                    :title="menuIconTitle">
                    <span v-show="menuOpen" role="img" aria="">▾</span>
                    <span v-show="!menuOpen" role="img" aria="">▸</span>
                </div>
                <div v-show="!previewMode && formNode.indicatorID === focusedIndicatorID" class="icon_move_container">
                    <div tabindex="0" class="icon_move up" role="button" title="move item up"
                        @click.stop="moveListItem($event, formNode.indicatorID, true)"
                        @keydown.enter.space.prevent.stop="moveListItem($event, formNode.indicatorID, true)">
                    </div>
                    <div tabindex="0" class="icon_move down" role="button" title="move item down"
                        @click.stop="moveListItem($event, formNode.indicatorID, false)"
                        @keydown.enter.space.prevent.stop="moveListItem($event, formNode.indicatorID, false)">
                    </div>
                </div>
            </div>
            
            <!-- NOTE: RECURSIVE SUBQUESTIONS. ul for each for drop zones -->
            <ul class="form-index-listing-ul" :id="'drop_area_parent_'+ formNode.indicatorID"
                data-effect-allowed="move"
                @drop.stop="onDrop($event)"
                @dragover.prevent
                @dragenter.prevent="onDragEnter"
                @dragleave="onDragLeave">

                <template v-if="formNode.child">
                    <form-index-listing v-show="menuOpen" v-for="(child, k, i) in formNode.child"
                        :id="'index_listing_' + child.indicatorID"
                        :formPage=formPage
                        :depth="depth + 1"
                        :parentID="formNode.indicatorID"
                        :formNode="child"
                        :index="i"
                        :menuOpen="formMenuState?.[child.indicatorID] !== undefined ? formMenuState[child.indicatorID] : false"
                        :key="'index_list_item_' + child.indicatorID"
                        :draggable="previewMode ? false : true"
                        :style="{cursor: previewMode ? 'auto' : 'grab'}"
                        @dragstart.stop="startDrag"> 
                    </form-index-listing>
                </template>
            </ul>
        </li>`
}
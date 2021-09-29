var appFooter=Vue.createApp({});appFooter.component("vue-footer",{props:{hideFooter:{type:String,default:"null"},productName:{type:String},version:{type:String},revision:{type:String}},template:'<footer v-if="hideFooter !== \'true\'" id="footer" class="usa-footer leaf-footer noprint">\n            <a id="versionID" href="../?a=about">{{productName}}<br />Version {{version}} r{{revision}}</a>\n            </footer>'}),appFooter.mount("#leaf-vue-footer");var appHeader=Vue.createApp({data:function(){return{windowTop:0,windowInnerWidth:800,topIsRetracted:!1}},mounted:function(){this.windowInnerWidth=window.innerWidth,document.addEventListener("scroll",this.onScroll),window.addEventListener("resize",this.onResize)},beforeUnmount:function(){document.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onResize)},methods:{onScroll:function(){this.windowTop=window.top.scrollY},onResize:function(){this.windowInnerWidth=window.innerWidth},toggleHeader:function(){this.topIsRetracted=!this.topIsRetracted}}});appHeader.component("minimize-button",{props:{isRetracted:{type:Boolean,required:!0}},computed:{buttonTitle:function(){return this.$props.isRetracted?"Display full header":"Minimize header"}},template:'<li role="button" id="header-toggle-button" :title="buttonTitle">\n                <a href="#" @click.prevent="$emit(\'toggle-top-header\')"><i :class="[isRetracted ? \'fas fa-angle-double-down\': \'fas fa-angle-double-up\']"></i></a>\n               </li>'}),appHeader.component("leaf-warning",{data:function(){return{leafSecure:this.$props.propSecure}},props:{propSecure:{type:String,required:!0}},template:'<div v-if="leafSecure===\'0\'" id="leaf-warning">\n            <div>\n                <h3>Do not enter PHI/PII: this site is not yet secure</h3>\n                <p><a href="../report.php?a=LEAF_start_leaf_secure_certification">Start certification process</a></p>\n            </div>\n            <div><i class="fas fa-exclamation-triangle fa-2x"></i></div>\n        </div>'}),appHeader.component("scrolling-leaf-warning",{data:function(){return{leafSecure:this.$props.propSecure}},props:{propSecure:{type:String,required:!0},bgColor:{type:String,required:!1,default:"rgb(250,75,50)"},textColor:{type:String,required:!1,default:"rgb(255,255,255)"}},template:'<p v-if="leafSecure===\'0\'" id="scrolling-leaf-warning" :style="{backgroundColor: bgColor, color: textColor}"><slot></slot></p>'}),appHeader.component("admin-leaf-nav",{data:function(){return{navItems:[{title:"Home",link:"../"},{title:"Report Builder",link:"../?a=reports"},{title:"Site Links",link:"#",subLinks:[{title:"Nexus: Org Charts",link:"../"+this.$props.orgchartPath}],subLinkOpen:!1,isClickedOn:!1},{title:"Admin",link:"#",subLinks:[{title:"Admin Home",link:"./"},{title:"User Access",link:"#",subLinks:[{title:"User Access Groups",link:"?a=mod_groups"},{title:"Service Chiefs",link:"?a=mod_svcChief"}],subLinkOpen:!1,isClickedOn:!1},{title:"Workflow Editor",link:"?a=workflow",renderCondition:"national_subordinate"!==this.$props.siteType},{title:"Form Editor",link:"?a=form",renderCondition:"national_subordinate"!==this.$props.siteType},{title:"LEAF Library",link:"?a=formLibrary",renderCondition:"national_subordinate"!==this.$props.siteType},{title:"Site Settings",link:"?a=mod_system"},{title:"Site Distribution",link:"../report.php?a=LEAF_National_Distribution",renderCondition:"national_primary"===this.$props.siteType},{title:"Timeline Explorer",link:"../report.php?a=LEAF_Timeline_Explorer"},{title:"Toolbox",link:"#",subLinks:[{title:"Import Spreadsheet",link:"../report.php?a=LEAF_import_data"},{title:"Mass Action",link:"../report.php?a=LEAF_mass_action"},{title:"Initiator New Account",link:"../report.php?a=LEAF_request_initiator_new_account"},{title:"Sitemap Editor",link:"../report.php?a=LEAF_sitemaps_template"}],subLinkOpen:!1,isClickedOn:!1},{title:"LEAF Developer",link:"#",subLinks:[{title:"Template Editor",link:"?a=mod_templates"},{title:"Email Template Editor",link:"?a=mod_templates_email"},{title:"LEAF Programmer",link:"?a=mod_templates_reports"},{title:"File Manager",link:"?a=mod_file_manager"},{title:"Search Database",link:"../?a=search"},{title:"Sync Services",link:"?a=admin_sync_services"},{title:"Update Database",link:"?a=admin_update_database"}],subLinkOpen:!1,isClickedOn:!1}],subLinkOpen:!1,isClickedOn:!1}]}},props:{siteType:{type:String,required:!0},orgchartPath:{type:String,required:!0},innerWidth:{type:Number,required:!0}},computed:{isSmallScreen:function(){return this.$props.innerWidth<600}},methods:{toggleSubModal:function(e,i){i.subLinks&&(e.preventDefault(),i.isClickedOn=!i.isClickedOn,i.isClickedOn?this.modalOn(i):this.modalOff(i),this.adjustIndex(e))},adjustIndex:function(e){Array.from(document.querySelectorAll("nav li")).forEach(function(e){e.style.zIndex=100}),e.currentTarget.parentElement.style.zIndex=200},modalOn:function(e){e.subLinks&&(e.subLinkOpen=!0)},modalOff:function(e){e.subLinks&&!e.isClickedOn&&(e.subLinkOpen=!1)}},template:'<li :key="item.title" \n            v-for="item in navItems"\n            \n            @mouseenter="modalOn(item)"\n            @mouseleave="modalOff(item)">\n            <a  :href="item.link" \n                @click="toggleSubModal($event,item)"\n                :class="{ \'active\': item.isClickedOn }">{{ item.title }}\n                <i v-if="item.subLinks" :style="{color: !item.subLinkOpen ? \'\' : \'white\'}" class="fas fa-angle-down"></i>\n            </a>\n            \n            <template v-if="item.subLinks && item.subLinkOpen">\n                <ul class="sublinks"> \n                    <li :key="subLink.title" \n                        v-for="subLink in item.subLinks" \n                        :style="{display: !subLink.hasOwnProperty(\'renderCondition\') || subLink.renderCondition === true ? \'block\' : \'none\'}"\n                        @mouseleave="modalOff(subLink)"\n                        @mouseenter="modalOn(subLink)">\n                        <a :href="subLink.link"\n                            :target="subLink.title===\'Nexus: Org Charts\' ? \'_blank\' : \'_self\'"\n                            @click="toggleSubModal($event,subLink)" \n                            :class="{\'active\' : subLink.subLinkOpen || (subLink.subLinks && isSmallScreen)}">\n                            {{ subLink.title }} \n                            <i v-if="subLink.subLinks && !isSmallScreen" :style="{color: !subLink.subLinkOpen ? \'\' : \'white\'}" class="fas fa-caret-right"></i>\n                        </a>\n                        \n                        <template v-if="subLink.subLinks && (subLink.subLinkOpen || isSmallScreen)">\n                            <ul class="inner-sublinks"> \n                                <li :key="sub.title" v-for="sub in subLink.subLinks">\n                                <a :href="sub.link">{{ sub.title }}</a>\n                                </li>\n                            </ul>  \n                        </template>\n                    </li>\n                </ul> \n            </template>\n        </li>'}),appHeader.component("leaf-user-info",{data:function(){return{userItems:{user:this.$props.userName,primaryAdmin:""},subLinkOpen:!1,isClickedOn:!1}},props:{userName:{type:String},innerWidth:{type:Number,required:!0}},methods:{toggleSubModal:function(e){e.preventDefault(),this.isClickedOn=!this.isClickedOn,this.isClickedOn?this.modalOn():this.modalOff()},modalOn:function(){this.subLinkOpen=!0},modalOff:function(){this.isClickedOn||(this.subLinkOpen=!1)}},created:function(){var n=this;fetch("../api/system/primaryadmin",{method:"GET"}).then(function(e){return e.json()}).then(function(e){var i=""!==e.Email?" - "+e.Email:"";void 0!==e.Fname&&void 0!==e.Lname?n.userItems.primaryAdmin=e.Fname+" "+e.Lname+i:n.userItems.primaryAdmin=void 0!==e.userName?e.userName:"Not Set"})},template:'<li @mouseleave="modalOff" @mouseenter="modalOn">\n            <a href="#" @click="toggleSubModal">\n                <i id="nav-user-icon" class=\'fas fa-user-circle\' alt=\'User Account Menu\'>&nbsp;</i>\n                <span>{{ this.userItems.user }}</span> \n                <i :style="{color: !subLinkOpen ? \'\' : \'white\'}" class="fas fa-angle-down"></i> \n            </a>\n            <template v-if="subLinkOpen">\n                <ul class="sublinks">\n                    <li><a href="#">Your primary Admin:<p id="primary-admin" class="leaf-user-menu-name">{{userItems.primaryAdmin}}</p></a></li>\n                    <li><a href="../?a=logout">Sign Out</a></li>\n                </ul>\n            </template>\n        </li>'}),appHeader.mount("#vue-leaf-header");
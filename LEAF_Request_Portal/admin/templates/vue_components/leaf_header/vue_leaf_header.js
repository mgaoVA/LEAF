const app = Vue.createApp({
    data(){
        return {
            windowTop: 0,
            windowInnerWidth: 800
        }
    },
    mounted(){
        this.windowInnerWidth = window.innerWidth;
        document.addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onResize);
    },
    beforeUnmount(){
        document.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onScroll(){
            this.windowTop = window.top.scrollY;
            //console.log('scroll fire', this.windowTop);
        },
        onResize(){
            this.windowInnerWidth = window.innerWidth;
            //console.log('resize fire', typeof this.windowInnerWidth);
        }
    }
});


//TODO: ideally in own files.
//warning banner
app.component('leaf-warning', {
    template:
        `<div id="leaf-warning">
            <div>
                <h3>Do not enter PHI/PII: this site is not yet secure</h3>
                <p><a>Start certification process</a></p>
            </div>
            <div><i class="fas fa-exclamation-triangle fa-3x"></i></div>
        </div>`
});

//scrolling warning banner
app.component('scrolling-leaf-warning', {
    props: {
        bgColor: {
            type: String,
            required: false,
            default: 'rgb(250,75,50)'
        },
        textColor: {
            type: String,
            required: false,
            default: 'rgb(255,255,255)'
        },
    },
    template:
        `<p id="scrolling-leaf-warning" :style="{backgroundColor: bgColor, color: textColor}"><slot></slot></p>`
});

//nav (nav, ul, li, and sublists)
app.component('admin-leaf-nav', {
    data(){
        return {
            navItems: [
                { title: 'Home', link: '../', renderCondition: true },
                { title: 'Report Builder', link: '../?a=reports', renderCondition: true },
                { title: 'Site Links', link: '#', renderCondition: true,
                    subLinks: [
                        { title: 'Nexus: Org Charts', link: '../' + JSON.parse(this.$props.orgchartPath), renderCondition: true }
                    ],
                    subLinkOpen: false,
                    isClickedOn: false },
                { title: 'Admin', link: '#', renderCondition: true,
                    subLinks: [
                        { title: 'Admin Home', link: './', renderCondition: true },
                        { title: 'User Access', link: '#', renderCondition: true,
                            subLinks: [
                                { title: 'User Access Groups', link: '?a=mod_groups', renderCondition: true },
                                { title: 'Service Chiefs', link: '?a=mod_svcChief', renderCondition: true }
                            ],
                            subLinkOpen: false},
                        { title: 'Workflow Editor', link: '?a=workflow', renderCondition: JSON.parse(this.$props.siteType) !== 'national_subordinate' },
                        { title: 'Form Editor', link: '?a=form', renderCondition: JSON.parse(this.$props.siteType) !== 'national_subordinate' },
                        { title: 'LEAF Library', link: '?a=formLibrary', renderCondition: JSON.parse(this.$props.siteType) !== 'national_subordinate' },
                        { title: 'Site Settings', link: '?a=mod_system', renderCondition: true },
                        { title: 'Site Distribution', link: '#', renderCondition: JSON.parse(this.$props.siteType) === 'national_primary' },
                        { title: 'Timeline Explorer', link: '../report.php?a=LEAF_Timeline_Explorer', renderCondition: true },
                        { title: 'LEAF Developer', link: '#', renderCondition: true,
                            subLinks: [
                                { title: 'Template Editor', link: '?a=mod_templates', renderCondition: true },
                                { title: 'Email Template Editor', link: '?a=mod_templates_email', renderCondition: true },
                                { title: 'LEAF Programmer', link: '?a=mod_templates_reports', renderCondition: true },
                                { title: 'File Manager', link: '?a=mod_file_manager', renderCondition: true },
                                { title: 'Search Database', link: '../?a=search', renderCondition: true },
                                { title: 'Sync Services', link: '?a=admin_sync_services', renderCondition: true },
                                { title: 'Update Database', link: '?a=admin_update_database', renderCondition: true }
                            ],
                            subLinkOpen: false},
                        { title: 'Toolbox', link: '#', renderCondition: true,
                            subLinks: [
                                { title: 'Import Spreadsheet', link: '../report.php?a=LEAF_import_data', renderCondition: true },
                                { title: 'Mass Action', link: '../report.php?a=LEAF_mass_action', renderCondition: true },
                                { title: 'Initiator New Account', link: '../report.php?a=LEAF_request_initiator_new_account', renderCondition: true },
                                { title: 'Sitemap Editor', link: '../report.php?a=LEAF_sitemaps_template', renderCondition: true },
                            ],
                            subLinkOpen: false},

                    ],
                    subLinkOpen: false,
                    isClickedOn: false },
            ],
        }
    },
    props: {
        siteType: {
            type: String,
            required: true
        },
        orgchartPath: {
            type: String,
            required: true
        },
        innerWidth: {
            type: Number,
            required: true
        },
    },
    computed: {
        isSmallScreen(){
            return this.$props.innerWidth < 600;
        }
    },
    methods: {
        toggleSubModal(event, item) {
            if(item.subLinks) {
                item.isClickedOn = !item.isClickedOn;
                if (item.isClickedOn){
                    this.modalOn(item);
                    event.currentTarget.style.border = '1px outset #84c6ff';
                } else {
                    this.modalOff(item);
                    event.currentTarget.style.border =  '1px solid transparent';
                }
                this.adjustIndex(event);
                //Vue.nextTick();  WHY THO?
            }
        },
        adjustIndex(event){
            //so that the newest submenu opened will be on top of any other open menus
            const elLi = Array.from(document.querySelectorAll('.primary li'));
            elLi.forEach(ele => {
                ele.style.zIndex = 100;
            });
            event.currentTarget.parentElement.style.zIndex = 200;
        },
        modalOn(item) {
            if (item.subLinks) {
                item.subLinkOpen = true;
            }
        },
        modalOff(item) {
            if (item.subLinks && !item.isClickedOn) {
                item.subLinkOpen = false;
            }
        }
    },
    template:
        `<li :key="item.title" 
            v-for="item in navItems"
            :style="{display: item.renderCondition ? 'block' : 'none'}" 
            
            @mouseenter="modalOn(item)"
            @mouseleave="modalOff(item)">
            <a  :href="item.link" 
                @click="toggleSubModal($event,item)"
                :class="[ (item.subLinkOpen) ? 'active' : '' ]">{{ item.title }}
                <i v-if="item.subLinks" :style="{visibility: item.subLinks && !item.subLinkOpen ? 'visible' : 'hidden'}" class="fas fa-angle-down"></i>
            </a>
            
            <template v-if="item.subLinks && item.subLinkOpen">
                <ul class="sublinks active"> 
                    <li :key="subLink.title" 
                        v-for="subLink in item.subLinks" 
                        :style="{display: subLink.renderCondition === true ? 'block' : 'none'}"
                        
                        @mouseleave="modalOff(subLink)"
                        @mouseenter="modalOn(subLink)">
                        <a :href="subLink.link"  
                            @click="toggleSubModal($event,subLink)"
                            :class="[ (subLink.subLinkOpen) ? 'active' : '' ]">
                            {{ subLink.title }} 
                            <i :style="{visibility: subLink.subLinks && !subLink.subLinkOpen ? 'visible' : 'hidden'}" class="fas fa-angle-right"></i>
                        </a>
                        
                        <template v-if="subLink.subLinks && (subLink.subLinkOpen || isSmallScreen)">
                            <ul class="inner-sublinks active"> 
                                <li :key="sub.title" v-for="sub in subLink.subLinks"
                                :style="{backgroundColor: subLink.backgroundColor}">
                                <a :href="sub.link">{{ sub.title }}</a>
                                </li>
                            </ul>  
                        </template>
                    </li>
                </ul> 
            </template>
        </li>`
});

//TODO:
app.component('menu-toggle-button', {
    emits:['toggleNav'],
    template:
        `<li @click="$emit('toggle-nav')" id="toggleMenu" role="button">
            <span class="leaf-menu"><button>MENU</button></span><i class="fas fa-times"></i><span id="toggleMenu-text">Toggle Navigation</span>
        </li>`
});

app.component('leaf-user-info', {
    data(){
        return {
            userItems: {
                user: '',
                primaryAdmin: ''
            },
            subLinkOpen: false
        }
    },
    props: ['user-name'],
    methods: {
        toggleSubModal() {
            this.subLinkOpen = !this.subLinkOpen;
        }
    },
    created(){
        this.userItems.user = JSON.parse(this.$props.userName);
        fetch('../api/system/primaryadmin', {
            "method": "GET"
        })
        .then(res => res.json())
        .then(data => {
            let emailString = data['Email'] !== '' ? " - " + data['Email'] : '';
            if(data["Fname"] !== undefined && data["Lname"] !== undefined){
                this.userItems.primaryAdmin = data['Fname'] + " " + data['Lname'] + emailString;
            }
            else {
                this.userItems.primaryAdmin = data["userName"] !== undefined ? data["userName"] : 'Not Set';
            }
        });
    },
    template:
        `<li>
            <a href="#" @click="toggleSubModal">
                <i id="nav-user-icon" class='fas fa-user-circle' alt='User Account Menu'></i>
                <span>{{ this.userItems.user }}</span> 
                <i :style="{visibility: !subLinkOpen ? 'visible' : 'hidden'}" class="fas fa-angle-down"></i> 
            </a>
            <template v-if="subLinkOpen">
                <ul class="sublinks active">
                    <li><a href="#">Your account profile<br/><span class="leaf-user-menu-name"></span></a></li>
                    <li><a href="#">Primary Admin:<br/><span id="primary-admin" class="leaf-user-menu-name">{{userItems.primaryAdmin}}</span></a></li>
                    <li><a href="../?a=logout">Sign Out</a></li>
                </ul>
            </template>
        </li>`
});

app.mount('#vue-leaf-header');
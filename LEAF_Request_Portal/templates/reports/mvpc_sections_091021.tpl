<!-- 091021 Reporting System Code TODO FIX hard links (2: template, button) -->

<!-- Outreach form top -->
<style>
    .blockIndicator_{{ iID }} {
        display: none;
    }
    /* can do, but needs to be clear, or people could lose info they wanted saved */
    button#nextQuestion2 {
        height: 32px;
        padding: 0 4px;
        background-color: #0090ff;
    }
</style>

<script>
    var totalVetsID = '5';
    var totalMinorityID = '6';
    var percentID = '8';
    var facilityIndID = '14';
    var districtIndID = '15';
    var groupTextSelector = '#grpSel_14 .groupSelected .groupSelectorTitle';
    //must be selected (blue) to get the text, so using click event
    var groupSelectorDiv = document.getElementById('grpSel_14');
    groupSelectorDiv.addEventListener('click', updateRegionForIndicator15);

    var vetsInputJQ = $('#'+ totalVetsID);
    var minorityVetsInputJQ =  $('#'+ totalMinorityID);
    var percentMinorityVetsInputJQ =  $('#'+ percentID);
    var facilityInputJQ = $('#'+ facilityIndID);
    var districtInputJQ = $('#'+ districtIndID);

    var btmNextQuestionBtn = document.querySelector('button#nextQuestion2');
    if (btmNextQuestionBtn !== null){
        $('#nextQuestion2').off();
        let spreadsheet_link = 'report.php?a=enter_outreach_activities';
        let dialog_msg = "You are leaving the edit area. You will lose unsaved changes if you continue.  \r\nDo you want to continue?";
        btmNextQuestionBtn.innerText = "View Spreadsheet";
        $('#nextQuestion2').on('click', function(){
            if (confirm(dialog_msg) == true) {
                window.document.location.assign(spreadsheet_link);
            }
        });
    }
    function updatePercentForIndicator8(){
        if (vetsInputJQ.val() && minorityVetsInputJQ.val()){
            let percentMinorities = 100 * (minorityVetsInputJQ.val()/vetsInputJQ.val());
            let percentToFixed = percentMinorities.toFixed(1);
            percentMinorityVetsInputJQ.val(percentToFixed);
        }
    }
    function updateGroupNameFromSelector(){
        let elGroupText = document.querySelector(groupTextSelector);
        return (elGroupText !== null) ? elGroupText.textContent.trim() : null;
    }
    function checkIfRegionName(groupName){
        if (groupName.toLowerCase() === 'unassigned'){
            return;
        }
        let VISNindex = groupName.indexOf('VISN');
        let VHAindex = groupName.indexOf('VHA');		//only VISN region groups also have VHA
        let VBAindex = groupName.indexOf('VBA -');	//only VBA/NCA facility groups have dashes
        let NCAindex = groupName.indexOf('NCA -');
        if ((VISNindex !== -1 && VHAindex !== -1 ) ||
            (VISNindex === -1 && VBAindex === -1  && NCAindex === -1)){
            alert('This appears to be a region group.  Please check your entry.');
            return true;
        } else return false;
    }
    //returns a unique part of the region name based on unique aspects of the facility name
    function getRegionNameToSearch(groupName){
        let nameToSearch = "";
        if (groupName.indexOf('VISN') !== -1) { 	//eg VISN 1 VHA -;
            nameToSearch = groupName.slice(0, groupName.indexOf('-')) + "VHA -";
        }
        if (groupName.indexOf('VBA -') !== -1) { //eg Continental District VBA;
            nameToSearch = groupName.slice(0, groupName.indexOf('VBA -')) + "District VBA";
        }
        if	(groupName.indexOf('NCA -') !== -1) {
            nameToSearch = groupName.slice(0, groupName.indexOf('NCA -')) + "District NCA";
        }
        return nameToSearch;
    }
    function updateRegionForIndicator15(){
        let facilityNameSelected = updateGroupNameFromSelector();
        if (facilityNameSelected !== null){
            let isRegionName = checkIfRegionName(facilityNameSelected);
            if (!isRegionName){
                let nameToSearch = getRegionNameToSearch(facilityNameSelected);
                console.log(nameToSearch);
                $.ajax({
                    type: 'GET',
                    url: './api/system/groups',
                    success: function(res){
                        let regionInfoObj = res.filter(function(grpObj){
                            return grpObj.name.indexOf(nameToSearch) !== -1
                        });
                        if (regionInfoObj && regionInfoObj.length === 1){
                            let regionID = regionInfoObj[0].groupID;
                            //update region/district value
                            districtInputJQ.val(regionID);
                            //updates display before save or validation will fail.
                            let grpSel14Input = document.querySelector('#grpSel_'+facilityIndID+' input.groupSelectorInput');
                            let grpSel15Input = document.querySelector('#grpSel_'+districtIndID+' input.groupSelectorInput');
                            if (grpSel14Input && grpSel15Input){
                                grpSel14Input.value = 'group#' + facilityInputJQ.val();
                                grpSel15Input.value = 'group#' + districtInputJQ.val();
                            }
                        }
                    },
                    cache: false
                });
            }
        }
    }

    $('#'+ totalVetsID + ', #'+ totalMinorityID).on('keyup', function(){
        updatePercentForIndicator8();
    });

</script>

<!-- Outreach form bottom -->
<style>
    #subIndicator_{{ iID }}_28 .printsubheading{
                               display: none;
                           }
</style>




<!-- Reporting System form, top -->
<style>
    /* hide JavaScript Console */
    .blockIndicator_{{ iID }} {
        display: none;
    }
</style>

<script>
    $(document).ready(function(){
        let randomFormID = form.getHtmlFormID();
        let i = randomFormID.indexOf("_");
        let saveButtonID = randomFormID.slice(0,i) + "_button_save";

        $("#" + saveButtonID).on("click", function(){
            let year = $('#21').val();
            let quarter = $('#22').val();
            let groupSelected = document.querySelector("#grpSel_23 .groupSelected .groupSelectorTitle");
            //uses name for consistency. groupSelected will be null if the val has not been edited (blue), so use current val in that case
            let facility = groupSelected ? groupSelected.textContent.trim() :
                document.getElementById("data_23_1").textContent.trim();
            getQuarterlyReport(year, quarter, facility);
        });
    });
</script>

<!-- reporting System, bottom -->
<style>
    /* hides the title of the JavaScript Console in the dialog window */
    #subIndicator_{{ iID }}_1 .printsubheading{
        display: none;
    }
</style>

<script src="./js/lz-string/lz-string.min.js"></script>

<script>
    //uses facility name to get unique part of region name, which is then used to get regionID
    //indicators 24 and 25 then updated using groupID and regionID.
    function getGroupListAndRoute(groupName, groupID){
        //[{"groupID":"<gID>","parentGroupID":null,"name":"<gName>","groupDescription":""},]
        $.ajax({
            type: 'GET',
            url: './api/system/groups',
            success: function(res){
                res = res || 0;
                if (res !== 0 && res.length > 0) {
                    //unique substring of full region name
                    let regionNamePiece = getRegionNameToSearch(groupName);
                    let groupObj = res.filter(function(obj){
                        return obj.name.indexOf(regionNamePiece) !== -1
                    });
                    if (groupObj.length === 1){
                        let regionName = groupObj[0].name;
                        let regionID = parseInt(groupObj[0].groupID);
                        //route
                        if (groupID && regionID){
                            let dataToPost = [{"24": groupID},{"25": regionID}];
                            dataToPost.forEach(function(entry){
                                portalAPI.Forms.modifyRequest(recordID, entry);
                            });
                        }
                    } else {
                        console.log('group not found, or unexpected result: ', groupObj);
                    }
                }
            },
            cache: false
        });
    }
    //alerts and returns true if the group selected for the facility question is a region name
    function checkIfRegionName(groupName) {
        //Unassigned if not yet entered (eg from UID link after new empty row, older new request function)
        if (groupName.toLowerCase() === 'unassigned') {
            return;
        }
        let VISNindex = groupName.indexOf('VISN');
        let VHAindex = groupName.indexOf('VHA');	//only VISN region groups also have VHA
        let VBAindex = groupName.indexOf('VBA -');	//only VBA/NCA facility groups have dashes
        let NCAindex = groupName.indexOf('NCA -');
        if ((VISNindex !== -1 && VHAindex !== -1 ) ||
            (VISNindex === -1 && VBAindex === -1  && NCAindex === -1)){
            alert('This appears to be a region group.  Please check your entry.');
            return true;
        } else return false;
    }
    //returns a unique part of the region name based on unique aspects of the facility name
    //call after checking that the groupName entered was not actually a region name
    //ISSUE: displays twice after initial save, which is a bit annoying
    function getRegionNameToSearch(groupName){
        let nameToSearch = "";
        if (groupName.indexOf('VISN') !== -1) { 	//eg VISN 1 VHA -;
            nameToSearch = groupName.slice(0, groupName.indexOf('-')) + "VHA -";
        }
        if (groupName.indexOf('VBA -') !== -1) { //eg Continental District VBA;
            nameToSearch = groupName.slice(0, groupName.indexOf('VBA -')) + "District VBA";
        }
        if	(groupName.indexOf('NCA -') !== -1) {
            nameToSearch = groupName.slice(0, groupName.indexOf('NCA -')) + "District NCA";
        }
        return nameToSearch;
    }

    //TODO check newer code updates.  method might not be needed after iframe --> div change
    //or might be simpler/built-in, after other files are made available
    function updateGrid(el_iframe){
        setTimeout(function(){
            let el_toolbar = el_iframe.contentWindow.document.body.querySelector('div[id$="_gridToolbar"]');
            el_toolbar.style.display = 'none';
            let arrLinks = Array.from(
                el_iframe.contentWindow.document.body.querySelectorAll("td a"));
            let arrEntries = Array.from(
                el_iframe.contentWindow.document.body.querySelectorAll("td.table_editable"));
            arrLinks.forEach(function(link){
                link.removeAttribute('href');
            });
            arrEntries.forEach(function(entry){
                entry.removeAttribute('data-editable');
                entry.classList.remove('table_editable');
            });
        },800);
    }

    function getQuarterlyReport(fiscal_year, quarter, facility){
        fiscal_year = fiscal_year || 0;
        quarter = quarter || 0;
        facility = facility || 0;

        const quarter_times = {
            "First Quarter": {start: '10/01', end:  '12/31'},
            "Second Quarter": {start: '01/01', end:  '03/31'},
            "Third Quarter": {start: '04/01', end:  '06/30'},
            "Fourth Quarter": {start: '07/01', end:  '09/30'},
        }
        let iframe_input_indicator = 'xhrIndicator_19_1';
        //initial load from report values
        if (fiscal_year === 0 && quarter === 0 && facility === 0){
            let fiscal_year_indicator = 'data_21_1';
            let quarter_indicator = 'data_22_1';
            let facility_indicator = 'data_23_1';
            let el_fiscal_year = document.getElementById(fiscal_year_indicator);
            let el_quarter = document.getElementById(quarter_indicator);
            let el_facility = document.getElementById(facility_indicator);
            fiscal_year = el_fiscal_year.textContent.trim();
            quarter = el_quarter.textContent.trim();
            facility = el_facility.textContent.trim();
        }
        let isRegionName = checkIfRegionName(facility);

        if (fiscal_year && quarter && !isRegionName && facility){
            //uses this point rather than input vals because it was originally through the html display
            //and edit inputs were not accessible at this time.  Might be able to optimize, doesn't impact function though
            $.ajax({
                type: 'GET',
                url: './api/form/' + recordID + '/data',
                success: function(res){
                    var groupID = parseInt(res["23"]["1"].value);
                    if (typeof groupID == 'number'){
                        //async routing for internal form.  uses facility name info to get region info, routes
                        getGroupListAndRoute(facility, groupID);

                        //TODO pull in form and grid classes and use them to add grid to a div rather than adding an iframe.
                        //TODO single cell updates.  look into subindicators, GET form/ID/data/tree, POST modify (recordID, {ind: val})
                        //build search query
                        let search_year = (quarter === "First Quarter") ? (fiscal_year.replace('FY', '20') - 1).toString() :
                            fiscal_year.replace('FY', '20');
                        let time_start = quarter_times[quarter].start + "/" + search_year;
                        let time_end = quarter_times[quarter].end + "/" + search_year;

                        let searchQuery = {
                            "terms": [
                                {"id": "categoryID", "operator": "=", "match": "form_ce8a4", "gate": "AND"},
                                {"id": "data","indicatorID":"14","operator":"=","match": groupID.toString(),"gate":"AND"},
                                {"id": "data","indicatorID":"2","operator":">=","match": time_start,"gate":"AND"},
                                {"id": "data","indicatorID":"2","operator":"<=","match": time_end,"gate":"AND"},
                                {"id": "deleted","operator":"=","match":0,"gate":"AND"}
                            ],
                            "joins":["service"],
                            "sort":{},
                            "getData":["11","13","2","9","14","10","6","1","8","12","17","4","5","16","15"]
                        }
                        let columnInfo = [
                            {indicatorID: "15", name: "VISN/District"},
                            {indicatorID: "14", name: "Facility"},
                            {indicatorID: "12", name: "Primary MVPC"},
                            {indicatorID: "13", name: "Alternate MVPC"},
                            {indicatorID: "2", name: "Date of Event"},
                            {indicatorID: "1", name: "Outreach Activity"},
                            {indicatorID: "9", name: "Event, Describe Interactions, Information provided"},
                            {indicatorID: "4", name: "Total Event Hours"},
                            {indicatorID: "5", name: "Total Number of Veterans"},
                            {indicatorID: "6", name: "Number of Minority Veterans"},
                            {indicatorID: "8", name: "Percentage of Minority Veterans"},
                            {indicatorID: "16", name: "Virtual  Event"},
                            {indicatorID: "10", name: "Targeted Audience"},
                            {indicatorID: "17", name: "State"}
                        ];
                        //TODO bring in files to forms, use custom form classes, append div rather than iframe
                        let searchQueryJSON = JSON.stringify(searchQuery);
                        let indicatorsJSON = JSON.stringify(columnInfo);

                        let searchCompress = LZString.compressToBase64(searchQueryJSON);
                        let indicatorCompress = LZString.compressToBase64(indicatorsJSON);

                        let queryString = "index.php?a=reports&v=3&query=" +
                            encodeURIComponent(searchCompress) + "&indicators=" +
                            encodeURIComponent(indicatorCompress) + "&Custom_Report_Query";

                        el_iframe_container = document.getElementById(iframe_input_indicator);
                        //if iframe is already present on the container, remove before adding new
                        let current_child = document.querySelector('#xhrIndicator_19_1 iframe');
                        if (current_child !== null){
                            el_iframe_container.removeChild(current_child);
                        }
                        //create and append.  Otherwise, if something goes wrong there is a broken frame
                        let el_iframe = document.createElement('iframe');
                        el_iframe.style.width = '800px';
                        el_iframe.style.height = '400px';
                        //TODO use custom link
                        el_iframe.setAttribute("src", queryString + "&iframe=1");
                        //need to have quarter, facility etc available here if used.
                        //"https://leaf.va.gov/NATIONAL/MVPC/Reporting_System/report.php?a=quarterly_rep_test"

                        el_iframe_container.appendChild(el_iframe);

                        el_iframe.onload = function(){
                            updateGrid(this);
                        }
                    }
                },
                cache: false
            });
        }
    }
    $(document).ready(function(){
        getQuarterlyReport();
    });
</script>



<!--Template for view_homepage -->
<div class="menu2" style="width: 315px; float: left">
    <a href="report.php?a=new_quarterly_report" role="button">
    <span class="menuButtonSmall" style="background-color: #2372b0; color: white">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-new.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: white">Submit Quarterly Report</span><br />
        <span class="menuDescSmall" style="color: white"></span>
    </span>
    </a>

    <a id="outreach-activity-button" href="report.php?a=enter_outreach_activities" role="button">
    <span class="menuButtonSmall" style="background-color: #f7ed31; color: black">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-new.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: black">Enter Outreach Activities</span><br />
        <span class="menuDescSmall" style="color: black"></span>
    </span>
    </a>

    <!--{if $inbox_status != 0}-->
    <a href="?a=inbox" role="button">
    <span class="menuButtonSmall" style="background-color: #b6ef6d">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-open.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall">Inbox</span><br />
        <span class="menuDescSmall">Review and apply actions to active requests</span>
    </span>
    </a>
    <!--{/if}-->

    <!--{if $is_admin}-->
    <a href="?a=reports&v=3" role="button">
    <span class="menuButtonSmall" style="background-color: black">
        <img class="menuIconSmall" src="../libs/dynicons/?img=x-office-spreadsheet.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: white">Report Builder</span><br />
        <span class="menuDescSmall" style="color: white">Create custom reports</span>
    </span>
    </a>
    <!--{/if}-->

    <a href="https://leaf.va.gov/NATIONAL/MVPC/Database/open.php?report=32wmk" role="button">
    <span class="menuButtonSmall" style="background-color: black">
        <img class="menuIconSmall" src="../libs/dynicons/?img=x-office-spreadsheet.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: white">MVPC Document Library</span><br />
        <span class="menuDescSmall" style="color: white"></span>
    </span>
    </a>
</div>
<!--{include file=$tpl_search is_service_chief=$is_service_chief is_admin=$is_admin empUID=$empUID userID=$userID}-->


<!-- this part now in custom.  reporting system remains form driven -->
<script src="./js/lz-string/lz-string.min.js"></script>
<script>
    //note: now goes to custom, see next section below ////
    $(document).ready(function(){
        let userID = '<!--{$userID}-->';
        let elOutreachBtn = document.getElementById('outreach-activity-button');
        let searchQuery = {
            "terms": [
                {"id": "categoryID", "operator": "=", "match": "form_ce8a4", "gate": "AND"},
                {"id": "userID", "operator": "=", "match": userID, "gate": "AND"},
                {"id": "deleted","operator":"=","match":0,"gate":"AND"}
            ],
            "joins":["service"],
            "sort":{},
            "getData":["13","2","9","14","10","6","1","8","12","17","4","5","16","15"]
        }
        let columnInfo = [
            {indicatorID: "15", name: "VISN/District"},
            {indicatorID: "14", name: "Facility"},
            {indicatorID: "12", name: "Primary MVPC"},
            {indicatorID: "13", name: "Alternate MVPC"},
            {indicatorID: "2", name: "Date of Event"},
            {indicatorID: "1", name: "Outreach Activity"},
            {indicatorID: "9", name: "Event, Describe Interactions, Information provided"},
            {indicatorID: "4", name: "Total Event Hours"},
            {indicatorID: "5", name: "Total Number of Veterans"},
            {indicatorID: "6", name: "Number of Minority Veterans"},
            {indicatorID: "8", name: "Percentage of Minority Veterans"},
            {indicatorID: "16", name: "Virtual  Event"},
            {indicatorID: "10", name: "Targeted Audience"},
            {indicatorID: "17", name: "State"}
        ];
        let searchQueryJSON = JSON.stringify(searchQuery);
        let indicatorsJSON = JSON.stringify(columnInfo);
        let searchCompress = LZString.compressToBase64(searchQueryJSON);
        let indicatorCompress = LZString.compressToBase64(indicatorsJSON);
        let queryString = "index.php?a=reports&v=3&query=" +
            encodeURIComponent(searchCompress) + "&indicators=" +
            encodeURIComponent(indicatorCompress) + "&Custom_Report_Query"
        elOutreachBtn.setAttribute("href", queryString);
    });
</script>



<!-- Outreach custom (dialog with reportbuilder, new row, M Gao) -->
<script src="../libs/js/LEAF/XSSHelpers.js"></script>
<script>
    var CSRFToken = '<!--{$CSRFToken}-->';
    var query, formGrid;
    function getData() {
        query = new LeafFormQuery();
        //(this site doesn't use services)
        query.importQuery({"terms":[{"id":"categoryID","operator":"=","match":"form_ce8a4","gate":"AND"},{"id":"deleted","operator":"=","match":0,"gate":"AND"}],"joins":[],"sort":{},"getData":["11","13","2","9","14","10","6","1","8","12","17","4","5","16","15"]});
        query.addTerm('userID', '=', "<!--{$userID}-->");
        // This specifies the function to run if the query is valid.
        query.onSuccess(function(res) {
            var recordIDs = '';
            for (var i in res) {
                // Currently need to store the resulting list of recordIDs as a CSV
                recordIDs += res[i].recordID + ',';
            }
            formGrid = new LeafFormGrid('grid'); // 'grid' maps to the associated HTML element ID
            formGrid.enableToolbar();
            formGrid.setDataBlob(res);
            formGrid.setHeaders([
                {name: 'VISN/District', indicatorID: 15},
                {name: 'Facility', indicatorID: 14},
                {name: 'Primary MVPC', indicatorID: 12},
                {name: 'Alternate MVPC', indicatorID: 13},
                {name: 'Date of Event', indicatorID: 2},
                {name: 'Outreach Activity', indicatorID: 1},
                {name: 'Event description', indicatorID: 9},
                {name: 'Total Event Hours', indicatorID: 4},
                {name: 'Total Number of Veterans', indicatorID: 5},
                {name: 'Number of Minority Veterans', indicatorID: 6},
                {name: 'Percentage of Minority Veterans', indicatorID: 8},
                {name: 'Virtual Event', indicatorID: 16},
                {name: 'Targeted Audience', indicatorID: 10},
                {name: 'State', indicatorID: 17},
            ]);
            formGrid.loadData(recordIDs);
        });
        query.execute();
    }
    function createRowOpenDialog() {
        $.ajax({
            type: 'POST',
            url: './api/?a=form/new',
            dataType: 'json',
            data: {service: '', // Either a service ID # or leave blank
            title: '', // Arbitrary title for the request
            priority: 0,
            numform_ce8a4: 1, // Form ID is listed in the form editor
            CSRFToken: '<!--{$CSRFToken}-->'}
        }).then(function(response) {
            let recordID = parseFloat(response);
            if(!isNaN(recordID) && isFinite(recordID) && recordID != 0) {
                formGrid.form().setRecordID(recordID);
                formGrid.form().setPostModifyCallback(function() {
                    formGrid.form().dialog().hide();
                    location.reload();
                });
                formGrid.form().getForm(27, 1); // Open indicator 27, which is the parent ID for the fields
                // workaround dialog.setCancelHandler limitation for required fields
                $('#' + formGrid.form().dialog().containerID).on('dialogbeforeclose', function() {
                    location.reload();
                });
                formGrid.form().dialog().show();
            }
            else {
                alert(response + '\n\nPlease contact your system administrator.');
            }
        });
    }
    $(function() {
        $('#headerTab').html('Outreach Activities');
        $('#createRow').on('click', function() {
            createRowOpenDialog();
        });
        getData();
    });
</script>
<button class="buttonNorm" id="createRow"><img src="../libs/dynicons/?img=list-add.svg&amp;w=32" alt="Add Activity">Add Outreach Activity</button>
<div id="grid"></div>




<!-- other.  custom test for quarterly (proceed with the form driven version) -->
<button id="newRequestButton" class="buttonNorm" type="button" onclick="createRequest(categoryID)"><img src="../libs/dynicons/?img=list-add.svg&amp;w=16" alt="New Row" />Create Row</button>
<div id="grid" style="width:100%"></div>
<!--{include file="site_elements/generic_dialog.tpl"}-->
<!--{include file="site_elements/generic_xhrDialog.tpl"}-->

<script src="../../../libs/js/promise-pollyfill/polyfill.min.js"></script>
<script>
    let CSRFToken = '<!--{$CSRFToken}-->';
    let empUID = '<!--{$userID}-->';
    let categoryID = 'form_ce8a4';
    let formGrid = new LeafFormGrid('grid');
    let queryFilter = {"terms":[
            {"id":"categoryID","operator":"=","match":categoryID,"gate":"AND"},
            {"id":"userID","operator":"=","match":empUID,"gate":"AND"},
            {"id":"deleted","operator":"=","match":0,"gate":"AND"}],
            "joins":["service"],"sort":{},
            "getData":["13","2","9","14","10","6","1","8","12","17","4","5","16","15"]};
    function getData(filter) {
        return new Promise(function(resolve){
            let query = new LeafFormQuery();
            query.importQuery(filter);
            query.onSuccess(function(res){
                resolve(res);
            });
            query.execute();
        });
    }
    function fillGrid(res){
        let columnInfo = [
            {indicatorID: "15", name: "VISN/District"},
            {indicatorID: "14", name: "Facility"},
            {indicatorID: "12", name: "Primary MVPC"},
            {indicatorID: "13", name: "Alternate MVPC"},
            {indicatorID: "2", name: "Date of Event"},
            {indicatorID: "1", name: "Outreach Activity"},
            {indicatorID: "9", name: "Event, Describe Interactions, Information provided"},
            {indicatorID: "4", name: "Total Event Hours"},
            {indicatorID: "5", name: "Total Number of Veterans"},
            {indicatorID: "6", name: "Number of Minority Veterans"},
            {indicatorID: "8", name: "Percentage of Minority Veterans"},
            {indicatorID: "16", name: "Virtual  Event"},
            {indicatorID: "10", name: "Targeted Audience"},
            {indicatorID: "17", name: "State"}
        ];
        let recordIDs = '';
        for (let i in res) {
            recordIDs += res[i].recordID + ',';
        }
        formGrid.setDataBlob(res);
        formGrid.setHeaders(columnInfo);
        formGrid.loadData(recordIDs);
        $('.leaf_grid').css('width','100%');
    }
    function createRequest(catID) {
        catID = catID || 'strCatID';
        const portalAPI = LEAFRequestPortalAPI();
        portalAPI.setBaseURL('./api/?a=');
        portalAPI.setCSRFToken(CSRFToken);
        if (catID !== 'strCatID') {
            portalAPI.Forms.newRequest(
                catID,
                    {title: 'untitled'},
                function (recordID) {
                    recordID = recordID || 0;
                    //Type number. Sent back on success (UID column of report builder)
                    if (recordID > 0) {
                        getData(queryFilter).then(function(result){
                            fillGrid(result);
                            updateUIDAnchors();
                        });
                        dialog.hide();
                        setTimeout(function () {
                            let el_ID = formGrid.getPrefixID() + "tbody_tr" + recordID;
                            let newRow = document.getElementById(el_ID);
                            newRow.style.backgroundColor = 'rgb(254, 255, 209)';
                        }, 750);
                    }
                },
                function (error) {
                    if (error) {
                        alert('New Request could not be processed');
                        dialog.hide();
                    }
                }
            );
        }
    }
    function updateUIDAnchors(){
        let elSelector = '#' + formGrid.getPrefixID() + 'tbody tr > td > a';
        setTimeout(function(){
            //if no results return
            let elUIDs = Array.from(document.querySelectorAll(elSelector));
            if (elUIDs.length > 0){
                elUIDs.forEach(function(UID){
                    let currentLink = UID.getAttribute('href');
                    let newLink = currentLink.replace('printview&', 'view&');
                    UID.setAttribute('href', newLink);
                });
            }
        },500);
    }
    var dialog;
    $(function() {
        dialog = new dialogController('xhrDialog', 'xhr', 'loadIndicator', 'button_save', 'button_cancelchange');
        getData(queryFilter).then(function(result){
            fillGrid(result);

            updateUIDAnchors();
        });
    });
</script>
<!-- END TEST section -->
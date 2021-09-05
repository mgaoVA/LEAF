<!-- ##########################-MVPC-################################## -->

<!-- view homepage template -->
<div class="menu2" style="width: 315px; float: left">

    <a href="report.php?a=new_quarterly_report" role="button">
    <span class="menuButtonSmall" style="background-color: #2372b0; color: white">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-new.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: white">New Quarterly Report</span><br />
        <span class="menuDescSmall" style="color: white">Start a new MVPC quarterly report</span>
    </span>
    </a>

    <a id="outreach-activity-button" href="index.php?a=reports&v=3&query=N4IgLgpgTgtgziAXAbVASwCZJAYwIaQDmA9lAJ4CSAIiADQjEAO0Bp2AvHSDATgBbYAZqRgB9HBAAceACxdCBCNgCCAORoBfWuiyIQGCABsIkLPSYswbPZ3o8w%2FJAAZ6CyCvUgNAXXoArYjQAOwQUEDhoADc0CRBfcNIwJGAtEEITKgI8JGQQAEY8rjyAZi4AJi4ATiK5ejynLgA2Iq5JIoq6gHYuWpAAViLmuoHvDSA&indicators=NobwRAlgdgJhDGBDALgewE4EkAiYBcYyEyANgKZgA0YUiAthQVWAM4bL4AMAvpeNHCRosuAgEYxzWg3xgAgjDrQILZOhQRUUZm3Qc8PPpFgIUGHLLEBmKfUbySyMulpOABAFloGYgE83AGpkTupQLG4ACuioAObqdG4AwqgYcK4Ybm4AFB4BEYkAlDrsXLz8JkLmomAATLYyBNgoZG6oAGZuAKIAbmRQHNS6%2BoblgmYisgCc9fbYZCzw6BAARi3IABYtAPIArmpkiPDrbnLwRN1%2BboiwbtBtGHQaWm4ADtEXMGQwxXqlRgKmYQWcQAFhmsgAYocICRLgA5Ow%2FYZlYxjIHVMSccEETD9PqfGAnHZwPrwCiDEoGFEAyoTAgANmxYDhOzoq3QrQ6XigPmQ%2FiCIWuLCRf1GgKqliZu32h2Op3OfhFVP%2BFXGwLAAA4mRFnGT%2BogYi12p5vEs%2BYFgs4hUqRqjxXSwGI6tRpPYohBHuh%2FNzefzLaFwlFYvEkil0GlxpkcnlCjbqar0ZYAOxMgDKyGacZVaIlBDBLsRBAAKqgMyQur1%2Bm4ABKoHboYUU37KsW09UAViZJbLbhZbOcnItgrCWdbaoxjILDTAAQgeh2iHLFb6A1YlNtNPHlk7U%2FsAUwqbhAHpsCo1AhV0NSgBdIA%3D%3D" role="button">
    <span class="menuButtonSmall" style="background-color: #f7ed31; color: black">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-new.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: black">Enter Outreach Activities</span><br />
        <span class="menuDescSmall" style="color: black"></span>
    </span>
    </a>

    <!--{if $inbox_status == 0}-->
    <a href="?a=inbox" role="button">
    <span class="menuButtonSmall" style="background-color: #c9c9c9">
        <img class="menuIconSmall" src="../libs/dynicons/?img=folder-open.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall">Inbox</span><br />
        <span class="menuDescSmall">Your inbox is currently empty</span>
    </span>
    </a>
    <!--{else}-->
    <a href="?a=inbox" role="button">
    <span class="menuButtonSmall" style="background-color: #b6ef6d">
        <img class="menuIconSmall" src="../libs/dynicons/?img=document-open.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall">Inbox</span><br />
        <span class="menuDescSmall">Review and apply actions to active requests</span>
    </span>
    </a>
    <!--{/if}-->

    <a href="?a=bookmarks" role="button">
    <span class="menuButtonSmall" style="background-color: #7eb2b3">
        <img class="menuIconSmall" src="../libs/dynicons/?img=bookmark.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall">Bookmarks</span><br />
        <span class="menuDescSmall">View saved links to requests</span>
    </span>
    </a>

    <a href="?a=reports&v=3" role="button">
    <span class="menuButtonSmall" style="background-color: black">
        <img class="menuIconSmall" src="../libs/dynicons/?img=x-office-spreadsheet.svg&amp;w=76" style="position: relative" />
        <span class="menuTextSmall" style="color: white">Report Builder</span><br />
        <span class="menuDescSmall" style="color: white">Create custom reports</span>
    </span>
    </a>

</div>

<!--{include file=$tpl_search is_service_chief=$is_service_chief is_admin=$is_admin empUID=$empUID userID=$userID}-->

<script src="./js/lz-string/lz-string.min.js"></script>
<script>
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
            "getData":["11","13","2","9","14","10","6","1","8","12","17","4","5","16","15"]
        }

        $.ajax({
            type: 'GET',
            url: './api/?a=form/indicator/list',
            data: {
                forms: 'form_ce8a4',
                includeHeadings: true
            },
            success: function(resArr){

                let formIndicatorInfo = [{"indicatorID":"title","name":"","sort":0}];
                resArr.forEach(function(obj){
                    formIndicatorInfo.push({
                        indicatorID: obj.indicatorID,
                        name: obj.name,
                        sort: 0
                    });
                });

                let searchQueryJSON = JSON.stringify(searchQuery);
                let indicatorsJSON = JSON.stringify(formIndicatorInfo);

                let searchCompress = LZString.compressToBase64(searchQueryJSON);
                let indicatorCompress = LZString.compressToBase64(indicatorsJSON);

                let queryString = "index.php?a=reports&v=3&query=" +
                    encodeURIComponent(searchCompress) + "&indicators=" +
                    encodeURIComponent(indicatorCompress) + "&Custom_Report_Query"

                elOutreachBtn.setAttribute("href", queryString);
            },
            cache: false
        });
    });
</script>


<!-- 090421 part 1 edit block -->
<style>
#blockIndicator_{{ iID }} {
    display: none;
}
</style>

<script src="./js/lz-string/lz-string.min.js"></script>

<script>
    $(document).ready(function(){
        let randomFormID = form.getHtmlFormID();
        let i = randomFormID.indexOf("_");
        let saveButtonID = randomFormID.slice(0,i) + "_button_save";

        $("#" + saveButtonID).on("click", function(){
            let year = $('#21').val();
            let quarter = $('#22').val();
            let groupSelected = document.querySelector("#grpSel_23 .groupSelected .groupSelectorTitle");
            //use name for consistency. group selected will be null if the val has not been edited, use current val
            let facility = groupSelected ? groupSelected.textContent.trim() :
                document.getElementById("data_23_1").textContent.trim();
            getQuerterlyReport(year, quarter, facility);
        });
    });
</script>

<!-- part 1 html block -->
<style>
#subIndicator_{{ iID }}_1 {
    display: none;
}
</style>


<!-- part 2 html block.  edit block is empty -->
<script src="./js/lz-string/lz-string.min.js"></script>

<script>
    const getQuerterlyReport = function(fiscal_year, quarter, facility){

        fiscal_year = fiscal_year || 0;
        quarter = quarter || 0;
        facility = facility || 0;
        console.log('called with: ', fiscal_year, quarter, facility);
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

        if (fiscal_year && quarter && facility){

            $.ajax({
                type: 'GET',
                url: './api/group/list',
                data: {
                    forms: 'form_ce8a4',
                    includeHeadings: true
                },
                success: function(resArr){
                    let groupObj = resArr.find(function(obj){
                        return obj.name === facility;
                    });
                    if (groupObj){
                        let groupID = groupObj.groupID;
                        let search_year = (quarter === "First Quarter") ? (fiscal_year.replace('FY', '20') - 1).toString() :
                            fiscal_year.replace('FY', '20');

                        let time_start = quarter_times[quarter].start + "/" + search_year;
                        let time_end = quarter_times[quarter].end + "/" + search_year;

                        let el_iframe = document.createElement('iframe');
                        el_iframe.style.width = '800px';
                        el_iframe.style.height = '400px';

                        let el_link = document.createElement('a');
                        let link_text = document.createTextNode("click here to open report in a new window.");
                        el_link.appendChild(link_text);
                        el_link.style.display = 'block';

                        let searchQuery = {
                            "terms": [
                                {"id": "categoryID", "operator": "=", "match": "form_ce8a4", "gate": "AND"},
                                {"id":"data","indicatorID":"14","operator":"=","match":groupID,"gate":"AND"},
                                {"id":"dateInitiated","operator":">=","match": time_start,"gate":"AND"},
                                {"id":"dateInitiated","operator":"<=","match": time_end,"gate":"AND"},
                                {"id": "deleted","operator":"=","match":0,"gate":"AND"}
                            ],
                            "joins":["service"],
                            "sort":{},
                            "getData":["11","13","2","9","14","10","6","1","8","12","17","4","5","16","15"]
                        }

                        $.ajax({
                            type: 'GET',
                            url: './api/?a=form/indicator/list',
                            data: {
                                forms: 'form_ce8a4',
                                includeHeadings: true
                            },
                            success: function(resArr){
                                let formIndicatorInfo = [{"indicatorID":"title","name":"","sort":0}];
                                resArr.forEach(function(obj){
                                    formIndicatorInfo.push({
                                        indicatorID: obj.indicatorID,
                                        name: obj.name,
                                        sort: 0
                                    });
                                });

                                let searchQueryJSON = JSON.stringify(searchQuery);
                                let indicatorsJSON = JSON.stringify(formIndicatorInfo);

                                let searchCompress = LZString.compressToBase64(searchQueryJSON);
                                let indicatorCompress = LZString.compressToBase64(indicatorsJSON);

                                let queryString = "index.php?a=reports&v=3&query=" +
                                    encodeURIComponent(searchCompress) + "&indicators=" +
                                    encodeURIComponent(indicatorCompress) + "&Custom_Report_Query"

                                el_link.setAttribute("href", queryString);
                                el_link.setAttribute("target", "_blank");

                                el_iframe.setAttribute("src", queryString + "&iframe=1");

                                el_iframe_container = document.getElementById(iframe_input_indicator);
                                let current_child = document.querySelector('#xhrIndicator_19_1 iframe');
                                let current_link = document.querySelector('#xhrIndicator_19_1 a');
                                //remove previous iframe and link if present
                                if (current_child !== null){
                                    el_iframe_container.removeChild(current_child);
                                    el_iframe_container.removeChild(current_link);
                                }
                                el_iframe_container.appendChild(el_link);
                                el_iframe_container.appendChild(el_iframe);
                            },
                            cache: false
                        });
                    }
                }
                ,
                cache: false
            });
        }
    }


    $(document).ready(function(){
        getQuerterlyReport();
    });
</script>
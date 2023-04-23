<style>
    /* NOTE: temp template - can replace with vue app later */
    #bodyarea {
        margin: 1rem;
    }
    ul#menu {
        width: fit-content;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .custom_menu_card {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        width: 300px;
        padding: 0.4rem 0.5rem;
        text-decoration: none;
        box-shadow: 0 0 4px rgba(0,0,25,0.4);
    }
    .custom_menu_card * {
        margin: 0;
    }
    .icon_choice {
        cursor: auto;
        margin-right: 0.5rem;
        width: 50px;
        height: 50px;
    }

</style>

<h2>Test Homepage Alpha</h2>

<ul id="menu" style="height: 100%"></ul>

<!--{include file=$tpl_search is_service_chief=$is_service_chief is_admin=$is_admin empUID=$empUID userID=$userID}-->


<script>
        
    $.ajax({
        type: 'GET',
        url: `./api/system/settings`,
        success: (res) => {
            let menuItems = JSON.parse(res?.home_menu_json || "[]");
            menuItems = menuItems.sort((a,b) => a.order - b.order);

            let buffer = '';
            menuItems.forEach(item => {
                const title = XSSHelpers.stripTags(item.title, ['<script>']);
                const subtitle = XSSHelpers.stripTags(item.subtitle, ['<script>']);
                buffer += `<li><a href="${item.link}" target="_blank" style="background-color:${item.bgColor}" class="custom_menu_card">`
                if (item.icon !== '') {
                    buffer += `<img v-if="menuItem.icon" src="../libs/${item.icon}" alt="" class="icon_choice "/>`
                }
                buffer += `<div style="display: flex; flex-direction: column; justify-content: center; align-self: stretch; width: 100%;">
                    <div style="color:${item.titleColor}">${title}</div>
                    <div style="color:${item.subtitleColor}">${subtitle}</div>
                </div></a></li>`
            });
            $('#menu').html(buffer);
        },
        error: (err) => console.log(err)
    });
        
</script>
$(function () {

    $('#user-tab').on('shown.bs.tab', function (e) {
        var id = $("a.nav-link.tab-custom.active").attr("data-id");

        if (id === "1") {
            $("#user-add").attr("data-target", "#addEvent");
        } else {
            $("#user-add").attr("data-target", "#addCenter");
        }
    });
});

function setMenu() {
	$('#cc').layout('add', {
		region: 'north',
		title: '心教育網站資料維護系統',
		collapsible: false,
		href: 'api_user_menu.ashx?id=' + $('#user_id').val(),
		minHeight: 144
	});
}

function resetLayoutMenu() {
	$('#cc').layout('remove', 'north');
}

function share2FB(url) {
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "?time=" + (new Date()).getTime(), "", config = "location=no,width=600,height=300");
    return false;
}
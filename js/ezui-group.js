var url_group;
function group_newUser() {
    $('#dlg-group').dialog('open').dialog('setTitle', 'New User');
    $('#fm-group').form('clear');
    url_group = 'api_group.ashx?action=add_group';
}
function group_editUser() {
    var row = $('#dg-group').datagrid('getSelected');
    if (row) {
        $('#dlg-group').dialog('open').dialog('setTitle', '編輯');
        $('#fm-group').form('load', row);
        url_group = 'api_group.ashx?action=save_group&id=' + row.Id;
    }
}
function group_saveUser() {
    alert(url_group);
    $('#fm-group').form('submit', {
        url_group: url_group,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            var result = eval('(' + result + ')'); console.log(result);
            if (result.errorMsg) {
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg-group').dialog('close');        // close the dialog
                $('#dg-group').datagrid('reload');    // reload the user data
            }
        }
    });
}
function group_destroyUser() {
    var row = $('#dg-group').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', 'Are you sure you want to destroy this user?', function (r) {
            if (r) {
                $.post('api_group.ashx?action=delete_group', { id: row.Id }, function (result) {
                    if (result.success) {
                        $('#dg-group').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                }, 'json');
            }
        });
    }
}